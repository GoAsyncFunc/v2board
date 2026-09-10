import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-server-rate.cjs':'../admin/src/components/ServerRateColumn.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('3353372b'))return {a:'Tooltip'};if(id.includes('Icon'))return {a:'Icon'};if(id.includes('6d723332'))return {a:'Tag'};throw Error(id);}});
 return original?module.exports({a:React},{a:'Tooltip'},{a:'Icon'},{a:'Tag'}):module.exports.createServerRateColumn();
}
const normalize=v=>JSON.parse(JSON.stringify(v,(key,value)=>typeof value==='function'?'[render]':value));
for(const [index,value]of [0,1.5,-1,null,undefined,'2','',NaN,Infinity,{},[],Symbol('fixture')].entries())test(`server rate readonly ${index+1}`,async()=>{
 const results=[];for(const original of [true,false]){const col=await load(original);let rendered,error;try{rendered=col.render(value);}catch(e){error=e.name;}results.push(normalize({col,rendered,error}));}assert.deepEqual(results[1],results[0]);
});
