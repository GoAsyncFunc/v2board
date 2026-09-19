import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadAppRuntime(historyFixture) {
  const source = await fs.readFile(new URL('../src/vendor/appRuntime.js', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'js' })).code;
  const module = { exports: {} };

  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    URLSearchParams,
    require(id) {
      if (id === 'history') return { createHashHistory: () => historyFixture };
      if (id === 'react-router-dom') return { Prompt: 'Prompt' };
      if (id.includes('pluginRuntime')) return {};
      if (id.includes('appDvaConfig')) return { __esModule: true, default: {} };
      if (id.includes('loadingPlugin')) return { __esModule: true, default: () => {} };
      if (id.includes('routeRenderer')) return { __esModule: true, default: () => null };
      if (id.includes('rootRuntime')) {
        return { initialProps: {}, modifyInitialProps: {}, rootContainer: {} };
      }
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return module.exports;
}

test('admin history restores the parsed location.query contract', async () => {
  let internalListener;
  const history = {
    location: {
      pathname: '/login',
      search: '?redirect=%2Fdashboard&tag=one&tag=two',
      hash: '',
    },
    listen(listener) {
      internalListener = listener;
      return () => {};
    },
  };
  const runtime = await loadAppRuntime(history);
  const enhancedHistory = runtime.createHistory({ basename: '/' });

  assert.deepEqual(JSON.parse(JSON.stringify(enhancedHistory.location.query)), {
    redirect: '/dashboard',
    tag: ['one', 'two'],
  });

  let receivedLocation;
  enhancedHistory.listen(location => {
    receivedLocation = location;
  });
  internalListener({ pathname: '/login', search: '?redirect=%2Fuser', hash: '' }, 'PUSH');
  assert.deepEqual(JSON.parse(JSON.stringify(receivedLocation.query)), { redirect: '/user' });
});
