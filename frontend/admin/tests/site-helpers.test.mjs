import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadSiteHelpers({ userAgent = 'desktop', initialStorage = {} } = {}) {
  const source = await fs.readFile(new URL('../src/utils/siteHelpers.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const storage = new Map(Object.entries(initialStorage));
  const messages = [];
  const copies = [];
  const localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key),
  };
  const document = { cookie: 'theme=dark; encoded=hello%20world' };
  const window = { navigator: { userAgent }, localStorage };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    document,
    window,
    localStorage,
    require(id) {
      if (id === './clipboard') return { copyOptionalText: value => { copies.push(value); return true; } };
      if (id === 'antd/lib/message') return { success: value => messages.push(value) };
      throw new Error(id);
    },
  });
  return { helpers: module.exports, storage, messages, copies };
}

async function loadClipboardAdapter() {
  const source = await fs.readFile(new URL('../src/utils/clipboard.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const copies = [];
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'copy-to-clipboard') return value => { copies.push(value); return true; };
      throw new Error(id);
    },
  });
  return { clipboard: module.exports, copies };
}

test('admin clipboard adapter keeps strict and recovered optional calls separate', async () => {
  const { clipboard, copies } = await loadClipboardAdapter();
  assert.equal(clipboard.copyText('fixture-value'), true);
  assert.equal(clipboard.copyOptionalText(undefined), true);
  assert.deepEqual(copies, ['fixture-value', undefined]);
});

test('admin site helpers preserve cookies, device detection, traffic formatting and token storage', async () => {
  const { helpers, storage } = await loadSiteHelpers({ userAgent: 'Fixture Mobile Browser' });
  assert.equal(helpers.getCookie('encoded'), 'hello world');
  assert.equal(helpers.getCookie('missing'), '');
  assert.equal(helpers.isMobile(), true);
  assert.equal(helpers.formatBytes(1024), '1024.00 B');
  assert.equal(helpers.formatBytes(1025), '1.00 KB');
  assert.equal(helpers.formatBytes(-1), 0);
  helpers.setToken('fixture-token');
  assert.equal(helpers.getToken(), 'fixture-token');
  helpers.clearToken();
  assert.equal(storage.has('authorization'), false);
});

test('admin site helpers preserve preference replacement and clipboard feedback behavior', async () => {
  const { helpers, storage, messages, copies } = await loadSiteHelpers({
    initialStorage: { habit: JSON.stringify({ first: 1 }) },
  });
  helpers.setPreference('second', 2);
  assert.equal(JSON.parse(storage.get('habit')), JSON.stringify({ first: 1 }));
  assert.equal(helpers.getPreference('second'), undefined);
  assert.equal(helpers.getPreference('missing'), undefined);
  assert.equal(helpers.copyToClipboard('fixture-value'), true);
  assert.equal(helpers.copyToClipboard(), true);
  assert.deepEqual(copies, ['fixture-value', undefined]);
  assert.deepEqual(messages, ['复制成功', '复制成功']);

  const empty = await loadSiteHelpers();
  empty.helpers.setPreference('second', 2);
  assert.deepEqual(JSON.parse(empty.storage.get('habit')), { second: 2 });
  assert.equal(empty.helpers.getPreference('second'), 2);
});
