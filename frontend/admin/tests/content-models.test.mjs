import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clone = value => structuredClone(value);

async function loadModel(name) {
  const output = await build({ absWorkingDir: root, entryPoints: [`src/models/${name}Model.ts`], bundle: true, write: false, platform: 'node', format: 'cjs', logLevel: 'silent', plugins: [{ name: 'request', setup(builder) {
    builder.onResolve({ filter: /services\/apiClient$/ }, () => ({ path: 'request', namespace: 'test' }));
    builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ loader: 'js', contents: `exports.get=(url,data)=>globalThis.request('GET',url,data);exports.post=(url,data)=>globalThis.request('POST',url,data);exports.isSuccessfulResponse=response=>response.code===200;` }));
  } }] });
  const requests = [];
  const context = { module: { exports: {} }, exports: {}, window: { settings: { secure_path: 'admin' } }, request(method, url, data) { requests.push([method, url, clone(data)]); return { request: true }; } };
  context.exports = context.module.exports;
  vm.runInNewContext(output.outputFiles[0].text, context);
  return { model: context.module.exports.default, requests };
}

function run(model, effect, action, response) {
  const puts = []; let callbacks = 0;
  const iterator = model.effects[effect]({ ...action, complete: () => { callbacks += 1; }, callback: () => { callbacks += 1; } }, { put(value) { puts.push(clone(value)); return { put: true }; } });
  let step = iterator.next();
  while (!step.done) step = iterator.next(step.value?.request ? clone(response) : step.value);
  return { puts, callbacks };
}

test('notice save keeps loading, refresh and callback behavior', async () => {
  const { model, requests } = await loadModel('notice');
  const result = run(model, 'save', { params: { title: 'Maintenance' } }, { code: 200, data: [] });
  assert.deepEqual(requests, [['POST', '/admin/notice/save', { title: 'Maintenance' }]]);
  assert.deepEqual(result.puts, [
    { type: 'setState', payload: { saveLoading: true } },
    { type: 'setState', payload: { saveLoading: false } },
    { type: 'fetch' },
  ]);
  assert.equal(result.callbacks, 1);
});

test('theme list and save preserve request and refresh contracts', async () => {
  const listed = await loadModel('theme');
  const themes = { default: { name: 'Default' } };
  const listResult = run(listed.model, 'getThemes', {}, { code: 200, data: { themes, active: 'default' } });
  assert.deepEqual(listed.requests, [['GET', '/admin/theme/getThemes', undefined]]);
  assert.deepEqual(listResult.puts.at(-1), { type: 'setState', payload: { themes, active: 'default' } });

  const saved = await loadModel('theme');
  const saveResult = run(saved.model, 'saveThemeConfig', { name: 'default', config: 'encoded' }, { code: 200, data: {} });
  assert.deepEqual(saved.requests, [['POST', '/admin/theme/saveThemeConfig', { config: 'encoded', name: 'default' }]]);
  assert.deepEqual(saveResult.puts.at(-1), { type: 'getThemes' });
  assert.equal(saveResult.callbacks, 1);
});
