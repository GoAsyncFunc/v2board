import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function load(original,mapping){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-route-action.cjs':'../src/components/server/RouteActionColumn.ts',import.meta.url);
 const text=await fs.readFile(file,'utf8');vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'ts'})).code,{module,exports:module.exports});
 return original?module.exports({a:{routeActionText:mapping}}):module.exports.createRouteActionColumn(mapping);
}
for(const value of ['block','dns','unknown','',null,undefined,0])for(const mapping of [{block:'禁止访问',dns:'指定DNS'},null])test(`route action text ${value}/${mapping===null?'null':'map'}`,async()=>{
 const results=[];for(const original of [true,false]){const col=await load(original,mapping);let text,error;try{text=col.render(value);}catch(e){error=e.name;}results.push({title:col.title,key:col.key,dataIndex:col.dataIndex,text,error});}assert.deepEqual(results[1],results[0]);
});
