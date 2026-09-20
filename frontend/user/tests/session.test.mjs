import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function run(target,original,scenario){
 const trace=[];
 const token=()=>{trace.push(['token']);return scenario.token;};
 const clear=()=>trace.push(['clear']);
 const api={a:(...args)=>{trace.push(['get',...args]);return 'request';}};api.get=api.a;
 const helpers={d:token,c:token,o:clear,getToken:token,clearToken:clear};
 const history={push:route=>trace.push(['navigate',route])};
 const window=scenario.chat?{Tawk_API:{},$crisp:{push:value=>trace.push(['crisp',value])}}:{};
 const module={exports:{}};
 const file=original?path.join(home,'tests/fixtures/models',target+'-session.cjs'):path.join(home,'src/models/sessionEffects.ts');
 const text=await fs.readFile(file,'utf8');
 const code=original?text:(await transform(text,{format:'cjs',loader:'ts'})).code;
 vm.runInNewContext(code,{module,exports:module.exports,api,helpers,history,window,require:id=>{
  if(id.includes('request'))return api;
  if(id.includes('routerHistory'))return history;
  if(id.includes('siteHelpers'))return helpers;
        throw Error(id);
 }},{filename:file,timeout:2000});
 const put=value=>{trace.push(['put',value]);return 'put';};
 const iterator=module.exports[scenario.effect]({redirect:scenario.redirect},{put});
 let step=iterator.next(),count=0;
 while(!step.done){
  if(++count>20)throw Error('Nonterminating effect');
  if(step.value==='request'&&scenario.reject){try{step=iterator.throw(Error('Network failure'));}catch(e){trace.push(['error',e.message]);break;}}
  else step=iterator.next(step.value==='request'?scenario.response:undefined);
 }
 if(scenario.chat)trace.push(['visitor',window.Tawk_API.visitor]);
 return structuredClone(trace);
}
for(const target of ['user']){
 const scenarios=[];
 for(const token of [null,'token'])for(const status of [200,422])for(const allowed of [false,true])for(const redirect of [undefined,'/plan'])scenarios.push({effect:'checkLogin',token,redirect,response:{code:status,data:{is_login:allowed,is_admin:allowed}}});
 scenarios.push({effect:'checkLogin',token:'token',reject:true});
 for(const chat of [false,true])for(const code of [200,422])scenarios.push({effect:'getUserInfo',chat,response:{code,data:{email:'fixture@example.com',balance:12345}}});
 scenarios.push({effect:'getUserInfo',reject:true});
 if(target==='user')scenarios.push({effect:'logout'});
 for(const [index,scenario] of scenarios.entries())test(`${target} session ${index+1}: ${scenario.effect}`,async()=>{
  assert.deepEqual(await run(target,false,scenario),await run(target,true,scenario));
 });
}
