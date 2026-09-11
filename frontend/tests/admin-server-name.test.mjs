import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={Fragment:'Fragment',createElement:(type,props,...children)=>({type,props,children})};
const statuses={0:'error',1:'warning',2:'processing'};
async function load(original, mapping = statuses){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-server-name.cjs':'../admin/src/components/ServerNameColumn.jsx',import.meta.url);
 const code=(await transform(await fs.readFile(file,'utf8'),{format:'cjs',loader:'jsx'})).code;
 vm.runInNewContext(code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('3353372b'))return {a:'Tooltip'};if(id.includes('4b725473'))return {a:'Badge'};if(id.includes('Icon'))return {a:'Icon'};throw Error(id);}});
 return original?module.exports({a:React},{a:'Tooltip'},{a:'Badge'},{a:'Icon'},mapping):module.exports.createServerNameColumn(mapping);
}
const normalize=x=>JSON.parse(JSON.stringify(x,(k,v)=>typeof v==='function'?'[render]':v));
for(const fail of [false,true])test(`server name lookup evaluation order ${fail}`,async()=>{
 const results=[];
 for(const original of [true,false]){
  const trace=[];const mapping={get 2(){trace.push('lookup');if(fail)throw new TypeError('fixture');return 'processing';}};
  const record={get available_status(){trace.push('status');return 2;}};
  const name={toString(){throw Error('Must not coerce name');}};
  const column=await load(original,mapping);let tree,error;
  try{tree=column.render(name,record);}catch(e){error=e.name;}
  if(!fail){assert.equal(tree.children[1].children[0],name);assert.equal(tree.children[0].props.status,'processing');}
  results.push({trace,error});
 }
 assert.deepEqual(results[1],results[0]);assert.deepEqual(results[1].trace,['status','lookup']);
});
test('server status mapping remains live after column creation',async()=>{
 for(const original of [true,false]){const mapping={2:'processing'};const column=await load(original,mapping);mapping[2]='warning';assert.equal(column.render('Name',{available_status:2}).children[0].props.status,'warning');}
});
test('server status legend retains exact badge/text/break order',async()=>{
 for(const original of [true,false]){
  const legend=(await load(original)).title.children[0].props.title;
  assert.equal(legend.type,'div');
  assert.deepEqual(Array.from(legend.children,child=>typeof child==='string'?child:child.type==='Badge'?child.props.status:child.type),['error',' 未运行','br','warning',' 无人使用或服务端上报异常','br','processing',' 运行正常','br']);
 }
});
const records=[null,{},... [0,1,2,99,'1',null,undefined].map(available_status=>({available_status}))];
for(const [index,record]of records.entries())for(const name of ['Fixture 节点',null])test(`server name/status ${index+1}/${name}`,async()=>{
 const results=[];for(const original of [true,false]){const column=await load(original);let tree,error;try{tree=column.render(name,record);}catch(e){error=e.name;}results.push(normalize({column,tree,error}));}assert.deepEqual(results[1],results[0]);
});
