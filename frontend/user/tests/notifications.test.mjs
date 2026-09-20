import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/app/notifications.ts', import.meta.url), 'utf8');
const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;

function loadNotifications(mobile) {
  const mobileMessages = [];
  const desktopMessages = [];
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'antd/lib/message') return { error: value => mobileMessages.push(['error', value]) };
      if (id === 'antd/lib/notification') return { error: value => desktopMessages.push(['error', value]) };
      if (id.includes('siteHelpers')) return { isMobile: () => mobile };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return { notifications: module.exports, mobileMessages, desktopMessages };
}

test('user notifications use compact messages on mobile', () => {
  const runtime = loadNotifications(true);
  runtime.notifications.notify('error', '请求失败', 'Invalid email');
  assert.deepEqual(runtime.mobileMessages, [['error', 'Invalid email']]);
  assert.deepEqual(runtime.desktopMessages, []);
});

test('user notifications use titled desktop notifications', () => {
  const runtime = loadNotifications(false);
  runtime.notifications.notify('error', '请求失败', 'Invalid email');
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.desktopMessages)), [['error', {
    message: '请求失败',
    description: 'Invalid email',
    duration: 1.5,
  }]]);
  assert.deepEqual(runtime.mobileMessages, []);
});
