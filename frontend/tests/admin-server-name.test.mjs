import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={Fragment:'Fragment',createElement:(type,props,...children)=>({type,props,children})};
const statuses={0:'error',1:'warning',2:'processing'};
async function load(original){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-server-name.cjs':'../admin/src/components/ServerNameColumn.jsx',import.meta.url);
 const code=(await transform(await fs.readFile(file,'utf8'),{format:'cjs',loader:'jsx'})).code;
 vm.runInNewContext(code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('3353372b'))return {a:'Tooltip'};if(id.includes('4b725473'))return {a:'Badge'};if(id.includes('Icon'))return {a:'Icon'};throw Error(id);}});
 return original?module.exports({a:React},{a:'Tooltip'},{a:'Badge'},{a:'Icon'},statuses):module.exports.createServerNameColumn(statuses);
}
const normalize=x=>JSON.parse(JSON.stringify(x,(k,v)=>typeof v==='function'?'[render]':v));
const records=[null,{},... [0,1,2,99,'1',null,undefined].map(available_status=>({available_status}))];
for(const [index,record]of records.entries())for(const name of ['Fixture 节点',null])test(`server name/status ${index+1}/${name}`,async()=>{
 const results=[];for(const original of [true,false]){const column=await load(original);let tree,error;try{tree=column.render(name,record);}catch(e){error=e.name;}results.push(normalize({column,tree,error}));}assert.deepEqual(results[1],results[0]);
});
