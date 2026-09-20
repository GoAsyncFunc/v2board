import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadLoadingPlugin() {
  const source = await fs.readFile(
    new URL('../src/runtime/loadingPlugin.ts', import.meta.url),
    'utf8',
  );
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports });
  return module.exports.default;
}

test('admin loading reducer tracks model and effect activity', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  const reducer = createLoadingPlugin().extraReducers.loading;
  const shown = reducer(undefined, {
    type: '@@DVA_LOADING/SHOW',
    payload: { namespace: 'serverManage', actionType: 'serverManage/fetch' },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(shown)), {
    global: true,
    models: { serverManage: true },
    effects: { 'serverManage/fetch': true },
  });
  const hidden = reducer(shown, {
    type: '@@DVA_LOADING/HIDE',
    payload: { namespace: 'serverManage', actionType: 'serverManage/fetch' },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(hidden)), {
    global: false,
    models: { serverManage: false },
    effects: { 'serverManage/fetch': false },
  });
});

test('admin loading effect preserves show, effect and hide ordering', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  const plugin = createLoadingPlugin({ only: ['serverManage/fetch'] });
  const effect = function* effect(value) { yield { result: value }; };
  const wrapped = plugin.onEffect(
    effect,
    { put: action => ({ dispatched: action }) },
    { namespace: 'serverManage' },
    'serverManage/fetch',
  );
  const iterator = wrapped('active');
  assert.deepEqual(JSON.parse(JSON.stringify(iterator.next().value)), {
    dispatched: {
      type: '@@DVA_LOADING/SHOW',
      payload: { namespace: 'serverManage', actionType: 'serverManage/fetch' },
    },
  });
  assert.equal(typeof iterator.next().value.next, 'function');
  assert.deepEqual(JSON.parse(JSON.stringify(iterator.next().value)), {
    dispatched: {
      type: '@@DVA_LOADING/HIDE',
      payload: { namespace: 'serverManage', actionType: 'serverManage/fetch' },
    },
  });
});

test('admin loading plugin rejects conflicting filters and skips excluded effects', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  assert.throws(
    () => createLoadingPlugin({ only: ['serverManage/fetch'], except: ['serverManage/save'] }),
    /ambiguous/i,
  );
  const effect = function* effect() { yield 'unchanged'; };
  const plugin = createLoadingPlugin({ except: ['serverManage/fetch'] });
  assert.equal(
    plugin.onEffect(effect, { put() {} }, { namespace: 'serverManage' }, 'serverManage/fetch'),
    effect,
  );
});
