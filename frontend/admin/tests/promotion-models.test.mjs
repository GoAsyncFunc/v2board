import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clone = value => structuredClone(value);

async function load(name) {
  const modelFileName = name === 'giftcard' ? 'giftCardModel' : `${name}Model`;
  const output = await build({ absWorkingDir: root, entryPoints: [`src/models/${modelFileName}.ts`], bundle: true, write: false, platform: 'node', format: 'cjs', logLevel: 'silent', plugins: [{ name: 'request', setup(builder) {
    builder.onResolve({ filter: /services\/apiClient$/ }, () => ({ path: 'request', namespace: 'test' }));
    builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ loader: 'js', contents: `exports.get=(url,data)=>globalThis.request('GET',url,data);exports.post=(url,data)=>globalThis.request('POST',url,data);exports.isSuccessfulResponse=response=>response.code===200;` }));
  } }] });
  const requests = [];
  const context = { module: { exports: {} }, exports: {}, Blob, document: { createElement() { return { style: {}, click() {} }; } }, window: { settings: { secure_path: 'admin' }, URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} } }, request(method, url, data) { requests.push([method, url, clone(data)]); return { request: true }; } };
  context.exports = context.module.exports;
  vm.runInNewContext(output.outputFiles[0].text, context);
  return { model: context.module.exports.default, requests };
}

function run(model, effect, action, response, state) {
  const puts = []; let callbacks = 0;
  const iterator = model.effects[effect]({ ...action, callback: () => { callbacks += 1; } }, { put(value) { puts.push(clone(value)); return { put: true }; }, select(selector) { return { selected: selector(state) }; } });
  let step = iterator.next();
  while (!step.done) step = iterator.next(step.value?.request ? clone(response) : step.value?.selected || step.value);
  return { puts, callbacks };
}

for (const [name, listKey] of [['coupon', 'coupons'], ['giftcard', 'giftcards']]) {
  test(`${name} fetch converts stored currency values and retains pagination`, async () => {
    const runtime = await load(name);
    const state = { [name]: { [listKey]: [], fetchLoading: false, saveLoading: false, pagination: { pageSize: 10, current: 2 }, sort: { sort: 'id' } } };
    const result = run(runtime.model, 'fetch', {}, { code: 200, total: 12, data: [{ id: 1, type: 1, value: 1234 }, { id: 2, type: 2, value: 25 }] }, state);
    assert.deepEqual(runtime.requests, [['GET', `/admin/${name}/fetch`, { pageSize: 10, current: 2, sort: 'id' }]]);
    assert.deepEqual(result.puts.at(-1).payload[listKey].map(item => item.value), [12.34, 25]);
    assert.deepEqual(result.puts.at(-1).payload.pagination, { pageSize: 10, current: 2, total: 12 });
  });

  test(`${name} generate converts currency values before posting and refreshes`, async () => {
    const runtime = await load(name);
    const params = { type: 1, value: 12.34 };
    const result = run(runtime.model, 'generate', { params }, { code: 200 });
    assert.deepEqual(runtime.requests, [['POST', `/admin/${name}/generate`, { type: 1, value: 1234 }]]);
    assert.deepEqual(result.puts.at(-1), { type: 'fetch' });
    assert.equal(result.callbacks, 1);
  });
}
