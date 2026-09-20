import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPluginRuntime() {
  const source = await fs.readFile(
    new URL('../src/runtime/pluginRuntime.ts', import.meta.url),
    'utf8',
  );
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, Object, Promise });
  return module.exports;
}

test('user plugin runtime applies, composes and broadcasts registered hooks', async () => {
  const runtime = await loadPluginRuntime();
  const calls = [];
  runtime.init({ validKeys: ['modify', 'render', 'notify'] });
  runtime.use({
    modify: value => `${value}:first`,
    render: next => value => `outer(${next(value)})`,
    notify: value => calls.push(`first:${value}`),
  });
  runtime.use({
    modify: value => `${value}:second`,
    render: next => value => `inner(${next(value)})`,
    notify: value => calls.push(`second:${value}`),
  });

  assert.equal(runtime.apply('modify', { initialValue: 'start' }), 'start:first:second');
  const render = runtime.compose('render', { initialValue: value => `page:${value}` });
  assert.equal(render('dashboard'), 'outer(inner(page:dashboard))');
  runtime.applyForEach('notify', { initialValue: 'ready' });
  assert.deepEqual(calls, ['first:ready', 'second:ready']);
});

test('user plugin runtime merges synchronous and asynchronous configuration', async () => {
  const runtime = await loadPluginRuntime();
  runtime.init({ validKeys: ['config'] });
  runtime.use({ config: { locale: 'zh-CN', retries: 1 } });
  runtime.use({ config: { retries: 2, theme: 'default' } });
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.mergeConfig('config'))), {
    locale: 'zh-CN', retries: 2, theme: 'default',
  });
  assert.deepEqual(
    JSON.parse(JSON.stringify(await runtime.mergeConfigAsync([
      Promise.resolve({ locale: 'en-US' }),
      { theme: 'dark' },
    ]))),
    { locale: 'en-US', theme: 'dark' },
  );
});

test('user plugin runtime rejects unknown hooks and non-callable handlers', async () => {
  const runtime = await loadPluginRuntime();
  runtime.init({ validKeys: ['known'] });
  assert.throws(() => runtime.use({ missing: () => null }), /Invalid key missing/);
  runtime.use({ known: { enabled: true } });
  assert.throws(() => runtime.apply('known', { initialValue: {} }), /applied item must be function/);
  assert.throws(() => runtime.getItem('missing'), /Invalid key missing/);
});
