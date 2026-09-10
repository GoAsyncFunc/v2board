import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE||'http://5.104.86.24:7003';
const browser=await chromium.launch();
try{
 for(const [target,entry] of [['user','/'],['admin','/4434144c']]){
  const page=await browser.newPage({viewport:{width:1440,height:1000},locale:'zh-CN'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+entry+'#/login',{waitUntil:'networkidle',timeout:60000});
  await page.locator('input[type="password"]').waitFor();
  console.log(target,'deployed login rendered; errors:',JSON.stringify(errors));
  if(errors.length)throw Error('Uncaught browser error');
  if(process.env.TEST_EMAIL&&process.env.TEST_PASSWORD){
   await page.locator('input[type="text"]').first().fill(process.env.TEST_EMAIL);
   await page.locator('input[type="password"]').fill(process.env.TEST_PASSWORD);
   await page.locator('button[type="submit"]').click();
   await page.waitForURL(url=>url.hash.includes('dashboard'),{timeout:30000});
   await page.waitForTimeout(2500);
   const routes=target==='admin'?['/dashboard','/plan','/order','/user','/notice','/ticket']:['/dashboard','/plan','/order','/profile','/ticket'];
   for(const route of routes){
    await page.goto(base+entry+'#'+route,{waitUntil:'networkidle',timeout:60000});
    const text=await page.locator('#root').innerText();
    if(errors.length||text.length<30||page.url().includes('#/login'))throw Error(`${target} ${route}: errors=${errors.join(';')}, text=${text.length}`);
    console.log(target,route,'rendered',text.length,'text characters');
   }
  }
  await fs.mkdir('frontend/test-results',{recursive:true});
  await page.screenshot({path:`frontend/test-results/deployed-${target}.png`,fullPage:true});
  await page.close();
 }
}finally{await browser.close();}
