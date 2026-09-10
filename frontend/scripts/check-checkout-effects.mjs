// Execute original recovered factory and current model in an isolated browser sandbox.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contents=`
import originalFactory from './tests/fixtures/models/recovered-order-factory.cjs';
import current from './user/src/models/order.js';
window.runCheckout=(original,scenario)=>{
 const trace=[];window.__trace=trace;
 const response=scenario==='422'?{code:422}:scenario==='500'?{code:500}:scenario==='qr'?{code:200,type:0,data:'fixture-qr'}:scenario==='redirect'?{code:200,type:1,data:'https://invalid.test/cashier'}:{code:200,type:2,data:true};
 const module={exports:{}};const req=id=>{
  if(id==='p0pE')return Object.assign;
  if(id==='t3Un')return {b:(url,params)=>{trace.push(['post',url,params]);return 'request';}};
  if(id==='tsqr')return {a:{info:(...x)=>trace.push(['info',...x]),loading:(...x)=>trace.push(['loading',...x])}};
  if(id==='3a4m')return {push:x=>trace.push(['navigate',x])};
  return {};
 };
 req.r=exports=>Object.defineProperty(exports,'__esModule',{value:true});req.n=obj=>{const f=()=>obj;Object.defineProperty(f,'a',{get:f});return f;};
 if(original)originalFactory(module,module.exports,req);
 const model=original?module.exports.default:current;
 const effect=scenario.startsWith('stripe')?'checkoutByStripe':'checkout';
 const generator=model.effects[effect]({tradeNo:'FIXTURE',method:scenario==='zero-missing'?undefined:1,token:scenario==='stripe-malformed'?undefined:'tok_fixture'}, {put:action=>{trace.push(['put',action]);return 'put';}});
 let step=generator.next();while(!step.done){if(step.value==='request'&&scenario==='network'){try{generator.throw(Error('Offline'));}catch(e){trace.push(['throw',e.message]);}break;}step=generator.next(step.value==='request'?response:undefined);}
 return trace;
};`;
const mock=`exports.a=exports.get=()=>{};exports.b=exports.post=(url,params)=>{window.__trace.push(['post',url,params]);return 'request';};`;
const js=(await build({absWorkingDir:home,stdin:{contents,resolveDir:home},bundle:true,write:false,format:'iife',plugins:[{name:'mocks',setup(b){
 b.onResolve({filter:/services\/request\.js$/},()=>({path:'request',namespace:'mock'}));
 b.onResolve({filter:/74737172\.js$/},()=>({path:'message',namespace:'mock'}));
 b.onResolve({filter:/routerHistory\.js$/},()=>({path:'history',namespace:'mock'}));
 b.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:args.path==='request'?mock:args.path==='message'?`exports.a={info:(...x)=>window.__trace.push(['info',...x]),loading:(...x)=>window.__trace.push(['loading',...x])};`:`module.exports={push:x=>window.__trace.push(['navigate',x])};`,loader:'js'}));
 // Both versions use an explicit sandbox window; redirect assignment is recorded,
 // never applied to the browser's location and never reaches a real payment URL.
 b.onLoad({filter:/(order\.js|recovered-order-factory\.cjs)$/},async args=>({contents:(await fs.readFile(args.path,'utf8')).replaceAll('window.location.href =','window.__redirect ='),loader:'js'}));
}}]})).outputFiles[0].text;
const browser=await chromium.launch();const report=[];
try{
 const page=await browser.newPage();await page.route('**/*',route=>route.abort());await page.goto('about:blank');await page.addScriptTag({content:js});
 for(const scenario of ['422','500','network','qr','redirect','zero-missing','stripe','stripe-malformed']){
  const results=[];for(const original of [true,false])results.push(await page.evaluate(({original,scenario})=>{delete window.__redirect;const trace=window.runCheckout(original,scenario);return {trace,redirect:window.__redirect};},{original,scenario}));
  if(JSON.stringify(results[0])!==JSON.stringify(results[1]))throw Error('Mismatch '+scenario+JSON.stringify(results));
  report.push({scenario,result:results[1]});console.log('checkout effect parity:',scenario);
 }
 await fs.mkdir(path.join(home,'test-results/checkout'),{recursive:true});await fs.writeFile(path.join(home,'test-results/checkout/report.json'),JSON.stringify(report,null,2));
}finally{await browser.close();}
