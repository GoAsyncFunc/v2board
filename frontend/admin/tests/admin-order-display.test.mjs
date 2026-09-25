import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={createElement:(type,props,...children)=>({type,props,children})};
const settings={a:{periodText:{month_price:'月付'}}},Tag={a:'Tag'},moment=value=>({format:format=>`${value}:${format}`});
async function columns(original, suppliedSettings=settings){
 const file=new URL(original?'./fixtures/pages/admin-order-display.cjs':'../src/pages/order/components/OrderColumns.tsx',import.meta.url);
 const source=await fs.readFile(file,'utf8');const module={exports:{}};
 vm.runInNewContext(original?source:(await transform(source,{format:'cjs',loader:'tsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id==='antd/lib/tag')return 'Tag';if(id==='moment')return moment;if(id.includes('antdTag'))return Tag;if(id.includes('adminSettingsRuntime'))return suppliedSettings;if(id.includes('config/adminSettings'))return {settings:suppliedSettings.a};if(id.includes('77642f52'))return moment;
        throw Error(id);}});
 return original?module.exports({a:React},Tag,suppliedSettings,()=>moment):Object.values(module.exports.createOrderColumns());
}
for(const statuses of [[0],[1,2],[3,3]])for(const fail of [false,true])test(`commission short-circuit ${statuses}/${fail}`,async()=>{
 const results=[];for(const original of [true,false]){
  const trace=[];let reads=0;const order={get status(){const value=statuses[Math.min(reads++,statuses.length-1)];trace.push(['status',value]);return value;}};
  const amount={valueOf(){trace.push(['amount']);if(fail)throw new TypeError('fixture');return 125;}};
  const renderer=(await columns(original)).find(c=>c.key==='commission_balance').render;let value,error;
  try{value=renderer(amount,order);}catch(e){error=e.name;}
  results.push({trace,value,error});
 }
 assert.deepEqual(results[1],results[0]);
 if(statuses[0]===0||statuses[1]===2)assert.ok(!results[1].trace.some(x=>x[0]==='amount'));
});
for(const field of ['total_amount','created_at'])for(const fail of [false,true])test(`order scalar conversion ${field}/${fail}`,async()=>{
 const results=[];for(const original of [true,false]){
  const trace=[];const input={[Symbol.toPrimitive](hint){trace.push(hint);if(fail)throw new TypeError('fixture');return 12345;}};
  const renderer=(await columns(original)).find(c=>c.key===field).render;let value,error;
  try{value=renderer(input);}catch(e){error=e.name;}
  results.push({trace,value,error});
 }
 assert.deepEqual(results[1],results[0]);assert.deepEqual(results[1].trace,['number']);
 if(fail)assert.equal(results[1].error,'TypeError');
 else assert.equal(results[1].value,field==='total_amount'?'123.45':'12345000:YYYY/MM/DD HH:mm');
});
for(const input of [undefined,NaN,Infinity,-1,'123',Symbol('fixture')])test(`order scalar edge ${String(input)}`,async()=>{
 const results=[];for(const original of [true,false])results.push((await columns(original)).filter(c=>['total_amount','created_at'].includes(c.key)).map(c=>{try{return {value:c.render(input)};}catch(e){return {error:e.name};}}));
 assert.deepEqual(Array.from(results[1]),Array.from(results[0]));
});
for(const type of [1,2,3,4,9,'1',99,null,undefined,'toString'])test(`order type lookup ${String(type)}`,async()=>{
 const values=[];for(const original of [true,false]){const value=(await columns(original)).find(c=>c.key==='type').render(type);values.push(typeof value==='function'?'[inherited function]':value);}assert.deepEqual(values[1],values[0]);
});
for(const fail of [false,true])test(`order type property coercion ${fail}`,async()=>{
 const values=[];for(const original of [true,false]){const trace=[];const key={[Symbol.toPrimitive](hint){trace.push(hint);if(fail)throw new TypeError('fixture');return '9';}};let value,error;try{value=(await columns(original)).find(c=>c.key==='type').render(key);}catch(e){error=e.name;}values.push({trace,value,error});}assert.deepEqual(values[1],values[0]);assert.deepEqual(values[1].trace,['string']);
});
for(const fail of [false,true])test(`order period evaluation order ${fail}`,async()=>{
 const results=[];for(const original of [true,false]){
  const trace=[],child={toString(){throw Error('Unexpected conversion');}};
  const config={a:{get periodText(){trace.push('mapping');return {get month_price(){trace.push('lookup');if(fail)throw new TypeError('fixture');return child;}};}}};
  const order={get period(){trace.push('period');return 'month_price';}};
  let tree,error;try{tree=(await columns(original,config)).find(c=>c.key==='period').render('ignored',order);}catch(e){error=e.name;}
  if(!fail){assert.equal(tree.children[0],child);assert.equal(tree.props,null);}
  results.push({trace,error});
 }assert.deepEqual(results[1],results[0]);assert.deepEqual(results[1].trace,['mapping','period','lookup']);
});
for(const record of [null,{}, {period:'unknown'}])test(`order period empty record ${JSON.stringify(record)}`,async()=>{
 const results=[];for(const original of [true,false]){let tree,error;try{tree=(await columns(original)).find(c=>c.key==='period').render('month_price',record);}catch(e){error=e.name;}results.push(normalize({tree,error}));}assert.deepEqual(results[1],results[0]);
});
const normalize=v=>JSON.parse(JSON.stringify(v,(k,v)=>typeof v==='function'?'[renderer]':v));
for(const status of [0,1,2,3,4])for(const amount of [0,12345,null])test(`admin readonly order columns status=${status} amount=${amount}`,async()=>{
 const record={type:status===4?9:status+1,period:'month_price',status,total_amount:amount,commission_balance:amount,created_at:1700000000};
 const before=await columns(true),after=await columns(false);
 assert.deepEqual(normalize(after),normalize(before));
 assert.deepEqual(normalize(after.map(c=>c.render(record[c.dataIndex],record))),normalize(before.map(c=>c.render(record[c.dataIndex],record))));
});
