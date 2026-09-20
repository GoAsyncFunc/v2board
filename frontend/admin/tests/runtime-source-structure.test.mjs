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
    '../src/app/requestPresentation.ts',
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
    '../src/types/api.ts',
    '../src/types/dva.ts',
    '../src/types/dvaCore.d.ts',
    '../src/utils/clipboard.ts',
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
    '../src/types/legacyPackages.d.ts',
    '../src/types/copyToClipboard.d.ts',
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

test('admin scripts exclude one-time reverse-engineering extractors', async () => {
  const scriptNames = await fs.readdir(new URL('../scripts/', import.meta.url));
  assert.deepEqual(scriptNames.filter(name => name.startsWith('extract-')), []);
});

test('admin application runtime is implemented as typed TSX components', async () => {
  const runtimeSource = await fs.readFile(new URL('../src/runtime/dvaApplication.tsx', import.meta.url), 'utf8');
  const tsconfig = JSON.parse(await fs.readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'));
  const packageJson = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(runtimeSource, /function createApplicationProvider/);
  assert.match(runtimeSource, /<ApplicationProvider \/>/);
  assert.doesNotMatch(runtimeSource, /React\.createElement/);
  assert.equal(tsconfig.compilerOptions.allowJs, false);
  assert.deepEqual(
    Object.fromEntries(['@types/markdown-it', '@types/react-loadable', '@types/react-router-dom'].map(name => [name, packageJson.devDependencies[name]])),
    {
      '@types/markdown-it': '10.0.3',
      '@types/react-loadable': '5.5.11',
      '@types/react-router-dom': '5.3.3',
    },
  );
});

test('admin DVA runtime uses named contracts instead of broad object placeholders', async () => {
  const contractPaths = [
    '../src/types/store.ts',
    '../src/types/dva.ts',
    '../src/types/dvaCore.d.ts',
    '../src/runtime/dvaApplication.tsx',
    '../src/runtime/loadingPlugin.ts',
    '../src/app/store.tsx',
  ];
  for (const relativePath of contractPaths) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /:\s*object\b|\bobject\[\]/, relativePath);
  }

  const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
  const dvaTypes = await fs.readFile(new URL('../src/types/dva.ts', import.meta.url), 'utf8');
  assert.match(storeTypes, /Action extends AdminAction/);
  assert.match(dvaTypes, /export interface DvaPlugin/);
  assert.match(dvaTypes, /setupMiddlewares\(middlewares: Middleware\[\]\)/);
});

test('admin business contracts do not depend on rendering components', async () => {
  const typesDirectory = new URL('../src/types/', import.meta.url);
  const typeNames = (await fs.readdir(typesDirectory)).filter(name => name.endsWith('.ts'));
  assert.ok(typeNames.includes('filter.ts'));
  for (const typeName of typeNames) {
    const source = await fs.readFile(new URL(typeName, typesDirectory), 'utf8');
    assert.doesNotMatch(source, /from ['"]\.\.\/(components|pages|layouts)\//, `${typeName} depends on the rendering layer`);
  }

  const modelsDirectory = new URL('../src/models/', import.meta.url);
  const modelNames = (await fs.readdir(modelsDirectory)).filter(name => name.endsWith('.ts'));
  for (const modelName of modelNames) {
    const source = await fs.readFile(new URL(modelName, modelsDirectory), 'utf8');
    assert.doesNotMatch(source, /from ['"]\.\.\/components\//, `${modelName} depends on a component`);
    assert.doesNotMatch(source, /from ['"]antd\/lib\/(?:message|notification|modal)['"]/, `${modelName} imports a rendering notification`);
  }

  const contractSources = {
    'filter.ts': ['FilterItem', 'FilterField'],
    'knowledge.ts': ['KnowledgeRecord'],
    'monitoring.ts': ['QueueWorkload', 'DisplayScalar'],
    'notice.ts': ['NoticeRecord'],
    'order.ts': ['OrderDetailRecord'],
    'payment.ts': ['PaymentRecord'],
    'promotion.ts': ['CouponRecord', 'GiftcardRecord'],
    'ticket.ts': ['TicketRecord', 'TicketMessage'],
  };
  for (const [typeName, contracts] of Object.entries(contractSources)) {
    const source = await fs.readFile(new URL(typeName, typesDirectory), 'utf8');
    for (const contract of contracts) assert.match(source, new RegExp(`export (?:interface|type) ${contract}\\b`));
  }
});

test('admin request transport does not depend on the rendering library', async () => {
  const requestSource = await fs.readFile(new URL('../src/services/request.ts', import.meta.url), 'utf8');
  const headerSource = await fs.readFile(new URL('../src/layouts/Header.tsx', import.meta.url), 'utf8');
  const presentationSource = await fs.readFile(new URL('../src/app/requestPresentation.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(requestSource, /from ['"]antd\//);
  assert.doesNotMatch(headerSource, /import ['"]\.\.\/services\/request['"]/);
  assert.match(presentationSource, /setRequestFailurePresenter/);
  assert.match(presentationSource, /from ['"]antd\/lib\/notification['"]/);
});

test('admin models depend on API contracts separately from request transport', async () => {
  const apiSource = await fs.readFile(new URL('../src/types/api.ts', import.meta.url), 'utf8');
  const requestSource = await fs.readFile(new URL('../src/services/request.ts', import.meta.url), 'utf8');
  assert.match(apiSource, /export interface ApiResponse/);
  assert.match(apiSource, /export interface FormRecord/);
  assert.match(apiSource, /export function isSuccessfulResponse/);
  assert.doesNotMatch(requestSource, /export interface ApiResponse/);
  assert.doesNotMatch(requestSource, /export type FormValue/);

  const modelsDirectory = new URL('../src/models/', import.meta.url);
  const modelNames = (await fs.readdir(modelsDirectory)).filter(name => name.endsWith('.ts'));
  for (const modelName of modelNames) {
    const source = await fs.readFile(new URL(modelName, modelsDirectory), 'utf8');
    assert.doesNotMatch(
      source,
      /import\s*\{[^}]*\b(?:ApiResponse|FormRecord|FormValue|JsonValue|isSuccessfulResponse)\b[^}]*\}\s*from ['"]\.\.\/services\/request['"]/s,
      `${modelName} imports API contracts from request transport`,
    );
  }
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
  const domainEntries = await fs.readdir(pagesDirectory, { withFileTypes: true });
  const expectedDomains = ['auth', 'commerce', 'config', 'content', 'dashboard', 'monitoring', 'promotion', 'server', 'user'];
  assert.deepEqual(domainEntries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort(), expectedDomains);
  assert.deepEqual(domainEntries.filter(entry => entry.isFile() && entry.name.endsWith('.tsx')), []);

  for (const domain of expectedDomains) {
    const domainDirectory = new URL(`${domain}/`, pagesDirectory);
    const pageNames = (await fs.readdir(domainDirectory)).filter(name => name.endsWith('.tsx'));
    assert.ok(pageNames.length > 0, `${domain} should contain at least one page`);
    for (const pageName of pageNames) {
      const relativePageName = `${domain}/${pageName}`;
      const source = await fs.readFile(new URL(pageName, domainDirectory), 'utf8');
      assert.doesNotMatch(source, /interface\s+\w*RootState\b/, `${relativePageName} declares a duplicate root state`);
      if (source.includes('connect(')) {
        assert.match(source, /connect\(\(state:\s*AdminRootState\)/, `${relativePageName} must select from AdminRootState`);
      }
    }
  }
});

test('admin components use business domains and connected editors use the canonical root state', async () => {
  const componentsDirectory = new URL('../src/components/', import.meta.url);
  const componentEntries = await fs.readdir(componentsDirectory, { withFileTypes: true });
  const expectedDomains = ['commerce', 'common', 'config', 'content', 'monitoring', 'promotion', 'server', 'user'];
  assert.deepEqual(componentEntries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort(), expectedDomains);
  assert.deepEqual(componentEntries.filter(entry => entry.isFile() && /\.tsx?$/.test(entry.name)), []);

  for (const domain of expectedDomains) {
    const componentNames = await fs.readdir(new URL(`${domain}/`, componentsDirectory));
    assert.ok(componentNames.some(name => /\.tsx?$/.test(name)), `${domain} should contain at least one component`);
  }

  const connectedSources = [
    '../src/layouts/Header.tsx',
    '../src/layouts/MainLayout.tsx',
    '../src/components/server/AnyTlsEditor.tsx',
    '../src/components/commerce/AssignOrderEditor.tsx',
    '../src/components/server/HysteriaEditor.tsx',
    '../src/components/common/PermissionGroupEditor.tsx',
    '../src/components/user/SendMailEditor.tsx',
    '../src/components/server/ShadowsocksEditor.tsx',
    '../src/components/server/TrojanEditor.tsx',
    '../src/components/server/TuicEditor.tsx',
    '../src/components/user/UserEditor.tsx',
    '../src/components/user/UserGenerator.tsx',
    '../src/components/server/V2NodeEditor.tsx',
    '../src/components/server/VlessEditor.tsx',
    '../src/components/server/VmessEditor.tsx',
  ];
  for (const relativePath of connectedSources) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /interface\s+\w*RootState\b/, `${relativePath} declares a duplicate root state`);
    assert.match(source, /AdminRootState/, `${relativePath} must select from AdminRootState`);
  }
});

test('admin router selectors use the canonical root state', async () => {
  const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
  const routerTypes = await fs.readFile(new URL('../src/types/router.ts', import.meta.url), 'utf8');
  const routerBindings = await fs.readFile(new URL('../src/runtime/routerBindings.tsx', import.meta.url), 'utf8');
  assert.match(storeTypes, /router\?: RouterState/);
  assert.match(routerTypes, /export interface RouterState/);
  assert.doesNotMatch(routerBindings, /interface\s+RouterRootState\b/);
  assert.match(routerBindings, /state: AdminRootState/);
});
