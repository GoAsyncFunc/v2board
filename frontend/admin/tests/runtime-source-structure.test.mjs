import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('admin application runtime uses typed source modules outside vendor', async () => {
  const typedRuntimePaths = [
    '../src/main.ts',
    '../src/app/bootstrap.tsx',
    '../src/app/history.ts',
    '../src/app/historyFactory.ts',
    '../src/app/store.tsx',
    '../src/app/dvaConfig.ts',
    '../src/app/navigation.ts',
    '../src/app/rootRuntime.tsx',
    '../src/runtime/dvaApplication.tsx',
    '../src/runtime/loadingPlugin.ts',
    '../src/runtime/pluginRuntime.ts',
    '../src/runtime/routerBindings.tsx',
    '../src/services/fetchResponse.ts',
  ];
  for (const relativePath of typedRuntimePaths) {
    const stat = await fs.stat(new URL(relativePath, import.meta.url));
    assert.equal(stat.isFile(), true, `${relativePath} should be a file`);
  }

  const removedPaths = [
    '../src/main.js',
    '../src/app/bootstrap.js',
    '../src/app/history.js',
    '../src/app/store.js',
    '../src/runtime/loadingPlugin.js',
    '../src/runtime/pluginRuntime.js',
    '../src/runtime/routerBindings.js',
    '../src/vendor/appDvaConfig.js',
    '../src/vendor/appRuntime.js',
    '../src/vendor/dva.js',
    '../src/vendor/reactRedux.js',
    '../src/vendor/rootRuntime.js',
    '../src/vendor/routerHistory.js',
    '../src/vendor/routerHistory.d.ts',
  ];
  for (const relativePath of removedPaths) {
    await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
  }
});

test('admin configuration and browser helpers use typed source modules outside vendor', async () => {
  const typedSourcePaths = [
    '../src/config/adminSettings.ts',
    '../src/config/siteSettings.ts',
    '../src/utils/siteHelpers.ts',
  ];
  for (const relativePath of typedSourcePaths) {
    const stat = await fs.stat(new URL(relativePath, import.meta.url));
    assert.equal(stat.isFile(), true, `${relativePath} should be a file`);
  }

  const removedPaths = [
    '../src/vendor/adminSettings.js',
    '../src/vendor/adminSettings.d.ts',
    '../src/vendor/clipboard.js',
    '../src/vendor/dateTime.js',
    '../src/vendor/notification.js',
    '../src/vendor/siteHelpers.js',
    '../src/vendor/siteHelpers.d.ts',
    '../src/vendor/siteSettings.js',
    '../src/vendor/siteSettings.d.ts',
    '../src/vendor/ui.js',
  ];
  for (const relativePath of removedPaths) {
    await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
  }
});
