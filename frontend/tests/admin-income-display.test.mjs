import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-income-display.cjs' : '../admin/src/components/MoneyDisplay.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, { module, exports: module.exports, require(id) { throw Error(id); } });
  if (original) { const f = module.exports(); return { formatIncome: f.income, formatLiveCount: f.count }; }
  return { formatIncome: module.exports.formatIncome, formatLiveCount: module.exports.formatLiveCount };
}

const values = [undefined, null, 0, 1, 100, 12345, 99, 101, -100, 1.5, '12345', '0', 'abc', '1e3', '', NaN, Infinity, -Infinity, false, true];
for (const helper of ['formatIncome', 'formatLiveCount']) for (const value of values) test(`${helper} ${String(value)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    let out, error;
    try { out = (await load(original))[helper](value); } catch (e) { error = e.name; }
    results.push({ out, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('income falls back to 0.00 and count to 0', async () => {
  const current = await load(false);
  assert.equal(current.formatIncome(0), '0.00');
  assert.equal(current.formatIncome(undefined), '0.00');
  assert.equal(current.formatIncome(12345), '123.45');
  assert.equal(current.formatLiveCount(0), '0');
  assert.equal(current.formatLiveCount(42), 42);
});