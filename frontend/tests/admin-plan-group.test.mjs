import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original,groups){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-plan-group.cjs':'../admin/src/components/PlanGroupColumn.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('antdTag'))return {a:'Tag'};throw Error(id);}});
 return original?module.exports(groups,{a:React},{a:'Tag'}):module.exports.createPlanGroupColumn(groups);
}
for (const failSecond of [false,true]) test(`plan group preserves per-entry coercion and order: ${failSecond}`, async () => {
 const results=[];
 for(const original of [true,false]) {
  const trace=[];
  const groups=[1,2].map(index=>({get id(){trace.push('id'+index);return 7;},get name(){trace.push('name'+index);return 'Group'+index;}}));
  let calls=0;
  const input={toString(){trace.push('parse');if(++calls===2&&failSecond)throw new TypeError('fixture');return '7suffix';}};
  const column=await load(original,groups);let value,error;
  try{value=column.render(input);}catch(e){error=e.name;}
  results.push(structuredClone({trace,value,error}));
 }
 assert.deepEqual(results[1],results[0]);
 assert.deepEqual(results[1].trace,failSecond?['id1','parse','name1','id2','parse']:['id1','parse','name1','id2','parse','name2']);
});
test('plan group empty list does not coerce input', async () => {
 for(const original of [true,false]) {
  const column=await load(original,[]);
  assert.deepEqual(Array.from(column.render({toString(){throw Error('Unexpected parse');}})),[]);
 }
});
for(const [index,groups] of [[],null,undefined,[null],[{id:7,name:'A'}],[{id:'7',name:'String'}],[{id:7,name:'A'},{id:7,name:'B'}]].entries())for(const id of [7,'7suffix',null,undefined])test(`plan group ${index}/${id}`,async()=>{
 const results=[];for(const original of [true,false]){const col=await load(original,groups);let value,error;try{value=col.render(id);}catch(e){error=e.name;}results.push(structuredClone({value,error,title:col.title,dataIndex:col.dataIndex,key:col.key}));}assert.deepEqual(results[1],results[0]);
});
