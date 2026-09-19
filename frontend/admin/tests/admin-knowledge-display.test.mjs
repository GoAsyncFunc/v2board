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
  const file = new URL(original ? './fixtures/pages/admin-knowledge-display.cjs' : '../src/components/KnowledgeDisplayColumns.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs' })).code, { module, exports: module.exports, require(id) { if (id.includes('77642f52')) return moment;
        throw Error(id); } });
  return original ? module.exports(() => moment) : Object.values(module.exports.createReadonlyKnowledgeColumns());
}
const normalize = value => JSON.parse(JSON.stringify(value, (key, value) => typeof value === 'function' ? '[render]' : value));
const records = [{}, null, { id: 1, title: null }, { id: 2, title: '长标题'.repeat(200), updated_at: 1700000000, category: '未知分类' }];
for (const updated_at of [0, null, undefined, -999999999, Infinity, NaN, '1700000000', 'invalid']) records.push({ id: 7, title: 'Fixture', updated_at });
records.push({id:8,title:'<b>Literal text</b>',category:null,updated_at:0},{id:9,title:'Fixture',category:'分类'.repeat(100),updated_at:1700000000});
for (const [index, record] of records.entries()) test(`knowledge readonly display ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const columns = await load(original);
    results.push(normalize({ columns, values: columns.map(column => column.render ? column.render(record?.[column.dataIndex], record) : record?.[column.dataIndex]) }));
  }
  assert.deepEqual(results[1], results[0]);
});
