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

test('user loading reducer tracks model and effect activity', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  const reducer = createLoadingPlugin().extraReducers.loading;
  const shown = reducer(undefined, {
    type: '@@DVA_LOADING/SHOW',
    payload: { namespace: 'order', actionType: 'order/fetch' },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(shown)), {
    global: true,
    models: { order: true },
    effects: { 'order/fetch': true },
  });
  const hidden = reducer(shown, {
    type: '@@DVA_LOADING/HIDE',
    payload: { namespace: 'order', actionType: 'order/fetch' },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(hidden)), {
    global: false,
    models: { order: false },
    effects: { 'order/fetch': false },
  });
});

test('user loading effect preserves show, effect and hide ordering', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  const plugin = createLoadingPlugin({ only: ['order/fetch'] });
  const effect = function* effect(value) { yield { result: value }; };
  const wrapped = plugin.onEffect(
    effect,
    { put: action => ({ dispatched: action }) },
    { namespace: 'order' },
    'order/fetch',
  );
  const iterator = wrapped('page-2');
  assert.deepEqual(JSON.parse(JSON.stringify(iterator.next().value)), {
    dispatched: {
      type: '@@DVA_LOADING/SHOW',
      payload: { namespace: 'order', actionType: 'order/fetch' },
    },
  });
  assert.equal(typeof iterator.next().value.next, 'function');
  assert.deepEqual(JSON.parse(JSON.stringify(iterator.next().value)), {
    dispatched: {
      type: '@@DVA_LOADING/HIDE',
      payload: { namespace: 'order', actionType: 'order/fetch' },
    },
  });
});

test('user loading plugin rejects conflicting filters and skips excluded effects', async () => {
  const createLoadingPlugin = await loadLoadingPlugin();
  assert.throws(
    () => createLoadingPlugin({ only: ['order/fetch'], except: ['order/save'] }),
    /ambiguous/i,
  );
  const effect = function* effect() { yield 'unchanged'; };
  const plugin = createLoadingPlugin({ except: ['order/fetch'] });
  assert.equal(plugin.onEffect(effect, { put() {} }, { namespace: 'order' }, 'order/fetch'), effect);
});
