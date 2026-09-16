// Readonly column/table comparison; no write menus or backend requests.
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {PNG} from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const js=(await build({absWorkingDir:home,stdin:{resolveDir:home,loader:'jsx',contents:`import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/user-invite-display.cjs';import {createInviteCodeDateColumn,createReadonlyCommissionColumns} from './user/src/components/InviteDisplayColumns.jsx';import {a as Table} from './user/src/vendor/modules/7743416a.js';import moment from './user/src/vendor/modules/77642f52.js';import {formatMessage} from './user/src/vendor/i18n.js';const deps={formatMessage,moment};const q=new URL(location.href).searchParams;const originalMode=q.get('mode')==='original';const codeDate=originalMode?original(deps).codeDate:createInviteCodeDateColumn();const commission=originalMode?original(deps).commission:createReadonlyCommissionColumns();const codes=q.get('state')==='empty'?[]:[0,1,2,3].map(i=>({key:i,code:'INVITE-CODE-'+i,created_at:1700000000+i}));const commissions=q.get('state')==='empty'?[]:[0,1,2,3].map(i=>({key:i,created_at:1700000000+i,get_amount:1000*(i+1)}));ReactDOM.render(<div><Table columns={[codeDate]} dataSource={codes} loading={q.get('state')==='loading'} pagination={false}/><h2 style={{margin:'24px 16px'}}>佣金发放记录</h2><Table columns={commission} dataSource={commissions} loading={q.get('state')==='loading'} pagination={false}/></div>,document.getElementById('root'));window.ready=true;`},bundle:true,write:false,format:'iife',define:{'process.env.NODE_ENV':'"production"'}})).outputFiles[0].text;
const out=path.join(home,'test-results/user-invite-display');await fs.mkdir(out,{recursive:true});const browser=await chromium.launch({channel:'chrome'});const report=[];
try{for(const width of [1440,390])for(const state of ['rows','empty','loading']){
 const shots=[];
 for(const mode of ['original','source']){
 const context=await browser.newContext({viewport:{width,height:1000},locale:'zh-CN',timezoneId:'UTC',serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin!=='http://ui.test'){errors.push('External request');return route.abort();}if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><link rel="stylesheet" href="/theme/default/assets/components.chunk.css"><link rel="stylesheet" href="/theme/default/assets/umi.css"><script>window.settings={};</script><div id="root"></div><script src="/test.js"></script>'});if(u.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:js});const p=path.resolve(home,'user/public','.'+u.pathname);if(!p.startsWith(path.join(home,'user/public')+path.sep))return route.abort();try{return await route.fulfill({path:p});}catch{return route.fulfill({status:404,body:''});}});
 await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);await page.waitForFunction(()=>window.ready);await page.evaluate(()=>document.fonts.ready);await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});await page.waitForTimeout(200);
 shots.push(await page.screenshot({path:path.join(out,`${width}-${state}-${mode}.png`),fullPage:true}));
 if(errors.length)throw Error(errors.join(';'));await context.close();
 }
 const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);if(a.width!==b.width||a.height!==b.height)throw Error('Dimensions differ');let pixels=0;for(let i=0;i<a.data.length;i+=4)if(!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4)))pixels++;
 report.push({width,state,pixels});console.log(width,state,pixels);
}await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));if(report.some(x=>x.pixels>10))throw Error('Visual mismatch');}finally{await browser.close();}
