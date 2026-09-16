import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const moment = value => ({ format: pattern => `${value}:${pattern}` });

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-datetime-display.cjs' : '../user/src/components/DateTimeDisplay.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, {
    module, exports: module.exports, require(id) {
      if (id.includes('77642f52')) return moment;
      throw Error(id);
    },
  });
  return original ? { my: module.exports(moment).my, theirs: module.exports(moment).theirs, format: null } : { format: module.exports.formatDateTime };
}

for (const time of [0, 1, 1700000000, -999999999, 999999999999, null, undefined, '1700000000', 'invalid', NaN, Infinity]) test(`chat timestamp ${String(time)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    let value, error;
    try { value = original ? (await load(true)).my({ created_at: time }) : (await load(false)).format(time); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('chat timestamp coercion trace matches original', async () => {
  const make = () => { const trace = []; const value = { [Symbol.toPrimitive](hint) { trace.push(hint); return 1700000000; } }; return { trace, value }; };
  const originalInput = make();
  const original = (await load(true)).my({ created_at: originalInput.value });
  const currentInput = make();
  const current = (await load(false)).format(currentInput.value);
  assert.equal(current, original);
  assert.deepEqual(currentInput.trace, originalInput.trace);
  assert.deepEqual(originalInput.trace, ['number']);
});

test('my/theirs branch renders same as formatDateTime', async () => {
  const original = (await load(true)).my({ created_at: 1700000000 });
  const theirs = (await load(true)).theirs({ created_at: 1700000000 });
  const current = (await load(false)).format(1700000000);
  assert.equal(original, theirs);
  assert.equal(current, original);
});