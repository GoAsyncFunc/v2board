import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original,plans){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-giftcard-display.cjs':'../admin/src/components/GiftcardDisplayColumns.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');const moment=value=>({format:pattern=>`${value}:${pattern}`});
 vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('antdTag'))return {a:'Tag'};if(id.includes('77642f52'))return moment;throw Error(id);}});
 return original?module.exports({a:React},{a:'Tag'},()=>moment,plans):Object.values(module.exports.createReadonlyGiftcardColumns(plans));
}
function normalize(value){if(Array.isArray(value))return Array.from(value,normalize);if(typeof value==='function')return '[render]';if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,normalize(v)]));return value;}
const lookupCases = [
 {plans:[{id:7,name:'Match'}],id:7},
 {plans:[{id:7,name:'Strict mismatch'}],id:'7'},
 {plans:[{id:7,name:'First'},{id:7,name:'Second'}],id:7},
 {plans:[{id:7}],id:7}, {plans:[],id:7},
 {plans:null,id:7}, {plans:undefined,id:7},
 {plans:[null],id:7}, {plans:[{id:7,name:null}],id:7},
 {plans:[{id:0,name:'Zero'}],id:0},
];
for(const [index,{plans,id}] of lookupCases.entries())test(`giftcard plan lookup ${index+1}`,async()=>{
 const results=[];for(const original of [true,false]){
  const column=(await load(original,plans)).find(c=>c.key==='plan_id');
  try{results.push({value:column.render(id)});}catch(e){results.push({error:e.name});}
 }
 assert.deepEqual(results[1],results[0]);
 if(plans===null||plans===undefined||plans[0]===null)assert.equal(results[1].error,'TypeError');
});
for(const record of [null,undefined,{}])test(`giftcard empty row ${record===null?'null':record===undefined?'undefined':'missing fields'}`,async()=>{
 const results=[];for(const original of [true,false]){
  const columns=await load(original,[]);
  results.push(normalize(columns.map(c=>{try{return {value:c.render?c.render(record?.[c.dataIndex],record):record?.[c.dataIndex]};}catch(e){return {error:e.name};}})));
 }
 assert.deepEqual(results[1],results[0]);
});
for(const failStart of [false,true])test(`giftcard validity access order failStart=${failStart}`,async()=>{
 const results=[];for(const original of [true,false]){
  const reads=[];const card={get started_at(){reads.push('start');if(failStart)throw new TypeError('fixture');return 0;},get ended_at(){reads.push('end');return null;}};
  const col=(await load(original,[])).find(c=>c.key==='started_at');let value,error;try{value=col.render(undefined,card);}catch(e){error=e.name;}results.push({reads,value,error});
 }
 assert.deepEqual(results[1],results[0]);assert.deepEqual(results[1].reads,failStart?['start']:['start','end']);
});
for (const limit of [null,undefined,0,-1,'0',{},Symbol('limit')]) test(`giftcard limit renderer ${String(limit)}`, async () => {
  const results=[]; for (const original of [true,false]) { const column=(await load(original,[])).find(c=>c.key==='limit_use'); let value,error; try { value=column.render(limit); } catch(e) { error=e.name; } results.push(normalize({value,error})); } assert.deepEqual(results[1],results[0]);
});
for(const type of [1,2,3,4,5,99,'1'])for(const value of [0,1.235,null,undefined,'12',-9,NaN])test(`giftcard ${type}/${value}`,async()=>{
 const results=[];for(const original of [true,false]){const columns=await load(original,[{id:7,name:'Plan'}]);const record={id:1,name:'Fixture',type,value,plan_id:'7',limit_use:null,started_at:0,ended_at:undefined};
 results.push(normalize({columns,values:columns.map(c=>{try{return {value:c.render?c.render(record[c.dataIndex],record):record[c.dataIndex]};}catch(e){return {error:e.name};}})}));}assert.deepEqual(results[1],results[0]);
});
