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
const normalize=v=>JSON.parse(JSON.stringify(v,(k,v)=>typeof v==='function'?'[renderer]':v));
for(const status of [0,1,2,3,4])for(const amount of [0,12345,null])test(`admin readonly order columns status=${status} amount=${amount}`,async()=>{
 const record={type:status===4?9:status+1,period:'month_price',status,total_amount:amount,commission_balance:amount,created_at:1700000000};
 const before=await columns(true),after=await columns(false);
 assert.deepEqual(normalize(after),normalize(before));
 assert.deepEqual(normalize(after.map(c=>c.render(record[c.dataIndex],record))),normalize(before.map(c=>c.render(record[c.dataIndex],record))));
});
