import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clone = value => structuredClone(value);

async function load(name) {
  const output = await build({ absWorkingDir: root, entryPoints: [`src/models/${name}.ts`], bundle: true, write: false, platform: 'node', format: 'cjs', logLevel: 'silent', plugins: [{ name: 'model-dependencies', setup(builder) {
    builder.onResolve({ filter: /services\/request$/ }, () => ({ path: 'request', namespace: 'test' }));
    builder.onResolve({ filter: /^antd\/lib\/message$/ }, () => ({ path: 'message', namespace: 'test' }));
    builder.onLoad({ filter: /^request$/, namespace: 'test' }, () => ({ loader: 'js', contents: `exports.get=(url,data)=>globalThis.request('GET',url,data);exports.post=(url,data)=>globalThis.request('POST',url,data);exports.isSuccessfulResponse=response=>response.code===200;` }));
    builder.onLoad({ filter: /^message$/, namespace: 'test' }, () => ({ loader: 'js', contents: `module.exports={loading:value=>globalThis.notify('loading',value),destroy:()=>globalThis.notify('destroy')};` }));
  } }] });
  const requests = [], notifications = [];
  const context = { module: { exports: {} }, exports: {}, window: { settings: { secure_path: 'admin' } }, request(method, url, data) { requests.push([method, url, clone(data)]); return { request: true }; }, notify(...args) { notifications.push(args); } };
  context.exports = context.module.exports;
  vm.runInNewContext(output.outputFiles[0].text, context);
  return { model: context.module.exports.default, requests, notifications };
}

function run(model, effect, action, response, state) {
  const puts = []; let callbacks = 0;
  const iterator = model.effects[effect]({ ...action, callback: () => { callbacks += 1; } }, { put(value) { puts.push(clone(value)); return { put: true }; }, select(selector) { return { selected: selector(state) }; } });
  let step = iterator.next();
  while (!step.done) step = iterator.next(step.value?.request ? clone(response) : step.value?.selected || step.value);
  return { puts, callbacks };
}

test('knowledge sort preserves recovered move algorithm and submits ids', async () => {
  const runtime = await load('knowledge');
  const knowledges = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const result = run(runtime.model, 'sort', { fromIndex: 0, toIndex: 2 }, { code: 200 }, { knowledge: { knowledges } });
  assert.deepEqual(runtime.requests, [['POST', '/admin/knowledge/sort', { knowledge_ids: [2, 3, 1] }]]);
  assert.deepEqual(result.puts.at(-1), { type: 'fetch' });
});

test('knowledge save posts the current article and completes after refresh', async () => {
  const runtime = await load('knowledge');
  const result = run(runtime.model, 'save', {}, { code: 200 }, { knowledge: { knowledge: { id: 7, title: 'Guide' } } });
  assert.deepEqual(runtime.requests, [['POST', '/admin/knowledge/save', { id: 7, title: 'Guide' }]]);
  assert.deepEqual(result.puts.at(-1), { type: 'fetch' });
  assert.equal(result.callbacks, 1);
});

test('ticket detail loads its user only when no user is selected', async () => {
  const runtime = await load('ticket');
  const result = run(runtime.model, 'fetchById', { id: 42 }, { code: 200, data: { id: 42, user_id: 9, message: [] } }, { user: { user: {} } });
  assert.deepEqual(runtime.requests, [['GET', '/admin/ticket/fetch', { id: 42 }]]);
  assert.deepEqual(result.puts.at(-1), { type: 'user/getUserInfoById', id: 9 });
});

test('ticket reply brackets loading, refreshes detail, and completes', async () => {
  const runtime = await load('ticket');
  const result = run(runtime.model, 'reply', { id: 42, msg: 'Resolved' }, { code: 200 });
  assert.deepEqual(runtime.requests, [['POST', '/admin/ticket/reply', { id: 42, message: 'Resolved' }]]);
  assert.deepEqual(runtime.notifications, [['loading', '发送中'], ['destroy']]);
  assert.deepEqual(result.puts.at(-1), { type: 'fetchById', id: 42 });
  assert.equal(result.callbacks, 1);
});
