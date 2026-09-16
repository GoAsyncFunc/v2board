// Readonly admin income/count comparison; no events or requests.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,loader:'jsx',contents:`import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/admin-income-display.cjs';import {formatIncome,formatLiveCount} from './admin/src/components/MoneyDisplay.jsx';const q=new URL(location.href).searchParams;const fixture=original();const values=q.get('state')==='edge'?[undefined,null,0,'abc']:[0,12345,999999,'42'];const helpers=q.get('mode')==='original'?[fixture.income,fixture.count]:[formatIncome,formatLiveCount];ReactDOM.render(<div style={{fontFamily:'sans-serif',fontSize:32,margin:24}}>{values.map((v,i)=><p key={i} style={{margin:0}}>{helpers[0](v)}<span style={{fontSize:18,marginLeft:8}}>USD</span> · {helpers[1](v)}</p>)}</div>,document.getElementById('root'));window.ready=true;`},bundle:true,write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'}})).outputFiles[0].text;
const out=path.join(home,'test-results/admin-income-display');await fs.mkdir(out,{recursive:true});const browser=await chromium.launch({channel:'chrome'});const report=[];
try{for(const width of [1440,390])for(const state of ['rows','edge']){
 const shots=[];
 for(const mode of ['original','source']){
 const context=await browser.newContext({viewport:{width,height:320},locale:'zh-CN',timezoneId:'UTC',serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='http://ui.test'){errors.push('External request');return route.abort();}if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><div id="root"></div><script src="/test.js"></script>'});if(u.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});return route.abort();});
 await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);await page.waitForFunction(()=>window.ready);await page.waitForTimeout(200);
 shots.push(await page.screenshot({path:path.join(out,`${width}-${state}-${mode}.png`),fullPage:true}));
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);if(a.width!==b.width||a.height!==b.height)throw Error('Dimensions differ');let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({width,state,pixels});console.log(width,state,pixels);
}await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.pixels>10))throw Error('Visual mismatch');}finally{await browser.close();}