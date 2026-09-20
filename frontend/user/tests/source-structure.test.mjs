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
  ];
  for (const relativePath of removedVendorPaths) {
    await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
  }
});
