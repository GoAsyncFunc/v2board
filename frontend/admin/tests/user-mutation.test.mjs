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
async function run(original,scenario){
 const trace=[],action=structuredClone(scenario.action||{});
 if(scenario.callback)action.callback=()=>trace.push(['callback']);
 const state={filter:[{key:'email',condition:'like',value:'fixture'}]};
 const api={post:(url,data)=>{trace.push(['post',url,structuredClone(data)]);return 'request';}};api.b=api.post;
 const message={success:value=>trace.push(['success',value])};
 const file=original?path.join(home,'tests/fixtures/models/admin-user-mutation.cjs'):path.join(home,'src/models/userMutationEffects.ts');
 const text=await fs.readFile(file,'utf8');const code=original?text:(await transform(text,{format:'cjs',loader:'ts'})).code;
 const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,api,message,window:{settings:{secure_path:'fixture-admin'}},require:id=>{if(id.includes('request'))return api;if(id.includes('antdMessage'))return {a:message};if(id==='antd/lib/message')return message;
        throw Error(id);}},{timeout:2000});
 const iterator=module.exports[scenario.effect](action,{put:value=>{trace.push(['put',structuredClone(value)]);return 'put';},select:fn=>{trace.push(['select']);return {selected:fn({user:state})};}});
 let step=iterator.next(),count=0;
 while(!step.done){if(++count>20)throw Error('Unterminated effect');
  if(step.value==='request'&&scenario.reject){try{step=iterator.throw(Error('Network failure'));}catch(e){trace.push(['error',e.message]);break;}}
  else step=iterator.next(step.value==='request'?{code:scenario.code}:step.value?.selected);
 }
 delete action.callback;trace.push(['action',action],['state',state]);return structuredClone(trace);
}
const scenarios=[];
const params={transfer_enable:1.25,u:0.000001,d:0.125,balance:1.235,commission_balance:2.345,invite_user:{email:'fixture'}};
for(const effect of ['update','sendMail','ban','allDel','resetSecret','delUser']){
 const action=effect==='update'?{params}:effect==='sendMail'?{params:{subject:'fixture',content:'not sent'}}:{id:123};
 for(const code of [200,422])for(const callback of [false,true])scenarios.push({effect,action,code,callback});
 scenarios.push({effect,action,reject:true});
}
scenarios.push({effect:'sendMail',action:{params:{filter:[]}},code:200});
scenarios.push({effect:'update',action:{params:{...params,invite_user:null}},code:200});
for(const [index,scenario]of scenarios.entries())test(`admin user mutation ${index+1}: ${scenario.effect}`,async()=>assert.deepEqual(await run(false,scenario),await run(true,scenario)));
