import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-plan-price.cjs' : '../src/pages/plan/_List/PlanPriceColumns.ts', import.meta.url);
  const source = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? source : (await transform(source, { format: 'cjs', loader: 'ts' })).code, { module, exports: module.exports });
  return original ? module.exports() : Object.values(module.exports.createReadonlyPlanPriceColumns());
}
const fields = ['month_price','quarter_price','half_year_price','year_price','two_year_price','three_year_price','onetime_price','reset_price'];
const values = [1.235, 0, null, undefined, -99.99, '12.34', '', NaN, Infinity, -Infinity, Number.MAX_VALUE, false];
for (const [index, value] of values.entries()) test(`plan price columns value ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const columns = await load(original);
    assert.deepEqual(Array.from(columns, c => c.dataIndex), fields);
    results.push(Array.from(columns, column => {
      let rendered, error;
      try { rendered = column.render(value); } catch (e) { error = e.name; }
      return { title: column.title, key: column.key, rendered, error };
    }));
  }
  assert.deepEqual(results[1], results[0]);
  if (value === undefined || typeof value === 'string' || value === false) assert.equal(results[1][0].error, 'TypeError');
});
for (const record of [{}, null]) test(`plan price missing/empty row ${record === null ? 'null' : 'object'}`, async () => {
  for (const original of [true, false]) for (const column of await load(original)) {
    assert.throws(() => column.render(record?.[column.dataIndex]), { name: 'TypeError' });
  }
});
