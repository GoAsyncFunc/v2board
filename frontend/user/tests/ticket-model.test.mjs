import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const copy = value => structuredClone(value);

async function loadModel(trace) {
  const source = await fs.readFile(new URL('../src/models/ticket.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts', target: 'es2018' })).code;
  const request = method => (url, data) => {
    trace.push(['request', method, url, copy(data)]);
    return { request: true };
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id.includes('types/api')) return { isSuccessfulResponse: response => response.code === 200 };
      if ((id.includes('routerHistory') || id.includes('../app/history'))) return { push: route => trace.push(['navigate', route]) };
      if (id.includes('request')) return { get: request('GET'), post: request('POST') };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return module.exports.default;
}

async function run(effect, response, options = {}) {
  const trace = [];
  const model = await loadModel(trace);
  const ticketState = {
    ...copy(model.state),
    saveData: { subject: 'Help', level: 1, message: 'Details' },
    replyData: { message: 'Reply text' },
  };
  const action = {
    id: options.id ?? 7,
    withdrawAccount: 'demo-account',
    withdrawMethod: 'Bank',
    start: () => trace.push(['message', 'loading', '发送中']),
    finish: () => trace.push(['message', 'destroy']),
    succeed: () => trace.push(['message', 'success', '发送成功']),
    complete: () => trace.push(['complete']),
    callback: () => trace.push(['callback']),
  };
  const api = {
    put(value) {
      trace.push(['put', copy(value)]);
      return { put: true };
    },
    select(selector) {
      trace.push(['select']);
      return { select: true, value: selector({ ticket: ticketState }) };
    },
  };
  const iterator = model.effects[effect](action, api);
  let step = iterator.next();
  let count = 0;
  while (!step.done) {
    if (++count > 20) throw new Error('Unterminated ticket effect');
    if (step.value?.request && options.reject) {
      assert.throws(() => iterator.throw(new Error('Network failure')), /Network failure/);
      trace.push(['error', 'Network failure']);
      break;
    }
    step = iterator.next(step.value?.request ? copy(response) : step.value?.select ? step.value.value : step.value);
  }
  return { model, trace: copy(trace) };
}

test('ticket fetch preserves loading and successful list replacement', async () => {
  const tickets = [{ id: 7, subject: 'Help', status: 0 }];
  assert.deepEqual((await run('fetch', { code: 200, data: tickets })).trace, [
    ['put', { type: 'setState', payload: { fetchLoading: true } }],
    ['request', 'GET', '/user/ticket/fetch', undefined],
    ['put', { type: 'setState', payload: { fetchLoading: false } }],
    ['put', { type: 'setState', payload: { tickets } }],
  ]);
});

test('ticket fetch clears loading on HTTP failure but not transport rejection', async () => {
  assert.deepEqual((await run('fetch', { code: 500 })).trace, [
    ['put', { type: 'setState', payload: { fetchLoading: true } }],
    ['request', 'GET', '/user/ticket/fetch', undefined],
    ['put', { type: 'setState', payload: { fetchLoading: false } }],
  ]);
  assert.deepEqual((await run('fetch', undefined, { reject: true })).trace, [
    ['put', { type: 'setState', payload: { fetchLoading: true } }],
    ['request', 'GET', '/user/ticket/fetch', undefined],
    ['error', 'Network failure'],
  ]);
});

test('ticket detail and close preserve identifiers and refresh only after success', async () => {
  const ticket = { subject: 'Help', message: [] };
  assert.deepEqual((await run('fetchById', { code: 200, data: ticket }, { id: '8' })).trace, [
    ['request', 'GET', '/user/ticket/fetch', { id: '8' }],
    ['put', { type: 'setState', payload: { ticket } }],
  ]);
  assert.deepEqual((await run('close', { code: 200 }, { id: 9 })).trace, [
    ['request', 'POST', '/user/ticket/close', { id: 9 }],
    ['put', { type: 'fetch' }],
  ]);
  assert.deepEqual((await run('close', { code: 422 })).trace, [
    ['request', 'POST', '/user/ticket/close', { id: 7 }],
  ]);
});

test('ticket save reads the current draft and resets it only after success', async () => {
  assert.deepEqual((await run('save', { code: 200 })).trace, [
    ['select'],
    ['request', 'POST', '/user/ticket/save', { subject: 'Help', level: 1, message: 'Details' }],
    ['put', { type: 'setState', payload: { saveData: {}, newTicketModalVisible: false } }],
    ['put', { type: 'fetch' }],
  ]);
  assert.deepEqual((await run('save', { code: 422 })).trace, [
    ['select'],
    ['request', 'POST', '/user/ticket/save', { subject: 'Help', level: 1, message: 'Details' }],
  ]);
});

test('ticket reply preserves notification, loading and completion order', async () => {
  assert.deepEqual((await run('reply', { code: 200 })).trace, [
    ['select'],
    ['put', { type: 'setState', payload: { replyLoading: true } }],
    ['message', 'loading', '发送中'],
    ['request', 'POST', '/user/ticket/reply', { id: 7, message: 'Reply text' }],
    ['message', 'destroy'],
    ['put', { type: 'setState', payload: { replyLoading: false } }],
    ['message', 'success', '发送成功'],
    ['put', { type: 'setState', payload: { replyData: {} } }],
    ['complete'],
  ]);
});

test('ticket reply failure clears UI state while transport rejection retains it', async () => {
  assert.deepEqual((await run('reply', { code: 500 })).trace, [
    ['select'],
    ['put', { type: 'setState', payload: { replyLoading: true } }],
    ['message', 'loading', '发送中'],
    ['request', 'POST', '/user/ticket/reply', { id: 7, message: 'Reply text' }],
    ['message', 'destroy'],
    ['put', { type: 'setState', payload: { replyLoading: false } }],
  ]);
  assert.deepEqual((await run('reply', undefined, { reject: true })).trace, [
    ['select'],
    ['put', { type: 'setState', payload: { replyLoading: true } }],
    ['message', 'loading', '发送中'],
    ['request', 'POST', '/user/ticket/reply', { id: 7, message: 'Reply text' }],
    ['error', 'Network failure'],
  ]);
});

test('commission withdrawal navigates and invokes callback only after success', async () => {
  assert.deepEqual((await run('withdraw', { code: 200 })).trace, [
    ['request', 'POST', '/user/ticket/withdraw', { withdraw_account: 'demo-account', withdraw_method: 'Bank' }],
    ['navigate', '/ticket'],
    ['callback'],
  ]);
  assert.deepEqual((await run('withdraw', { code: 422 })).trace, [
    ['request', 'POST', '/user/ticket/withdraw', { withdraw_account: 'demo-account', withdraw_method: 'Bank' }],
  ]);
});

test('ticket reducers preserve merge and fresh empty-state behavior', async () => {
  const { model } = await run('close', { code: 422 });
  assert.deepEqual(copy(model.reducers.setState({ ...model.state, fetchLoading: false }, {
    payload: { fetchLoading: true },
  })), { ...copy(model.state), fetchLoading: true });
  const empty = model.reducers.empty();
  assert.deepEqual(copy(empty), copy(model.state));
  assert.notEqual(empty, model.state);
});
