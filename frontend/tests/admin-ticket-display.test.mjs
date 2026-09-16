import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
async function load(original){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-ticket-display.cjs':'../admin/src/components/TicketDisplayColumns.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');const moment=value=>({format:pattern=>`${value}:${pattern}`});
 vm.runInNewContext(original?text:(await transform(text,{format:'cjs'})).code,{module,exports:module.exports,require(id){if(id.includes('77642f52'))return moment;throw Error(id);}});
 return original?module.exports(['低','中','高'],()=>moment):Object.values(module.exports.createReadonlyTicketColumns(['低','中','高']));
}
for (const level of [0, 1, 99, '1', Symbol('level')]) test(`ticket level coercion ${String(level)}`, async () => {
  const results=[]; for (const original of [true,false]) { const column=(await load(original)).find(c=>c.key==='level'); let value,error; try { value=column.render(level); } catch(e) { error=e.name; } results.push({value,error}); } assert.deepEqual(results[1],results[0]);
});
for (const field of ['created_at','updated_at']) test(`ticket date coercion ${field}`, async () => {
  const results=[]; for (const original of [true,false]) { const trace=[]; const value={[Symbol.toPrimitive](hint){trace.push(hint);return 1700000000;}}; let rendered,error; try { rendered=(await load(original)).find(c=>c.key===field).render(value); } catch(e) { error=e.name; } results.push({trace,rendered,error}); } assert.deepEqual(results[1],results[0]); assert.deepEqual(results[1].trace,['number']);
});
const normalize=x=>JSON.parse(JSON.stringify(x,(k,v)=>typeof v==='function'?'[render]':v));
for(const level of [0,1,2,99,'1',null,undefined])for(const time of [0,null,undefined,1700000000,-999999999])test(`ticket display ${level}/${time}`,async()=>{
 const record={id:7,subject:'Fixture 工单',level,created_at:time,updated_at:time};const results=[];
 for(const original of [true,false]){const columns=await load(original);results.push(normalize({columns,values:columns.map(c=>c.render?c.render(record[c.dataIndex]):record[c.dataIndex])}));}
 assert.deepEqual(results[1],results[0]);
});
