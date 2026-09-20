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
    '../src/runtime/routeRenderer.tsx',
    '../src/services/fetchResponse.ts',
    '../src/services/request.ts',
    '../src/services/download.ts',
    '../src/routes/index.ts',
    '../src/routes/types.ts',
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
    '../src/runtime/routeRenderer.js',
    '../src/services/request.js',
    '../src/services/request.d.ts',
    '../src/services/download.js',
    '../src/app/routes.js',
    '../src/app/routes.ts',
    '../src/app/moduleInterop.js',
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

test('admin route definitions live in the dedicated routes directory', async () => {
  const routeSource = await fs.readFile(new URL('../src/routes/index.ts', import.meta.url), 'utf8');
  const routeTypeSource = await fs.readFile(new URL('../src/routes/types.ts', import.meta.url), 'utf8');
  assert.match(routeSource, /const adminRoutes: AdminRouteConfig\[\]/);
  assert.match(routeSource, /path: '\/dashboard'/);
  assert.match(routeSource, /path: '\/ticket\/:ticket_id'/);
  assert.match(routeTypeSource, /export interface AdminRouteConfig/);
  await assert.rejects(fs.access(new URL('../src/app/routes.ts', import.meta.url)));
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

test('admin source no longer contains a vendor compatibility directory', async () => {
  const typedStylePath = '../src/styles/ticketDetail.ts';
  const stat = await fs.stat(new URL(typedStylePath, import.meta.url));
  assert.equal(stat.isFile(), true, `${typedStylePath} should be a file`);
  await assert.rejects(fs.access(new URL('../src/vendor', import.meta.url)));
});

test('admin application runtime is implemented as typed TSX components', async () => {
  const runtimeSource = await fs.readFile(new URL('../src/runtime/dvaApplication.tsx', import.meta.url), 'utf8');
  const tsconfig = JSON.parse(await fs.readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'));
  assert.match(runtimeSource, /function createApplicationProvider/);
  assert.match(runtimeSource, /<ApplicationProvider \/>/);
  assert.doesNotMatch(runtimeSource, /React\.createElement/);
  assert.equal(tsconfig.compilerOptions.allowJs, false);
});

test('admin root state names every registered business model', async () => {
  const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
  const rootRuntime = await fs.readFile(new URL('../src/app/rootRuntime.tsx', import.meta.url), 'utf8');
  assert.match(storeTypes, /export interface AdminRootState/);
  for (const model of [
    'auth', 'config', 'coupon', 'giftcard', 'knowledge', 'layout', 'notice', 'order',
    'passport', 'payment', 'plan', 'serverAnyTLS', 'serverGroup', 'serverHysteria',
    'serverManage', 'serverRoute', 'serverShadowsocks', 'serverTrojan', 'serverTuic',
    'serverV2node', 'serverVless', 'serverVmess', 'stat', 'system', 'theme', 'ticket', 'user',
  ]) assert.match(storeTypes, new RegExp(`\\b${model}:`));
  assert.doesNotMatch(storeTypes, /AdminRootState = Record<string, object>/);
  assert.match(rootRuntime, /Partial<AdminRootState>/);
});

test('admin pages select from the canonical root state', async () => {
  const pagesDirectory = new URL('../src/pages/', import.meta.url);
  const pageNames = (await fs.readdir(pagesDirectory)).filter(name => name.endsWith('.tsx'));
  for (const pageName of pageNames) {
    const source = await fs.readFile(new URL(pageName, pagesDirectory), 'utf8');
    assert.doesNotMatch(source, /interface\s+\w*RootState\b/, `${pageName} declares a duplicate root state`);
    if (source.includes('connect(')) {
      assert.match(source, /connect\(\(state:\s*AdminRootState\)/, `${pageName} must select from AdminRootState`);
    }
  }
});

test('admin connected layouts and editors use the canonical root state', async () => {
  const connectedSources = [
    '../src/layouts/Header.tsx',
    '../src/layouts/MainLayout.tsx',
    '../src/components/AnyTlsEditor.tsx',
    '../src/components/AssignOrderEditor.tsx',
    '../src/components/HysteriaEditor.tsx',
    '../src/components/PermissionGroupEditor.tsx',
    '../src/components/SendMailEditor.tsx',
    '../src/components/ShadowsocksEditor.tsx',
    '../src/components/TrojanEditor.tsx',
    '../src/components/TuicEditor.tsx',
    '../src/components/UserEditor.tsx',
    '../src/components/UserGenerator.tsx',
    '../src/components/V2NodeEditor.tsx',
    '../src/components/VlessEditor.tsx',
    '../src/components/VmessEditor.tsx',
  ];
  for (const relativePath of connectedSources) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /interface\s+\w*RootState\b/, `${relativePath} declares a duplicate root state`);
    assert.match(source, /AdminRootState/, `${relativePath} must select from AdminRootState`);
  }
});
