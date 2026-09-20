import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('user business components live outside the vendor compatibility layer', async () => {
  const componentsDirectory = new URL('../src/components/', import.meta.url);
  const componentEntries = await fs.readdir(componentsDirectory, { withFileTypes: true });
  const expectedDomains = ['account', 'commerce', 'common', 'subscription', 'support'];
  assert.deepEqual(componentEntries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort(), expectedDomains);
  assert.deepEqual(componentEntries.filter(entry => entry.isFile() && /\.tsx?$/.test(entry.name)), []);

  for (const domain of expectedDomains) {
    const componentNames = await fs.readdir(new URL(`${domain}/`, componentsDirectory));
    assert.ok(componentNames.some(name => /\.tsx?$/.test(name)), `${domain} should contain at least one component`);
  }
  await fs.access(new URL('commerce/checkout/', componentsDirectory));

  const componentPaths = [
    '../src/components/common/Recaptcha.tsx',
    '../src/components/subscription/SubscribeImporter.tsx',
    '../src/components/account/TelegramBindModal.tsx',
    '../src/components/common/LoadingContainer.tsx',
    '../src/components/commerce/checkout/StripePaymentForm.tsx',
  ];
  for (const relativePath of componentPaths) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    assert.match(source, /export default/);
  }

  const removedVendorPaths = [
    '../src/vendor/features.js',
    '../src/vendor/features',
    '../src/vendor/featureRuntime.js',
    '../src/vendor/loadingIndicator.js',
    '../src/vendor/payment.js',
    '../src/vendor/Divider.js',
    '../src/vendor/Icon.js',
    '../src/vendor/Modal.js',
    '../src/vendor/clipboard.js',
    '../src/vendor/dateTime.js',
    '../src/vendor/iconStyles.js',
    '../src/vendor/notification.js',
    '../src/vendor/reactRedux.js',
    '../src/vendor/router.js',
    '../src/vendor/theme.js',
    '../src/vendor/routerHistory.js',
    '../src/vendor/content.js',
    '../src/vendor/subscribeStyles.js',
    '../src/vendor/utilities.js',
    '../src/vendor/ui.js',
    '../src/vendor/siteHelpers.js',
    '../src/vendor/siteHelpers.d.ts',
    '../src/vendor/localeSettings.js',
    '../src/vendor/i18n.js',
    '../src/vendor/i18n.d.ts',
    '../src/vendor/locales.js',
    '../src/vendor/appDvaConfig.js',
    '../src/vendor/appRuntime.js',
    '../src/vendor/dva.js',
    '../src/vendor/rootRuntime.js',
    '../src/vendor/routerRuntime.js',
  ];
  for (const relativePath of removedVendorPaths) {
    await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
  }
});

test('user route definitions live in the dedicated routes directory', async () => {
  const routeSource = await fs.readFile(new URL('../src/routes/index.ts', import.meta.url), 'utf8');
  assert.match(routeSource, /export interface UserRoute/);
  assert.match(routeSource, /path: '\/dashboard'/);
  assert.match(routeSource, /path: '\/order\/:trade_no'/);
  await assert.rejects(fs.access(new URL('../src/app/routes.ts', import.meta.url)));
});

test('user pages are grouped by business domain without migration scripts', async () => {
  const pagesDirectory = new URL('../src/pages/', import.meta.url);
  const pageEntries = await fs.readdir(pagesDirectory, { withFileTypes: true });
  const expectedDomains = ['account', 'auth', 'commerce', 'dashboard', 'subscription', 'support'];
  assert.deepEqual(pageEntries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort(), expectedDomains);
  assert.deepEqual(pageEntries.filter(entry => entry.isFile() && entry.name.endsWith('.tsx')), []);

  for (const domain of expectedDomains) {
    const pageNames = await fs.readdir(new URL(`${domain}/`, pagesDirectory));
    assert.ok(pageNames.some(name => name.endsWith('.tsx')), `${domain} should contain at least one page`);
  }

  const scriptNames = await fs.readdir(new URL('../scripts/', import.meta.url));
  for (const removedScript of ['split-order-payment.mjs', 'check-page-screenshots.mjs']) {
    assert.equal(scriptNames.includes(removedScript), false);
  }
});

test('user application runtime is implemented as typed TSX components', async () => {
  const runtimeSource = await fs.readFile(new URL('../src/runtime/dvaApplication.tsx', import.meta.url), 'utf8');
  const tsconfig = JSON.parse(await fs.readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'));
  const packageJson = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(runtimeSource, /function createApplicationProvider/);
  assert.match(runtimeSource, /<ApplicationProvider \/>/);
  assert.doesNotMatch(runtimeSource, /React\.createElement/);
  assert.equal(tsconfig.compilerOptions.allowJs, false);
  assert.deepEqual(
    Object.fromEntries(['@types/qrcode.react', '@types/react-intl', '@types/react-loadable'].map(name => [name, packageJson.devDependencies[name]])),
    {
      '@types/qrcode.react': '1.0.5',
      '@types/react-intl': '2.3.18',
      '@types/react-loadable': '5.5.11',
    },
  );
  await fs.access(new URL('../src/types/classnames.d.ts', import.meta.url));
  await fs.access(new URL('../src/types/dvaCore.d.ts', import.meta.url));
  await assert.rejects(fs.access(new URL('../src/types/legacyPackages.d.ts', import.meta.url)));
});

test('user root state names every registered business model', async () => {
  const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
  const rootRuntime = await fs.readFile(new URL('../src/app/rootRuntime.tsx', import.meta.url), 'utf8');
  const dashboard = await fs.readFile(new URL('../src/pages/dashboard/Dashboard.tsx', import.meta.url), 'utf8');
  assert.match(storeTypes, /export interface UserRootState/);
  for (const model of ['comm', 'coupon', 'guest', 'invite', 'knowledge', 'layout', 'notice', 'order', 'passport', 'plan', 'server', 'stat', 'telegram', 'ticket', 'tutorial', 'user']) {
    assert.match(storeTypes, new RegExp(`\\b${model}:`));
  }
  assert.doesNotMatch(storeTypes, /UserRootState = Record<string, object>/);
  assert.match(storeTypes, /router\?: RouterState/);
  assert.match(rootRuntime, /Partial<UserRootState>/);
  assert.match(dashboard, /Pick<UserRootState/);
});

test('user Redux selectors share the canonical root state contract', async () => {
  const sourceRoot = new URL('../src/', import.meta.url);
  const sourceFiles = [];
  const visit = async directory => {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const entryUrl = new URL(entry.name, directory.href.endsWith('/') ? directory : new URL(`${directory.href}/`));
      if (entry.isDirectory()) await visit(new URL(`${entryUrl.href}/`));
      else if (/\.tsx?$/.test(entry.name)) sourceFiles.push(entryUrl);
    }
  };
  await visit(sourceRoot);

  for (const fileUrl of sourceFiles) {
    const source = await fs.readFile(fileUrl, 'utf8');
    if (!fileUrl.pathname.endsWith('/types/store.ts')) {
      assert.doesNotMatch(source, /(?:interface|type)\s+\w*RootState\b/, fileUrl.pathname);
    }
    if (!source.includes('connect(') || fileUrl.pathname.endsWith('/layouts/Sidebar.tsx')) continue;
    for (const selector of source.matchAll(/connect(?:<[^;]+?>)?\(\s*\(?([^=]*?)\)?\s*=>/gs)) {
      assert.match(selector[1], /UserRootState/, fileUrl.pathname);
    }
  }

  const routerTypes = await fs.readFile(new URL('../src/types/router.ts', import.meta.url), 'utf8');
  const routerBindings = await fs.readFile(new URL('../src/runtime/routerBindings.tsx', import.meta.url), 'utf8');
  assert.match(routerTypes, /export interface RouterState/);
  assert.match(routerBindings, /state: UserRootState/);
});
