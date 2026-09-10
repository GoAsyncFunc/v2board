import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
const React = { createElement: (type, props, ...children) => ({ type, props, children }) };
const moment = value => ({ format: pattern => `${value}:${pattern}` });
async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-coupon-display.cjs' : '../admin/src/components/CouponDisplayColumns.jsx', import.meta.url);
  const source = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? source : (await transform(source, { format: 'cjs', loader: 'jsx' })).code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id.includes('6d723332')) return { a: 'Tag' };
    if (id.includes('77642f52')) return moment;
    throw Error(id);
  } });
  return original ? module.exports({ a: React }, { a: 'Tag' }, () => moment) : Object.values(module.exports.createReadonlyCouponColumns());
}
const normalize = value => JSON.parse(JSON.stringify(value, (key, value) => typeof value === 'function' ? '[render]' : value));
const records = [];
for (const type of [1, 2, 99, '1', null]) for (const limit_use of [0, null, undefined, -1]) records.push({ id: 7, name: 'Fixture', type, limit_use, started_at: 1700000000, ended_at: 1700000100 });
records.push({}, null, { started_at: null, ended_at: undefined }, { started_at: -999999999, ended_at: Infinity });
for (const [index, record] of records.entries()) test(`coupon readonly columns ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const columns = await load(original);let values,error;
    try { values = columns.map(column => column.render ? column.render(record?.[column.dataIndex], record) : record?.[column.dataIndex]); } catch(e) { error=e.name; }
    results.push(normalize({ columns, values, error }));
  }
  assert.deepEqual(results[1], results[0]);
});
