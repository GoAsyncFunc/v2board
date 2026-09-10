import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original,plans){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-giftcard-display.cjs':'../admin/src/components/GiftcardDisplayColumns.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');const moment=value=>({format:pattern=>`${value}:${pattern}`});
 vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('6d723332'))return {a:'Tag'};if(id.includes('77642f52'))return moment;throw Error(id);}});
 return original?module.exports({a:React},{a:'Tag'},()=>moment,plans):Object.values(module.exports.createReadonlyGiftcardColumns(plans));
}
function normalize(value){if(Array.isArray(value))return Array.from(value,normalize);if(typeof value==='function')return '[render]';if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,normalize(v)]));return value;}
for(const type of [1,2,3,4,5,99,'1'])for(const value of [0,1.235,null,undefined,'12',-9,NaN])test(`giftcard ${type}/${value}`,async()=>{
 const results=[];for(const original of [true,false]){const columns=await load(original,[{id:7,name:'Plan'}]);const record={id:1,name:'Fixture',type,value,plan_id:'7',limit_use:null,started_at:0,ended_at:undefined};
 results.push(normalize({columns,values:columns.map(c=>{try{return {value:c.render?c.render(record[c.dataIndex],record):record[c.dataIndex]};}catch(e){return {error:e.name};}})}));}assert.deepEqual(results[1],results[0]);
});
