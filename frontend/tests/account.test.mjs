import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {transform} from 'esbuild';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function run(original,scenario){
 const trace=[];
 const request=method=>(url,data)=>{trace.push(['request',method,url,data]);return 'request';};
 const get=request('GET'),post=request('POST');
 const window=scenario.chat?{$crisp:{push:data=>trace.push(['crisp',data])}}:{};
 const require=id=>{
  if(id.includes('sessionEffects'))return {};
  if(id.includes('moduleInterop'))return {markEsModule:obj=>Object.defineProperty(obj,'__esModule',{value:true}),interopDefault:obj=>{const f=()=>obj&&obj.__esModule?obj.default:obj;Object.defineProperty(f,'a',{get:f});return f;}};
  if(id.includes('70307045'))return Object.assign;
  if(id.includes('reactRuntime')||id.includes('6d69595a'))return {};
  if(id.includes('request'))return {get,post,a:get,b:post};
  if(id.includes('routerHistory'))return {push:value=>trace.push(['navigate',value])};
  if(id.includes('antdMessage'))return {a:{success:value=>trace.push(['success',value])}};
  if(id.includes('77642f52'))return value=>({format:format=>{trace.push(['date',value,format]);return 'fixture-date';}});
  if(id.includes('siteHelpers'))return {b:value=>{trace.push(['traffic',value]);return 'bytes:'+value;}};
  throw Error(id);
 };
 const file=original?path.join(home,'tests/fixtures/models/user-account.cjs'):path.join(home,'user/src/models/user.js');
 const text=await fs.readFile(file,'utf8');const code=original?text:(await transform(text,{format:'cjs'})).code;
 const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,require,window},{timeout:3000});
 const model=module.exports.default;
 const action={...scenario.action};if(scenario.callback)action.callback=()=>trace.push(['callback']);
 const iterator=model.effects[scenario.effect](action,{put:value=>{trace.push(['put',value]);return 'put';}});
 let step=iterator.next(),count=0;
 while(!step.done){if(++count>20)throw Error('Unterminated effect');
  if(step.value==='request'&&scenario.reject){try{step=iterator.throw(Error('Network failure'));}catch(e){trace.push(['error',e.message]);break;}}
  else step=iterator.next(step.value==='request'?scenario.response:undefined);
 }
 trace.push(['state',model.state],['reducer',model.reducers.setState({keep:1,replace:0},{payload:{replace:2}})]);
 return structuredClone(trace);
}
const scenarios=[];
const response={code:200,data:{plan:{name:'Test plan'},expired_at:1700000000,u:1024,d:2048,transfer_enable:4096}};
const actions={update:{key:'remind_expire',value:0},changePassword:{oldPassword:'fixture-old',newPassword:'fixture-new'},redeemgiftcard:{giftcard:'fixture-code'},transfer:{transferAmount:12.34}};
for(const effect of ['getSubscribe','getStat','update','changePassword','newPeriod','redeemgiftcard','resetSecurity','transfer']){
 for(const code of [200,422])scenarios.push({effect,response:{...response,code},action:actions[effect],chat:true,callback:true});
 scenarios.push({effect,reject:true,action:actions[effect]});
}
for(const type of [1,2,3,4,5,99])scenarios.push({effect:'redeemgiftcard',response:{code:200,type,value:12345},action:actions.redeemgiftcard});
for(const plan of [undefined,null,{name:''}])scenarios.push({effect:'getSubscribe',response:{...response,data:{...response.data,plan}},chat:true});
scenarios.push({effect:'getSubscribe',response,chat:false});
for(const transferAmount of [0,'1.25',-1])scenarios.push({effect:'transfer',response,action:{transferAmount},callback:false});
for(const [index,scenario]of scenarios.entries())test(`user account ${index+1}: ${scenario.effect}`,async()=>assert.deepEqual(await run(false,scenario),await run(true,scenario)));
