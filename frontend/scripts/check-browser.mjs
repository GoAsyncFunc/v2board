import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const browser=await chromium.launch({headless:true});
try{
 for(const target of ['user','admin']){
  const shots=[]; const doms=[];
  for(const mode of ['baseline','source']){
   const base=path.join(root,mode==='source'?'frontend/dist':'recovered-ui/dist',target);
   const page=await browser.newPage({viewport:{width:1440,height:1000},locale:'zh-CN'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('http://ui.test/**',async route=>{
    const url=new URL(route.request().url());
    if(url.pathname.startsWith('/api/')){
     // Deterministic unauthenticated fixture, not a real API integration test.
     if(url.pathname.includes('guest/comm/config'))return route.fulfill({json:{data:{tos_url:'',is_email_verify:0,is_recaptcha:0,email_whitelist_suffix:[]}}});
     // Empty unauthenticated bootstrap data avoids redirects and animated error
     // notifications. Authentication/error behavior is covered by model tests.
     return route.fulfill({json:{data:{is_login:false,is_admin:false}}});
    }
    const file=path.join(base,url.pathname==='/'?'index.html':url.pathname);
    try{await route.fulfill({path:file});}catch{await route.fulfill({status:404,body:''});}
   });
   await page.goto('http://ui.test/#/login');
   await page.locator('input[type="password"]').waitFor();
   await page.waitForTimeout(1200);
   await page.evaluate(() => document.fonts.ready);
   // Compare settled layouts rather than sampling entry animations at different frames.
   await page.addStyleTag({content:'*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }'});
   await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
   const inputs=await page.locator('input').count();
   if(errors.length || inputs<2)throw Error(`${target}/${mode}: inputs=${inputs} errors=${errors.join('; ')}`);
   await fs.mkdir(path.join(root,'frontend/test-results'),{recursive:true});
   doms.push(await page.locator('#root').innerHTML());
   await fs.writeFile(path.join(root,`frontend/test-results/${target}-${mode}.html`),doms.at(-1));
   shots.push(await page.screenshot({path:path.join(root,`frontend/test-results/${target}-${mode}-login.png`),animations:'disabled'}));
   console.log(`${target}/${mode}: login rendered, ${inputs} inputs, no uncaught errors`);
   await page.close();
  }
  const before=PNG.sync.read(shots[0]),after=PNG.sync.read(shots[1]);
  if(before.width!==after.width||before.height!==after.height)throw Error('Screenshot dimensions differ');
  let changed=0;
  for(let i=0;i<before.data.length;i+=4)if(!before.data.subarray(i,i+4).equals(after.data.subarray(i,i+4)))changed++;
  // Explicit 10-pixel allowance for observed glyph rasterization jitter; report the
  // actual count rather than describing a tolerant comparison as byte-identical.
  if(changed>10||doms[0]!==doms[1])throw Error(`${target}: ${changed} changed pixels; DOM equal=${doms[0]===doms[1]}`);
  console.log(`${target}: DOM identical; ${changed} changed pixels (limit 10 / ${before.width*before.height})`);
 }
}finally{await browser.close();}
