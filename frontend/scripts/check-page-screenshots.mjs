// Local, mocked page-level visual comparisons. No live API or deployment.
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(home,'test-results/pages');await fs.mkdir(output,{recursive:true});
const pages={Traffic:'traffic',Node:'node',Plan:'plan',PlanDetail:'plan-detail'};
const scenarios=[['Traffic','rows'],['Traffic','loading'],['Node','rows'],['Node','empty'],['Node','renew'],['Plan','cards'],['Plan','empty'],['PlanDetail','checkout'],['PlanDetail','coupon'],['PlanDetail','restricted'],['PlanDetail','loading']];
const fixtureSource=`
const periods={month_price:1000,quarter_price:null,half_year_price:null,year_price:10000,two_year_price:null,three_year_price:null,onetime_price:null,reset_price:null};
export function fixture(name){
 const plan={...periods,id:7,name:'Fixture Plan',renew:true,capacity_limit:null,content:'<p>100 GB · Multi-device support</p>'};
 const props={match:{params:{plan_id:'7'}},location:{pathname:'/plan/7'},stat:{traffics:[{key:1,record_at:1700000000,u:'1048576',d:'2097152',server_rate:1.5}],getTrafficLogLoading:name==='loading'},server:{servers:name==='empty'||name==='renew'?[]:[{key:1,name:'Fixture Node',is_online:1,rate:1.5,tags:['Premium','Asia']}],fetchLoading:false},user:{subscribe:{plan_id:name==='renew'?7:null,u:1,d:2,transfer_enable:100,expired_at:2000000000},userInfo:{plan_id:name==='restricted'?7:null}},plan:{plan,plans:name==='empty'?[]:[plan,{...plan,id:8,name:'Sold Out',capacity_limit:0},{...plan,id:9,name:'Limited',capacity_limit:3}],selectPeriod:'month_price',fetchLoading:name==='loading'},coupon:{coupon:name==='coupon'?{name:'Fixture Discount',code:'TEST',type:2,value:20}:{}},order:{orders:[],saveLoading:false,cancelLoading:false},comm:{config:{currency_symbol:'¥',currency:'CNY'}}};
 if(name==='restricted')props.plan.plan={...plan,renew:false};return props;
}`;
const stubs={
 redux:'exports.c = () => Component => Component;',
 layout:`const React=require('react');function Layout({children,title}){return React.createElement('div',{className:'page-test-layout'},React.createElement('h1',{style:{fontSize:20,margin:16}},title),children);}exports.__esModule=true;exports.default=Layout;exports.a=Layout;`,
 i18n:`exports.formatMessage=({id})=>id;exports.getLocale=()=> 'zh-CN';`,
 history:`module.exports={push:(route)=>window.__actions.push({navigate:route})};`,
 router:`exports.router={push:(route)=>window.__actions.push({navigate:route})};`,
 helpers:`exports.b=v=>Number(v/1048576).toFixed(2)+' MB';exports.c=v=>{try{return JSON.parse(v)}catch{return v}};exports.f=(u,total)=>u/total;exports.h=()=>false;`,
 settings:`exports.a={periodText:{month_price:()=> '每月',quarter_price:()=> '每季',half_year_price:()=> '半年',year_price:()=> '每年',two_year_price:()=> '两年',three_year_price:()=> '三年',onetime_price:()=> '一次性',reset_price:()=> '重置'}};`,
 request:'module.exports={};',
};
const bundles={};
for(const [page,slug]of Object.entries(pages))for(const mode of ['baseline','source']){
 const file=mode==='baseline'?path.join(home,'tests/fixtures/pages',`user-${slug}.jsx`):path.join(home,'user/src/pages',page+'.jsx');
 const result=await build({absWorkingDir:home,stdin:{contents:`import React from 'react';import ReactDOM from 'react-dom';import Page from ${JSON.stringify(file)};${fixtureSource}\nwindow.__actions=[];const props=fixture(new URL(location.href).searchParams.get('scenario'));props.dispatch=action=>window.__actions.push(action);ReactDOM.render(<Page {...props}/>,document.getElementById('root'));window.__ready=true;`,resolveDir:home,loader:'jsx'},bundle:true,write:false,format:'iife',loader:{'.js':'jsx'},define:{'process.env.NODE_ENV':'"production"'},plugins:[{name:'isolated-pages',setup(b){
 b.onResolve({filter:/.*/},args=>{
  if(args.namespace==='mock')return null;
  const id=args.path;
  let key;
  if(id.includes('reactRedux'))key='redux';else if(id.includes('MainLayout'))key='layout';else if(id.endsWith('/i18n.js'))key='i18n';else if(id.includes('routerHistory'))key='history';else if(id.includes('4172412b'))key='router';else if(id.includes('siteHelpers'))key='helpers';else if(id.includes('localeSettings'))key='settings';else if(id.includes('services/request'))key='request';
  if(key)return {path:key,namespace:'mock'};
  if(args.importer===file&&mode==='baseline'&&id.startsWith('.'))return {path:path.resolve(home,'user/src/pages',id)};
 });
 b.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:stubs[args.path],loader:'js',resolveDir:home}));
 }}],logLevel:'silent'});
 bundles[page+'/'+mode]=result.outputFiles[0].text;
}
const browser=await chromium.launch();const report=[];
try{
 for(const width of [1440,390])for(const [page,scenario]of scenarios){
  const shots=[],doms=[];
  for(const mode of ['baseline','source']){
   const context=await browser.newContext({viewport:{width,height:1000},locale:'zh-CN',timezoneId:'UTC',serviceWorkers:'block'});
   const tab=await context.newPage();const errors=[],blocked=[];
   tab.on('pageerror',e=>errors.push(e.message));
   await tab.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.origin!=='http://ui.test'){blocked.push(url.origin);return route.abort();}
    if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/theme/default/assets/components.chunk.css"><link rel="stylesheet" href="/theme/default/assets/umi.css"><div id="root"></div><script>window.settings={title:'Fixture',theme:{sidebar:'light',header:'dark',color:'default'}};</script><script src="/test.js"></script>`});
    if(url.pathname==='/test.js')return route.fulfill({contentType:'application/javascript',body:bundles[page+'/'+mode]});
    const file=path.resolve(home,'user/public','.'+decodeURIComponent(url.pathname));
    if(!file.startsWith(path.join(home,'user/public')+path.sep))return route.abort();
    try{return await route.fulfill({path:file});}catch{return route.fulfill({status:404,body:''});}
   });
   await tab.goto('http://ui.test/?scenario='+scenario);await tab.waitForFunction(()=>window.__ready);
   await tab.evaluate(()=>document.fonts.ready);
   await tab.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'});
   await tab.waitForTimeout(200);
   if(errors.length||blocked.length)throw Error(`${page}/${scenario}/${mode}: errors=${errors}; external attempts=${blocked}`);
   doms.push(await tab.locator('#root').innerHTML());
   shots.push(await tab.screenshot({path:path.join(output,`${page}-${scenario}-${width}-${mode}.png`),fullPage:true,animations:'disabled'}));
   if(page==='PlanDetail' && scenario==='checkout'){
    await tab.locator('.v2board-select').nth(1).click();
    await tab.locator('.v2board-input-coupon').fill('BROWSER-FIXTURE');
    await tab.locator('button').filter({hasText:'验证'}).click();
    await tab.locator('button').filter({hasText:'下单'}).click();
    const actions=await tab.evaluate(()=>window.__actions);
    // Dispatch is a recording stub: selection does not update fixture props.
    const expected=[
     {type:'plan/setState',payload:{selectPeriod:'year_price'}},
     {type:'coupon/check',code:'BROWSER-FIXTURE',planId:'7'},
     {type:'order/save',params:{period:'month_price',plan_id:7}},
    ];
    if(JSON.stringify(actions.slice(-3))!==JSON.stringify(expected))throw Error('Checkout interaction mismatch: '+JSON.stringify(actions));
    console.log(`  checkout interactions passed (${mode}, ${width}); mock dispatch only`);
   }
   if(errors.length||blocked.length)throw Error(`Post-interaction errors: ${errors}; blocked: ${blocked}`);
   await context.close();
  }
  const a=PNG.sync.read(shots[0]),b=PNG.sync.read(shots[1]);let changed=0;
  if(a.width!==b.width||a.height!==b.height)throw Error(`${page}/${scenario}: dimensions differ`);
  const diff=new PNG({width:a.width,height:a.height});
  for(let i=0;i<a.data.length;i+=4){const different=!a.data.subarray(i,i+4).equals(b.data.subarray(i,i+4));if(different)changed++;diff.data.set(different?[255,0,0,255]:[255,255,255,255],i);}
  await fs.writeFile(path.join(output,`${page}-${scenario}-${width}-diff.png`),PNG.sync.write(diff));
  report.push({page,scenario,width,height:a.height,changedPixels:changed,domEqual:doms[0]===doms[1]});
  console.log(`${page}/${scenario}/${width}: ${changed} changed pixels; DOM equal=${doms[0]===doms[1]}`);
 }
 await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
 if(report.some(x=>x.changedPixels>10))throw Error('Visual differences exceed explicit 10-pixel tolerance; see report/diff images');
}finally{await browser.close();}
