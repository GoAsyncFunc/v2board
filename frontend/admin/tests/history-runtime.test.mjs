import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadHistoryFactory(historyFixture) {
  const source = await fs.readFile(new URL('../src/app/historyFactory.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const module = { exports: {} };

  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    URLSearchParams,
    require(id) {
      if (id === 'history') return { createHashHistory: () => historyFixture };
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
  const runtime = await loadHistoryFactory(history);
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
