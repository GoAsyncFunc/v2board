import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

const nowSeconds = 1700000000;
const moment = (...args) => {
  const value = args.length ? args[0] : nowSeconds;
  return { format: pattern => pattern === 'X' ? String(value) : `${value}:${pattern}` };
};

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-datetime-display.cjs' : '../src/components/DateTimeDisplay.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, {
    module, exports: module.exports, require(id) {
      if (id.includes('77642f52')) return moment;
        throw Error(id);
    },
  });
  if (original) {
    const fixture = module.exports(moment);
    return { formatDateTime: value => fixture.my({ created_at: value }), theirTimestamp: value => fixture.theirs({ created_at: value }), formatDate: fixture.date, formatDateDash: fixture.dateDash, formatDateTimeSeconds: fixture.seconds, formatDaysRemaining: fixture.daysRemaining };
  }
  return { formatDateTime: module.exports.formatDateTime, theirTimestamp: module.exports.formatDateTime, formatDate: module.exports.formatDate, formatDateDash: module.exports.formatDateDash, formatDateTimeSeconds: module.exports.formatDateTimeSeconds, formatDaysRemaining: module.exports.formatDaysRemaining };
}

const times = [0, 1, 1700000000, -999999999, 999999999999, null, undefined, '1700000000', 'invalid', NaN, Infinity];

for (const helper of ['formatDateTime', 'formatDate', 'formatDateDash', 'formatDateTimeSeconds', 'formatDaysRemaining']) for (const time of times) test(`${helper} ${String(time)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    let value, error;
    try { value = (await load(original))[helper](time); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('timestamp coercion trace matches original', async () => {
  const make = () => { const trace = []; const value = { [Symbol.toPrimitive](hint) { trace.push(hint); return 1700000000; } }; return { trace, value }; };
  const originalInput = make();
  const original = (await load(true)).formatDateTime(originalInput.value);
  const currentInput = make();
  const current = (await load(false)).formatDateTime(currentInput.value);
  assert.equal(current, original);
  assert.deepEqual(currentInput.trace, originalInput.trace);
  assert.deepEqual(originalInput.trace, ['number']);
});

test('my/theirs branches match formatDateTime', async () => {
  const fixture = await load(true);
  const current = await load(false);
  assert.equal(fixture.theirTimestamp(1700000000), fixture.formatDateTime(1700000000));
  assert.equal(current.formatDateTime(1700000000), fixture.formatDateTime(1700000000));
});

test('expiry date and days remaining are consistent', async () => {
  const fixture = await load(true);
  const current = await load(false);
  const expiredAt = 1700000000 + 86400 * 3;
  assert.equal(current.formatDate(expiredAt), fixture.formatDate(expiredAt));
  assert.equal(current.formatDaysRemaining(expiredAt), '3');
  assert.equal(fixture.formatDaysRemaining(expiredAt), '3');
  assert.equal(current.formatDaysRemaining(nowSeconds), '0');
});