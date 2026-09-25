import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

const moment = value => ({ format: pattern => `${value}:${pattern}` });

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-datetime-display.cjs' : '../src/utils/dateTimeFormatter.ts', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'ts' })).code, {
    module, exports: module.exports, require(id) {
      if (id === 'moment' || id.includes('77642f52')) return moment;
        throw Error(id);
    },
  });
  if (original) {
    const fixture = module.exports(moment);
    return { formatDateTime: value => fixture.my({ created_at: value }), theirTimestamp: value => fixture.theirs({ created_at: value }) };
  }
  return { formatDateTime: module.exports.formatDateTime, theirTimestamp: module.exports.formatDateTime };
}

const times = [0, 1, 1700000000, -999999999, 999999999999, null, undefined, '1700000000', 'invalid', NaN, Infinity];
for (const helper of ['formatDateTime', 'theirTimestamp']) for (const time of times) test(`${helper} ${String(time)}`, async () => {
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

test('formatDateTime accepts the original full-precision display format', async () => {
  const { formatDateTime } = await load(false);
  assert.equal(
    formatDateTime(1700000000, 'YYYY-MM-DD HH:mm:ss'),
    '1700000000000:YYYY-MM-DD HH:mm:ss',
  );
});
