import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original, factoryOnly=false){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-server-rate.cjs':'../src/components/ServerRateColumn.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'jsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('antdTooltip'))return {a:'Tooltip'};if(id.includes('Icon'))return {a:'Icon'};if(id.includes('antdTag'))return {a:'Tag'};
        throw Error(id);}});
 const factory=original?()=>module.exports({a:React},{a:'Tooltip'},{a:'Icon'},{a:'Tag'}):module.exports.createServerRateColumn;
 return factoryOnly?factory:factory();
}
for(const mode of ['primitive','fallback','throw'])test(`server rate conversion contract ${mode}`,async()=>{
 const results=[];
 for(const original of [true,false]){
  const trace=[];
  const value=mode==='fallback'?{valueOf(){trace.push('valueOf');return {};},toString(){trace.push('toString');return '2.5';}}:{[Symbol.toPrimitive](hint){trace.push(hint);if(mode==='throw')throw new TypeError('fixture');return 2.5;}};
  const column=await load(original);let rendered,error;
  try{rendered=column.render(value);}catch(e){error=e.name;}
  results.push(normalize({trace,rendered,error}));
 }
 assert.deepEqual(results[1],results[0]);
 assert.deepEqual(results[1].trace,mode==='fallback'?['valueOf','toString']:['default']);
 if(mode==='throw')assert.equal(results[1].error,'TypeError');
 else {assert.equal(results[1].rendered.children[0],'2.5 x');assert.equal(results[1].rendered.props.style.minWidth,60);}
});
test('server rate title is fresh per column construction',async()=>{
 for(const original of [true,false]){
  const factory=await load(original,true);const first=factory(),second=factory();
  assert.notEqual(first.title,second.title);assert.notEqual(first.title.props,second.title.props);
  assert.notEqual(first.title.children[1],second.title.children[1]);
  assert.deepEqual(normalize(first.title),normalize(second.title));
 }
});
test('server rate title retains Tooltip text, icon and no handlers',async()=>{
 for(const original of [true,false]){
  const title=(await load(original)).title;
  assert.equal(title.type,'Tooltip');
  assert.equal(title.props.placement,'top');
  assert.equal(title.props.title,'使用的流量将乘以倍率进行扣除');
  assert.equal(title.children[0],'倍率 ');
  assert.equal(title.children[1].type,'Icon');
  assert.equal(title.children[1].props.type,'question-circle');
  assert.deepEqual(Object.keys(title.props),['placement','title']);
 }
});
const normalize=v=>JSON.parse(JSON.stringify(v,(key,value)=>typeof value==='function'?'[render]':value));
for(const [index,value]of [0,1.5,-1,null,undefined,'2','',NaN,Infinity,{},[],Symbol('fixture')].entries())test(`server rate readonly ${index+1}`,async()=>{
 const results=[];for(const original of [true,false]){const col=await load(original);let rendered,error;try{rendered=col.render(value);}catch(e){error=e.name;}results.push(normalize({col,rendered,error}));}assert.deepEqual(results[1],results[0]);
});
