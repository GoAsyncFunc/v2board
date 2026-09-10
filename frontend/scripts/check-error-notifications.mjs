// Real request wrapper + real notification/message rendering, mocked responses only.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(home,'test-results/notifications');await fs.mkdir(out,{recursive:true});
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,contents:`import {post} from './user/src/services/request.js';import {r as notify} from './user/src/vendor/siteHelpers.js';window.showFixtureError=async()=>{const kind=new URL(location.href).searchParams.get('kind');if(new URL(location.href).searchParams.get('mode')==='expected')notify('error','请求失败',kind==='validation'?'Invalid payment method':'Payment unavailable');else await post('/user/order/checkout',{});};`},bundle:true,write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'},plugins:[{name:'fake-api',setup(b){b.onResolve({filter:/vendor\/dva\.js$/},()=>({path:'api',namespace:'fixture'}));b.onResolve({filter:/vendor\/i18n\.js$/},()=>({path:'i18n',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:a.path==='i18n'?"exports.getLocale=()=> 'zh-CN';exports.formatMessage=({id})=>id;":"exports.b=async()=>({status:new URL(location.href).searchParams.get('kind')==='validation'?422:500,json:async()=>new URL(location.href).searchParams.get('kind')==='validation'?{errors:{method:['Invalid payment method']}}:{message:'Payment unavailable'}});",loader:'js'}));}}]})).outputFiles[0].text;
const browser=await chromium.launch();const report=[];
try{
 for(const mobile of [false,true])for(const kind of ['validation','server']){
 const shots=[];
 for(const mode of ['expected','request']){
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:900},userAgent:mobile?'Mozilla/5.0 Mobile Fixture':'Mozilla/5.0 Desktop Fixture',serviceWorkers:'block'});const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
  const url=new URL(route.request().url());if(url.origin!=='http://ui.test'){errors.push('Blocked external request');return route.abort();}
  if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><link rel="stylesheet" href="/theme/default/assets/components.chunk.css"><link rel="stylesheet" href="/theme/default/assets/umi.css"><script>window.settings={title:"Fixture"};</script><script src="/test.js"></script>'});
  if(url.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});
  const file=path.resolve(home,'user/public','.'+url.pathname);if(!file.startsWith(path.join(home,'user/public')+path.sep))return route.abort();
  try{return await route.fulfill({path:file});}catch{return route.fulfill({status:404,body:''});}
 });
 await page.goto(`http://ui.test/?kind=${kind}&mode=${mode}`);await page.evaluate(()=>document.fonts.ready);
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
 await page.evaluate(()=>window.showFixtureError());
 await page.getByText(kind==='validation'?'Invalid payment method':'Payment unavailable',{exact:true}).waitFor();
 shots.push(await page.screenshot({path:path.join(out,`${mobile?'mobile':'desktop'}-${kind}-${mode}.png`)}));
 if(!mobile){await page.locator('.ant-notification-notice-close').click();await page.locator('.ant-notification-notice').waitFor({state:'detached'});}else{await page.locator('.ant-message-notice').waitFor({state:'detached',timeout:10000});}
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({mobile,kind,changedPixels:pixels});console.log('notification',mobile,kind,pixels);
 }
 await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.changedPixels>10))throw Error('Notification visual mismatch');
}finally{await browser.close();}
