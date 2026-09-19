import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React = { Fragment: 'Fragment', createElement: (type, props, ...children) => ({ type, props, children }) };
async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/admin-plan-resource.cjs' : '../src/components/PlanResourceColumns.jsx', import.meta.url);
  const source = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? source : (await transform(source, { format: 'cjs', loader: 'jsx' })).code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id.includes('Icon')) return { a: 'Icon', Icon: 'Icon' };
        throw Error(id);
  } });
  return original ? module.exports({ a: React }, { a: 'Icon' }) : Object.values(module.exports.createReadonlyPlanResourceColumns());
}
function normalize(value) {
  if (Array.isArray(value)) return Array.from(value, normalize);
  if (typeof value === 'function') return '[render]';
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,normalize(v)]));
  return value;
}
for (const field of ['count','transfer_enable','device_limit']) test(`plan resource raw identity ${field}`, async () => {
  const value = { toString() { throw Error('Unexpected coercion'); } };
  for (const original of [true,false]) {
    const column = (await load(original)).find(c => c.key === field);
    const result = column.render(value);
    if(field === 'device_limit') {
      assert.equal(result,value);
      assert.equal(column.render(undefined),undefined);
      assert.equal(column.render(null),'-');
    } else {
      assert.equal(result.type,'Fragment');
      assert.equal(result.children[field === 'count' ? 2 : 0],value);
      assert.equal(result.children[1],field === 'count' ? ' ' : ' GB');
      if(field === 'count')assert.deepEqual(Object.keys(result.children[0].props),['type','style']);
    }
  }
});
const values=[0,1,-1,null,undefined,'12','',NaN,Infinity,Number.MAX_SAFE_INTEGER,false,[],{unexpected:true}];
for(const [index,value] of values.entries()) test(`plan readonly resource ${index+1}`,async()=>{
  const results=[];
  for(const original of [true,false]){
    const columns=await load(original);
    results.push(normalize({columns,values:columns.map(c=>c.render?c.render(value):value)}));
  }
  assert.deepEqual(results[1],results[0]);
});
