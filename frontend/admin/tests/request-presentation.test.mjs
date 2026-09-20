import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/app/requestPresentation.ts', import.meta.url), 'utf8');
const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;

test('admin request presentation registers the Ant Design error adapter', () => {
  const notifications = [];
  let presenter;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'antd/lib/notification') return { error: options => notifications.push(options) };
      if (id === '../services/request') return {
        setRequestFailurePresenter: nextPresenter => { presenter = nextPresenter; },
      };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  module.exports.configureRequestPresentation();
  presenter({ title: '请求失败', description: 'Invalid email', durationSeconds: 1.5 });

  assert.deepEqual(JSON.parse(JSON.stringify(notifications)), [{
    message: '请求失败',
    description: 'Invalid email',
    duration: 1.5,
  }]);
});
