import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/app/requestPresentation.ts', import.meta.url), 'utf8');
const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;

test('user request presentation localizes and registers request failures', () => {
  const notifications = [];
  let presenter;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id.includes('locales/i18n')) return { formatMessage: ({ id }) => `translated:${id}` };
      if (id === '@/services/apiClient') return {
        setRequestFailurePresenter: nextPresenter => { presenter = nextPresenter; },
      };
      if (id === './notifications') return { notify: (...args) => notifications.push(args) };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  module.exports.configureRequestPresentation();
  presenter({ titleMessageId: '请求失败', description: 'Invalid email' });
  assert.deepEqual(notifications, [['error', 'translated:请求失败', 'Invalid email']]);
});
