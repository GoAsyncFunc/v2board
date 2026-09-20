import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(name, response) {
  const source = await fs.readFile(new URL(`../src/models/${name}.ts`, import.meta.url), 'utf8');
  const { code } = await transform(source, { loader: 'ts', format: 'cjs' });
  const events = [], module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id.includes('types/api')) return { isSuccessfulResponse: value => value.code === 200 };
    if (id.includes('services/request')) {
      const request = method => async (endpoint, params) => { events.push([method, endpoint, structuredClone(params)]); return response; };
      return { get: request('GET'), post: request('POST') };
    }
    throw Error(id);
  } });
  const model = module.exports.default;
  let state = model.state;
  async function run(effect, action) {
    const iterator = model.effects[effect](action, { put: update => ({ kind: 'put', update }) });
    let step = iterator.next();
    while (!step.done) {
      if (step.value?.kind === 'put') {
        events.push(['put', structuredClone(step.value.update)]);
        state = model.reducers.setState(state, step.value.update);
        step = iterator.next();
      } else {
        step = iterator.next(await step.value);
      }
    }
    return state;
  }
  return { model, events, run, getState: () => state };
}

const queries = [
  { name: 'knowledge', effect: 'fetch', action: { language: 'zh-CN', keyword: 'guide' }, endpoint: '/user/knowledge/fetch', params: { language: 'zh-CN', keyword: 'guide' }, data: { Guides: [{ id: 7, title: 'Test' }] }, field: 'knowledges', loading: 'fetchLoading' },
  { name: 'knowledge', effect: 'fetchById', action: { id: 7, language: 'en-US' }, endpoint: '/user/knowledge/fetch', params: { id: 7, language: 'en-US' }, data: { title: 'Test', body: 'Content' }, field: 'knowledge', loading: 'fetchByIdLoading' },
  { name: 'coupon', effect: 'check', action: { code: 'DEMO', planId: 7 }, endpoint: '/user/coupon/check', params: { code: 'DEMO', plan_id: 7 }, data: { name: 'Discount', code: 'DEMO', type: 1, value: 100 }, field: 'coupon', loading: 'checkLoading', method: 'POST' },
];

for (const entry of queries) for (const code of [200, 422, 500]) test(`${entry.name}/${entry.effect} response=${code} preserves request and loading sequence`, async () => {
  const runtime = await load(entry.name, { code, data: entry.data });
  const state = await runtime.run(entry.effect, entry.action);
  const expected = [
    ['put', { type: 'setState', payload: { [entry.loading]: true } }],
    [entry.method || 'GET', entry.endpoint, entry.params],
    ['put', { type: 'setState', payload: { [entry.loading]: false } }],
  ];
  if (code === 200) expected.push(['put', { type: 'setState', payload: { [entry.field]: entry.data } }]);
  assert.deepEqual(runtime.events, expected);
  assert.equal(state[entry.loading], false);
  assert.equal(state[entry.field], code === 200 ? entry.data : runtime.model.state[entry.field]);
});

for (const code of [200, 500]) test(`Tutorial list response=${code} preserves safe-area configuration`, async () => {
  const data = { tutorials: [{ id: 1 }], safe_area_var: { client: 'test' } };
  const runtime = await load('tutorial', { code, data });
  const state = await runtime.run('fetch', {});
  assert.deepEqual(runtime.events[0], ['GET', '/user/tutorial/fetch', undefined]);
  assert.equal(runtime.events.length, code === 200 ? 2 : 1);
  if (code === 200) {
    assert.equal(state.tutorials, data.tutorials);
    assert.equal(state.safeAreaVar, data.safe_area_var);
  }
});

for (const steps of [undefined, '', '[{"title":"Install"}]', '{"legacy":"shape"}']) test(`Tutorial steps retain original JSON parsing for ${String(steps)}`, async () => {
  const data = { id: 7, steps };
  const runtime = await load('tutorial', { code: 200, data });
  const state = await runtime.run('fetchById', { id: 7 });
  assert.deepEqual(runtime.events[1], ['GET', '/user/tutorial/fetch', { id: 7 }]);
  assert.equal(state.fetchByIdLoading, false);
  assert.equal(state.tutorial, data);
  assert.deepEqual(JSON.parse(JSON.stringify(state.tutorial.steps)), steps ? JSON.parse(steps) : []);
});

test('Malformed tutorial JSON retains the original rejection after loading clears', async () => {
  const runtime = await load('tutorial', { code: 200, data: { steps: 'invalid-json' } });
  await assert.rejects(runtime.run('fetchById', { id: 7 }), error => error.name === 'SyntaxError');
  assert.equal(runtime.getState().fetchByIdLoading, false);
  assert.equal(runtime.getState().tutorial, runtime.model.state.tutorial);
});

test('Coupon reset returns an empty coupon and clears loading', async () => {
  const runtime = await load('coupon', {});
  const result = runtime.model.reducers.empty({ coupon: { name: 'Old' }, checkLoading: true });
  assert.deepEqual(JSON.parse(JSON.stringify(result)), { coupon: {}, checkLoading: false });
  assert.notEqual(result, runtime.model.state);
});
