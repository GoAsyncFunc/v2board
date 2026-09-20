import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadCommunicationModel(trace) {
  const source = await fs.readFile(new URL('../src/models/comm.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts', target: 'es2018' })).code;
  const request = method => (url, data) => {
    trace.push(['request', method, url, structuredClone(data)]);
    return { request: true };
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id.includes('request')) return { get: request('GET'), post: request('POST') };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return module.exports.default;
}

async function run(effect, response, { id = 7, reject = false } = {}) {
  const trace = [];
  const model = await loadCommunicationModel(trace);
  const action = { id, complete: value => trace.push(['complete', value]) };
  const iterator = model.effects[effect](action, {
    put: value => {
      trace.push(['put', structuredClone(value)]);
      return { put: true };
    },
  });
  let step = iterator.next();
  while (!step.done) {
    if (step.value?.request && reject) {
      assert.throws(() => iterator.throw(new Error('Network failure')), /Network failure/);
      trace.push(['error', 'Network failure']);
      break;
    }
    step = iterator.next(step.value?.request ? structuredClone(response) : step.value);
  }
  return { model, trace: structuredClone(trace) };
}

test('communication config stores the complete successful payload', async () => {
  const config = { currency: 'CNY', currency_symbol: '¥', withdraw_methods: ['Bank'] };
  const { trace } = await run('config', { code: 200, data: config });
  assert.deepEqual(trace, [
    ['request', 'GET', '/user/comm/config', undefined],
    ['put', { type: 'setState', payload: { config } }],
  ]);
});

test('communication config ignores non-success responses', async () => {
  const { trace } = await run('config', { code: 422, data: { currency: 'USD' } });
  assert.deepEqual(trace, [['request', 'GET', '/user/comm/config', undefined]]);
});

test('communication config preserves inherited network rejection', async () => {
  const { trace } = await run('config', undefined, { reject: true });
  assert.deepEqual(trace, [
    ['request', 'GET', '/user/comm/config', undefined],
    ['error', 'Network failure'],
  ]);
});

test('Stripe public key completes only after a successful response', async () => {
  const success = await run('getStripePublicKey', { code: 200, data: 'pk_test' }, { id: 'method-3' });
  assert.deepEqual(success.trace, [
    ['request', 'POST', '/user/comm/getStripePublicKey', { id: 'method-3' }],
    ['complete', 'pk_test'],
  ]);
  const failure = await run('getStripePublicKey', { code: 500, data: 'ignored' });
  assert.deepEqual(failure.trace, [
    ['request', 'POST', '/user/comm/getStripePublicKey', { id: 7 }],
  ]);
});

test('communication reducer merges state without replacing unrelated fields', async () => {
  const { model } = await run('config', { code: 422 });
  assert.deepEqual(structuredClone(model.state), { config: {} });
  assert.deepEqual(
    structuredClone(model.reducers.setState({ config: {}, keep: true }, { payload: { config: { currency: 'EUR' } } })),
    { config: { currency: 'EUR' }, keep: true },
  );
});
