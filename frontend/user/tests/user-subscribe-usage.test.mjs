import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

const percentOf = (used, total) => used / total * 100;

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-subscribe-usage.cjs' : '../src/components/SubscribeUsage.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, {
    module, exports: module.exports, require(id) {
      if (id.includes('siteHelpers')) return { f: percentOf };
        throw Error(id);
    },
  });
  if (original) {
    const fixture = module.exports(percentOf);
    return { subscribePercent: fixture.percent, progressBarColor: fixture.color, formatDeviceLimit: fixture.deviceLimit };
  }
  return { subscribePercent: module.exports.subscribePercent, progressBarColor: module.exports.progressBarColor, formatDeviceLimit: module.exports.formatDeviceLimit };
}

const subscribes = [
  { u: 0, d: 0, transfer_enable: 1 },
  { u: 500, d: 500, transfer_enable: 1000 },
  { u: 799, d: 1, transfer_enable: 1000 },
  { u: 800, d: 0, transfer_enable: 1000 },
  { u: 999, d: 1, transfer_enable: 1000 },
  { u: 1000, d: 0, transfer_enable: 1000 },
  { u: 2000, d: 500, transfer_enable: 1000 },
  { u: 1, d: 1, transfer_enable: 0 },
  { u: -1, d: -1, transfer_enable: 1000 },
  { u: 0.3, d: 0.6, transfer_enable: 3 },
  { u: 1e9, d: 1e9, transfer_enable: 8e9 },
];

for (const helper of ['subscribePercent', 'progressBarColor', 'formatDeviceLimit']) for (const [index, subscribe] of subscribes.entries()) test(`${helper} case ${index}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    let value, error;
    try { value = (await load(original))[helper](subscribe); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

const limits = [undefined, null, 0, 1, 3, '2', '', NaN, Infinity];
for (const [index, limit] of limits.entries()) test(`device limit ${String(limit)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    let value, error;
    try { value = (await load(original)).formatDeviceLimit(limit); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('progress color thresholds match original', async () => {
  const fixture = await load(true);
  const current = await load(false);
  assert.equal(current.progressBarColor(99.99), fixture.progressBarColor(99.99));
  assert.equal(current.progressBarColor(100), 'danger');
  assert.equal(current.progressBarColor(80), 'warning');
  assert.equal(current.progressBarColor(79.9), 'success');
  assert.equal(current.subscribePercent({ u: 799, d: 1, transfer_enable: 1000 }), 80);
  assert.equal(current.formatDeviceLimit(null), '∞');
});