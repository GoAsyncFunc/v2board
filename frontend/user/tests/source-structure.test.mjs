import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('user business components live outside the vendor compatibility layer', async () => {
  const componentPaths = [
    '../src/components/Recaptcha.tsx',
    '../src/components/SubscribeImporter.tsx',
    '../src/components/TelegramBindModal.tsx',
    '../src/components/LoadingContainer.tsx',
    '../src/components/checkout/StripePaymentForm.tsx',
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

test('user application runtime is implemented as typed TSX components', async () => {
  const runtimeSource = await fs.readFile(new URL('../src/runtime/dvaApplication.tsx', import.meta.url), 'utf8');
  const tsconfig = JSON.parse(await fs.readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'));
  assert.match(runtimeSource, /function createApplicationProvider/);
  assert.match(runtimeSource, /<ApplicationProvider \/>/);
  assert.doesNotMatch(runtimeSource, /React\.createElement/);
  assert.equal(tsconfig.compilerOptions.allowJs, false);
});

test('user root state names every registered business model', async () => {
  const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
  const rootRuntime = await fs.readFile(new URL('../src/app/rootRuntime.tsx', import.meta.url), 'utf8');
  const dashboard = await fs.readFile(new URL('../src/pages/Dashboard.tsx', import.meta.url), 'utf8');
  assert.match(storeTypes, /export interface UserRootState/);
  for (const model of ['comm', 'coupon', 'guest', 'invite', 'knowledge', 'layout', 'notice', 'order', 'passport', 'plan', 'server', 'stat', 'telegram', 'ticket', 'tutorial', 'user']) {
    assert.match(storeTypes, new RegExp(`\\b${model}:`));
  }
  assert.doesNotMatch(storeTypes, /UserRootState = Record<string, object>/);
  assert.match(rootRuntime, /Partial<UserRootState>/);
  assert.match(dashboard, /Pick<UserRootState/);
});
