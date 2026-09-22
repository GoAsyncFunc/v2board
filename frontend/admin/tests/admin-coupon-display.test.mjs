import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React = { createElement: (type, props, ...children) => ({ type, props, children }) };
const Tag = 'Tag';
const moment = value => ({ format: pattern => `${value}:${pattern}` });
async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-coupon-display.cjs' : '../src/pages/coupon/components/CouponColumns.tsx', import.meta.url);
  const source = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? source : (await transform(source, { format: 'cjs', loader: 'tsx' })).code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id === 'antd/lib/tag') return Tag;
    if (id.includes('antdTag')) return { a: 'Tag' };
    if (id === 'moment' || id.includes('77642f52')) return moment;
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
for (const type of [1, 0, null, undefined, '1', {}, Symbol('type')]) test(`coupon type renderer ${String(type)}`, async () => {
  const results=[]; for (const original of [true,false]) { const column=(await load(original)).find(c=>c.key==='type'); let value,error; try { value=column.render(type); } catch(e) { error=e.name; } results.push({value,error}); } assert.deepEqual(results[1],results[0]);
});
for (const limit of [null,undefined,0,-1,'0',{},Symbol('limit')]) test(`coupon limit renderer ${String(limit)}`, async () => {
  const results=[]; for (const original of [true,false]) { const column=(await load(original)).find(c=>c.key==='limit_use'); let value,error; try { value=column.render(limit); } catch(e) { error=e.name; } results.push(normalize({value,error})); } assert.deepEqual(results[1],results[0]);
});
