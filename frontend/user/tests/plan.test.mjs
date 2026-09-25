import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function run(original,scenario){
 const trace=[],module={exports:{}};
 const get=(...args)=>{trace.push(['get',...args]);return 'request';};
 const localeSettings={periodText:{month_price:'Month',year_price:'Year',onetime_price:'Once'}};
 const settings={a:localeSettings,localeSettings};
 const file=new URL(original?'./fixtures/models/user-plan.cjs':'../src/models/planModel.ts',import.meta.url);
 const text=await fs.readFile(file,'utf8');const code=original?text:(await transform(text,{format:'cjs',loader:'ts'})).code;
 vm.runInNewContext(code,{module,exports:module.exports,require(id){
  if(id.includes('types/apiContracts'))return {isSuccessfulResponse:value=>value.code===200};
  if(id.includes('apiClient'))return {a:get,get};
  if(id.includes('localeSettings'))return settings;
  if(id.includes('app/navigation'))return {router:{push:route=>trace.push(['navigate',route])}};
  if(id.includes('4172412b'))return {router:{push:route=>trace.push(['navigate',route])}};
  if(id.includes('70307045'))return Object.assign;
  if(id.includes('reactRuntime'))return {};
  if(id.includes('moduleInterop'))return {markEsModule:obj=>Object.defineProperty(obj,'__esModule',{value:true}),interopDefault:obj=>{const fn=()=>obj;Object.defineProperty(fn,'a',{get:fn});return fn;}};
        throw Error(id);
 }},{timeout:2000});
 const model=module.exports.default;
 const iterator=model.effects[scenario.effect]({id:7},{put:value=>{trace.push(['put',structuredClone(value)]);return 'put';},select:fn=>{trace.push(['select']);return {selected:fn({plan:{selectPeriod:scenario.period}})};}});
 let step=iterator.next(),count=0;
 while(!step.done){if(++count>20)throw Error('Unterminated effect');
  if(step.value==='request'&&scenario.reject){try{step=iterator.throw(Error('Network failure'));}catch(e){trace.push(['error',e.message]);break;}}
  else step=iterator.next(step.value==='request'?structuredClone(scenario.response):step.value?.selected);
 }
 trace.push(['state',model.state],['empty',model.reducers.empty()],['merge',model.reducers.setState({keep:1},{payload:{value:2}})]);
 return structuredClone(trace);
}
const scenarios=[];
for(const effect of ['fetch','fetchById']){
 for(const code of [200,422])scenarios.push({effect,response:{code,data:effect==='fetch'?[]:{month_price:100}}});
 scenarios.push({effect,reject:true});
}
for(const data of [
 {month_price:0,year_price:100}, {year_price:100,month_price:200},
 {month_price:null,year_price:0}, {month_price:null}, {name:'Plan'},
 {month_price:undefined,onetime_price:0},
])for(const period of [undefined,'year_price'])scenarios.push({effect:'fetchById',period,response:{code:200,data}});
for(const [index,scenario]of scenarios.entries())test(`user plan ${index+1}: ${scenario.effect}`,async()=>assert.deepEqual(await run(false,scenario),await run(true,scenario)));
