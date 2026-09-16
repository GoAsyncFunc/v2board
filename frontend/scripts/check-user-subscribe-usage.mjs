// Readonly subscribe usage comparison; no events or requests.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,loader:'jsx',contents:`import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/user-subscribe-usage.cjs';import {subscribePercent,progressBarColor,formatDeviceLimit} from './user/src/components/SubscribeUsage.jsx';const q=new URL(location.href).searchParams;const percentOf=(used,total)=>used/total*100;const fixture=original(percentOf);const rows=q.get('state')==='edge'?[{u:1,d:1,transfer_enable:0},{u:-1,d:-1,transfer_enable:1000},{u:1000,d:0,transfer_enable:1000},{u:0,d:0,transfer_enable:1}]:[{u:500,d:500,transfer_enable:1000},{u:799,d:1,transfer_enable:1000},{u:999,d:1,transfer_enable:1000},{u:2000,d:500,transfer_enable:1000}];const fp=q.get('mode')==='original'?fixture.percent:subscribePercent;const fc=q.get('mode')==='original'?fixture.color:progressBarColor;const fl=q.get('mode')==='original'?fixture.deviceLimit:formatDeviceLimit;ReactDOM.render(<div style={{fontFamily:'sans-serif',fontSize:24,margin:24}}>{rows.map((d,i)=>{const y=fp(d);return <div key={i} style={{marginBottom:8}}><span>已用 {y}%</span><span className={'badge '+fc(y)} style={{marginLeft:12,padding:'2px 8px',background:fc(y)==='danger'?'#f00':fc(y)==='warning'?'#fa0':'#0a0',color:'#fff'}}>{fc(y)}</span></div>;})}<p style={{margin:0}}>在线设备 0/{fl(null)} / {fl(undefined)} / {fl(3)}</p></div>,document.getElementById('root'));window.ready=true;`},bundle:true,write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'}})).outputFiles[0].text;
const out=path.join(home,'test-results/user-subscribe-usage');await fs.mkdir(out,{recursive:true});const browser=await chromium.launch({channel:'chrome'});const report=[];
try{for(const width of [1440,390])for(const state of ['rows','edge']){
 const shots=[];
 for(const mode of ['original','source']){
 const context=await browser.newContext({viewport:{width,height:400},locale:'zh-CN',timezoneId:'UTC',serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='http://ui.test'){errors.push('External request');return route.abort();}if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><div id="root"></div><script src="/test.js"></script>'});if(u.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});return route.abort();});
 await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);await page.waitForFunction(()=>window.ready);await page.waitForTimeout(200);
 shots.push(await page.screenshot({path:path.join(out,`${width}-${state}-${mode}.png`),fullPage:true}));
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);if(a.width!==b.width||a.height!==b.height)throw Error('Dimensions differ');let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({width,state,pixels});console.log(width,state,pixels);
}await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.pixels>10))throw Error('Visual mismatch');}finally{await browser.close();}