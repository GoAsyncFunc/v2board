import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-queue-display.cjs' : '../src/components/QueueDisplayColumns.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs' })).code, { module, exports: module.exports, require() { throw Error('no deps'); } });
  return original ? module.exports() : module.exports.createReadonlyQueueColumns();
}
const normalize = value => JSON.parse(JSON.stringify(value, (key, value) => typeof value === 'function' ? '[render]' : value));

// Symbol.toPrimitive trace: the original `e + "s"` path coerces via default hint.
for (const fail of [false, true]) test(`queue wait coercion ${fail}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const trace = [];
    const value = { [Symbol.toPrimitive](hint) { trace.push(hint); if (fail) throw new TypeError('fixture'); return 42; } };
    const column = (await load(original)).find(c => c.key === 'wait');
    let rendered, error;
    try { rendered = column.render(value); } catch (e) { error = e.name; }
    results.push({ trace, rendered, error });
  }
  assert.deepEqual(results[1], results[0]);
  assert.deepEqual(results[1].trace, ['default']);
});

// Force toString/valueOf fallback traces.
for (const fail of [false, true]) test(`queue wait toString fallback ${fail}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const calls = [];
    const value = {
      toString() { calls.push('toString'); if (fail) throw new TypeError('fixture'); return '7'; },
      valueOf() { calls.push('valueOf'); return {}; },
    };
    const column = (await load(original)).find(c => c.key === 'wait');
    let rendered, error;
    try { rendered = column.render(value); } catch (e) { error = e.name; }
    results.push({ calls, rendered, error });
  }
  assert.deepEqual(results[1], results[0]);
});

const names = ['order_handle', 'send_email', 'send_email_mass', 'send_telegram', 'stat', 'traffic_fetch', 'unknown_name', '', null, undefined, Symbol('x')];
for (const name of names) test(`queue name mapping ${String(name)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).find(c => c.key === 'name');
    let value, error;
    try { value = column.render(name); } catch (e) { error = e.name; }
    results.push({ value: typeof value === 'symbol' ? String(value) : value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

const waits = [0, -5, 3.5, 1700000000, null, undefined, NaN, Infinity, '1s', '1700000000'];
for (const wait of waits) test(`queue wait value ${String(wait)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).find(c => c.key === 'wait');
    let value, error;
    try { value = column.render(wait); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

const records = [{ name: 'order_handle', processes: 3, length: 99, wait: 1 }, { name: 'stat' }, { name: 'unknown' }, { name: null, wait: null }, {}, null];
for (const [index, record] of records.entries()) test(`queue readonly display ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const columns = await load(original);
    const values = columns.map(column => column.render && 'dataIndex' in column ? column.render(record?.[column.dataIndex], record) : record?.[column.dataIndex]);
    results.push(normalize({ columns, values }));
  }
  assert.deepEqual(results[1], results[0]);
});
