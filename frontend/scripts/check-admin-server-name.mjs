// Readonly column/table comparison; no write menus or backend requests.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,loader:'jsx',contents:`import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/admin-server-name.cjs';import {createServerNameColumn} from './admin/src/components/ServerNameColumn.jsx';import {a as Table} from './admin/src/vendor/modules/antdTable.js';import {a as Badge} from './admin/src/vendor/modules/antdBadge.js';import {a as Tooltip} from './admin/src/vendor/modules/antdTooltip.js';import {a as Icon} from './admin/src/vendor/Icon.js';import {a as Tag} from './admin/src/vendor/modules/antdTag.js';import {a as settings} from './admin/src/vendor/modules/7449346c.js';import moment from './admin/src/vendor/modules/77642f52.js';const q=new URL(location.href).searchParams;const columns=q.get('mode')==='original'?[original({a:React},{a:Tooltip},{a:Badge},{a:Icon},{0:'error',1:'warning',2:'processing'})]:[createServerNameColumn({0:'error',1:'warning',2:'processing'})];const rows=q.get('state')==='empty'?[]:[0,1,2,3,4].map(status=>({key:status,id:status+1,name:status===4?null:'Fixture Server '+status,available_status:[0,1,2,99,null][status]}));ReactDOM.render(<Table columns={columns} dataSource={rows} loading={q.get('state')==='loading'} pagination={{pageSize:3}} scroll={{x:900}}/>,document.getElementById('root'));window.ready=true;`},bundle:true,loader:{'.cjs':'jsx'},write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'}})).outputFiles[0].text;
const out=path.join(home,'test-results/admin-server-name');await fs.mkdir(out,{recursive:true});const browser=await chromium.launch();const report=[];
try{for(const width of [1440,390])for(const state of ['rows','empty','loading','legend']){
 const shots=[];
 for(const mode of ['original','source']){
 const context=await browser.newContext({viewport:{width,height:900},timezoneId:'UTC',serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='http://ui.test'){errors.push('External request');return route.abort();}if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><link rel="stylesheet" href="/assets/admin/components.chunk.css"><link rel="stylesheet" href="/assets/admin/umi.css"><script>window.settings={};</script><div id="root"></div><script src="/test.js"></script>'});if(u.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});const p=path.resolve(home,'admin/public','.'+u.pathname);if(!p.startsWith(path.join(home,'admin/public')+path.sep))return route.abort();try{return await route.fulfill({path:p});}catch{return route.fulfill({status:404,body:''});}});
 await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);await page.waitForFunction(()=>window.ready);await page.evaluate(()=>document.fonts.ready);await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});await page.waitForTimeout(200);
 if(state==='legend'){
  await page.locator('thead .anticon-question-circle').first().hover();
  const tooltip=page.locator('.ant-tooltip:visible');await tooltip.waitFor();
  const text=await tooltip.innerText();
  for(const label of ['未运行','无人使用或服务端上报异常','运行正常'])if(!text.includes(label))throw Error('Missing status legend text: '+label);
  await page.waitForTimeout(250);
 }
 shots.push(await page.screenshot({path:path.join(out,`${width}-${state}-${mode}.png`),fullPage:true}));
 if(state==='rows'){await page.locator('.ant-pagination-item-2').click();if(await page.locator('tbody tr').count()!==2)throw Error('Pagination mismatch');if(width===390){const scrolled=await page.locator('.ant-table-body').evaluate(el=>{el.scrollLeft=200;return el.scrollWidth>el.clientWidth&&el.scrollLeft>0;});if(!scrolled)throw Error('Horizontal scroll missing');}}
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);if(a.width!==b.width||a.height!==b.height)throw Error('Dimensions differ');let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({width,state,pixels});console.log(width,state,pixels);
}await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.pixels>10))throw Error('Visual mismatch');}finally{await browser.close();}
