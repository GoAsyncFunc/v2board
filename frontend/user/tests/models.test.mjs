import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const copy=value=>structuredClone(value);
async function load(target,name,original,trace,response){
 const extension=['comm','guest','layout','passport'].includes(name)?'ts':'js';
 const file=original?path.join(home,'tests/fixtures/models',`${target}-${name}.cjs`):path.join(home,'src/models',name+'.'+extension);
 const text=await fs.readFile(file,'utf8');
 const code=original?text:(await transform(text,{format:'cjs',loader:extension,target:'es2018'})).code;
 const request=method=>(url,data)=>{trace.push(['request',method,url,copy(data)]);return {request:true};};
 const get=request('GET'),post=request('POST');
 const history={push:route=>{trace.push(['navigate',route]);}};
 const saveToken=token=>trace.push(['token',token]);
 const helpers={p:saveToken,h:saveToken,r:(...args)=>trace.push(['notify',...args]),setToken:saveToken,notify:(...args)=>trace.push(['notify',...args])};
 const require=id=>{
  if(id.includes('moduleInterop'))return {
   markEsModule:exports=>Object.defineProperty(exports,'__esModule',{value:true}),
   interopDefault:obj=>{const fn=()=>obj&&obj.__esModule?obj.default:obj;Object.defineProperty(fn,'a',{get:fn});return fn;},
  };
  if(id.includes('70307045'))return Object.assign;
  if(id.includes('reactRuntime'))return {};
  if(id.includes('types/api'))return {isSuccessfulResponse:value=>value.code===200};
  if(id.includes('request'))return {a:get,b:post,get,post};
  if((id.includes('routerHistory') || id.includes('../app/history')))return history;
  if(id.includes('siteHelpers'))return helpers;
  throw Error('Unexpected dependency '+id);
 };
 const module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require},{filename:file,timeout:3000});
 return module.exports.default;
}
async function run(target,name,original,scenario){
 const trace=[];
 const model=await load(target,name,original,trace,scenario.response);
 const action={...(scenario.action||{})};
 if(scenario.callback)action.callback=()=>trace.push(['callback']);
 if(scenario.effect==='sendEmailVerify')action.succeed=()=>trace.push(['notify','success','发送成功','如果没有收到验证码请检查垃圾箱。']);
 if(scenario.complete)action.complete=value=>trace.push(['complete',copy(value)]);
 const api={
  put:value=>{trace.push(['put',copy(value)]);return {put:true};},
  select:fn=>{trace.push(['select']);return {selection:copy(fn({layout:scenario.layout||{showNav:false}}))};},
 };
 const iterator=model.effects[scenario.effect](action,api);
 let step=iterator.next(),count=0;
 while(!step.done){
  if(++count>30)throw Error('Effect failed to terminate');
  const value=step.value;
  if(value?.request && scenario.reject){
   try{step=iterator.throw(new Error('Network failure'));}catch(error){trace.push(['error',error.message]);break;}
  }else step=iterator.next(value?.request?copy(scenario.response):value?.selection);
 }
 const reducer=Object.values(model.reducers)[0];
 trace.push(['state',copy(model.state)],['reducer',copy(reducer({keep:1,replace:0},{payload:{replace:2}}))]);
 return copy(trace);
}
const success={code:200,data:{auth_data:'test-token',is_admin:1,email_whitelist_suffix:['example.com']}};
const cases=[];
function add(target,name,effect,extras={}){cases.push({target,name,effect,response:success,...extras});}
for(const target of ['user','admin']){
 for(const response of [success,{code:422,msg:'bad'},{code:200,data:{auth_data:'user-token',is_admin:0}}])add(target,'passport','login',{response,action:{email:'test@example.com',password:'fixture-only',redirect:'/plan'}});
 add(target,'passport','login',{reject:true});
 for(const show of [undefined,true,false,null])for(const open of [false,true])add(target,'layout','showNav',{action:{show},layout:{showNav:open,keep:'field'}});
}
for(const effect of ['token2Login','register','sendEmailVerify','forget']){
 for(const response of [success,{code:422},{code:200,data:null}])add('user','passport',effect,{response,action:{email:'test@example.com',password:'fixture',verify:'verify-token',redirect:'/plan',emailCode:'123456',inviteCode:'invite',recaptchaData:'captcha',isforget:1},callback:true});
 add('user','passport',effect,{reject:true});
}
for(const response of [success,{code:422},{code:200,data:{}},{code:200,data:{email_whitelist_suffix:[]}}])add('user','guest','getCommConfig',{response});
for(const response of [success,{code:422},{code:200,data:{is_admin:0}}])add('admin','auth','login',{response,action:{action:{email:'test'}}});
for(const response of [success,null])add('admin','auth','register',{response,action:{action:{email:'test'}},complete:true});
for(const [index,scenario] of cases.filter(item => item.target === 'user').entries())test(`${index+1}: ${scenario.target}/${scenario.name}/${scenario.effect}`,async()=>{
 const before=await run(scenario.target,scenario.name,true,scenario);
 const after=await run(scenario.target,scenario.name,false,scenario);
 assert.deepEqual(after,before);
});
