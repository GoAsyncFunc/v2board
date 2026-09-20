import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
async function load() {
  const result = await build({ absWorkingDir: root, entryPoints: ['src/models/payment.ts'], bundle: true, write: false, platform: 'node', format: 'cjs', logLevel: 'silent', plugins: [{ name: 'request', setup(builder) {
    builder.onResolve({ filter: /services\/request$/ }, () => ({ path: 'request', namespace: 'test' }));
    builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ loader: 'js', contents: `exports.get=(url,data)=>globalThis.request('GET',url,data);exports.post=(url,data)=>globalThis.request('POST',url,data);exports.isSuccessfulResponse=response=>response.code===200;` }));
  } }] });
  const requests = []; const context = { module: { exports: {} }, exports: {}, window: { settings: { secure_path: 'admin' } }, request(method, url, data) { requests.push([method, url, structuredClone(data)]); return { request: true }; } };
  context.exports = context.module.exports; vm.runInNewContext(result.outputFiles[0].text, context); return { model: context.module.exports.default, requests };
}
function run(model, effect, action, response, state) {
  const puts = [], completed = [];
  const iterator = model.effects[effect]({ ...action, complete: data => completed.push(structuredClone(data)) }, { put(value) { puts.push(structuredClone(value)); return { put: true }; }, select(selector) { return { selected: selector(state) }; } });
  let step = iterator.next(); while (!step.done) step = iterator.next(step.value?.request ? structuredClone(response) : step.value?.selected || step.value);
  return { puts, completed };
}
test('payment methods and form complete only from successful endpoints', async () => {
  const methods = await load(); const result = run(methods.model, 'getPaymentMethods', {}, { code: 200, data: ['Stripe'] });
  assert.deepEqual(methods.requests, [['GET', '/admin/payment/getPaymentMethods', undefined]]); assert.deepEqual(result.completed, [['Stripe']]);
  const form = await load(); run(form.model, 'getPaymentForm', { payment: 'Stripe', id: 7 }, { code: 200, data: {} });
  assert.deepEqual(form.requests, [['POST', '/admin/payment/getPaymentForm', { payment: 'Stripe', id: 7 }]]);
});
test('payment sort preserves ordering algorithm and submits ids', async () => {
  const runtime = await load(); const payments = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const result = run(runtime.model, 'sort', { fromIndex: 0, toIndex: 2 }, { code: 200 }, { payment: { payments, fetchLoading: false } });
  assert.deepEqual(runtime.requests, [['POST', '/admin/payment/sort', { ids: [2, 3, 1] }]]); assert.deepEqual(result.puts.at(-1), { type: 'fetch' });
});
