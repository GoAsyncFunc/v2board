// Readonly column/table comparison; no write menus or backend requests.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,loader:'jsx',contents:`import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/admin-user-display.cjs';import {createReadonlyUserEmailColumn} from './admin/src/components/UserDisplayColumns.jsx';import {a as Table} from './admin/src/vendor/modules/antdTable.js';import {a as Tooltip} from './admin/src/vendor/modules/3353372b.js';import {a as Badge} from './admin/src/vendor/modules/4b725473.js';import moment from './admin/src/vendor/modules/77642f52.js';const deps={createElement:React.createElement,Tooltip,Badge,moment};const q=new URL(location.href).searchParams;const cold=q.get('state')==='empty';const now=Math.floor(Date.now()/1000);const rows=q.get('state')==='empty'?[]:[0,1,2,3,4].map(i=>({key:i,id:i+1,email:i===0?'really.long.email.address.padding.for.wrap@example.com':'user'+i+'@example.com',t:q.get('state')==='stale'?now-3600-i:now-60}));const columns=q.get('mode')==='original'?[original(deps)]:[createReadonlyUserEmailColumn()];ReactDOM.render(<Table columns={[{title:'ID',dataIndex:'id',key:'id'},...columns,{title:'状态',dataIndex:'banned',key:'banned'}]} dataSource={rows} loading={q.get('state')==='loading'} pagination={false} scroll={{x:600}}/>,document.getElementById('root'));window.ready=true;`},bundle:true,write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'}})).outputFiles[0].text;
const out=path.join(home,'test-results/admin-user-display');await fs.mkdir(out,{recursive:true});const browser=await chromium.launch({channel:'chrome'});const report=[];
try{for(const width of [1440,390])for(const state of ['rows','stale','empty','loading']){
 const shots=[];
 for(const mode of ['original','source']){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'UTC',serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='http://ui.test'){errors.push('External request');return route.abort();}if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><link rel="stylesheet" href="/assets/admin/components.chunk.css"><link rel="stylesheet" href="/assets/admin/umi.css"><script>window.settings={};</script><div id="root"></div><script src="/test.js"></script>'});if(u.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});const p=path.resolve(home,'admin/public','.'+u.pathname);if(!p.startsWith(path.join(home,'admin/public')+path.sep))return route.abort();try{return await route.fulfill({path:p});}catch{return route.fulfill({status:404,body:''});}});
 await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);await page.waitForFunction(()=>window.ready);await page.evaluate(()=>document.fonts.ready);await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});await page.waitForTimeout(200);
 // Hover the Tooltip on a row to sample its rendered title in both modes.
 if(state==='rows'||state==='stale')await page.locator('tbody tr').first().hover();
 await page.waitForTimeout(300);
 shots.push(await page.screenshot({path:path.join(out,`${width}-${state}-${mode}.png`),fullPage:true}));
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);if(a.width!==b.width||a.height!==b.height)throw Error('Dimensions differ');let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({width,state,pixels});console.log(width,state,pixels);
}await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.pixels>10))throw Error('Visual mismatch');}finally{await browser.close();}
