import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props,children})};
const settings={a:{periodText:{month_price:'月付'}}},Tag={a:'Tag'},moment=value=>({format:format=>`${value}:${format}`});
async function columns(original){
 const file=new URL(original?'./fixtures/pages/admin-order-display.cjs':'../admin/src/components/OrderDisplayColumns.jsx',import.meta.url);
 const source=await fs.readFile(file,'utf8');const module={exports:{}};
 vm.runInNewContext(original?source:(await transform(source,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('6d723332'))return Tag;if(id.includes('7449346c'))return settings;if(id.includes('77642f52'))return moment;throw Error(id);}});
 return original?module.exports({a:React},Tag,settings,()=>moment):Object.values(module.exports.createReadonlyOrderColumns());
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
const normalize=v=>JSON.parse(JSON.stringify(v,(k,v)=>typeof v==='function'?'[renderer]':v));
for(const status of [0,1,2,3,4])for(const amount of [0,12345,null])test(`admin readonly order columns status=${status} amount=${amount}`,async()=>{
 const record={type:status===4?9:status+1,period:'month_price',status,total_amount:amount,commission_balance:amount,created_at:1700000000};
 const before=await columns(true),after=await columns(false);
 assert.deepEqual(normalize(after),normalize(before));
 assert.deepEqual(normalize(after.map(c=>c.render(record[c.dataIndex],record))),normalize(before.map(c=>c.render(record[c.dataIndex],record))));
});
