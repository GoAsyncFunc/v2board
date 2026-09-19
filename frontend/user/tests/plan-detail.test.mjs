import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={createRef:()=>({current:{value:'fixture'}}),Component:class{constructor(props){this.props=props;this.refs={coupon:{value:'fixture'}};}},createElement:(type,props,...children)=>typeof type==='function'?type(props):({type,props:props||{},children})};
async function load(original,trace,expired){
 const file=new URL(original?'./fixtures/pages/user-plan-detail.jsx':'../src/pages/PlanDetail.jsx',import.meta.url);
 const code=(await transform(await fs.readFile(file,'utf8'),{format:'cjs',loader:'jsx'})).code;
 const components={};
 for(const name of ['Pricing','Coupon','OrderSummary'])components[name]=(await transform(await fs.readFile(new URL('../src/components/checkout/'+name+'.jsx',import.meta.url),'utf8'),{format:'cjs',loader:'jsx'})).code;
 function evaluate(source){const module={exports:{}};
 vm.runInNewContext(source,{module,exports:module.exports,require(id){
  if(id==='react'||id.includes('reactRuntime'))return React;
  const component=Object.keys(components).find(name=>id.endsWith('/'+name+'.jsx'));if(component)return evaluate(components[component]);
  if(id.includes('MainLayout'))return {__esModule:true,default:'Layout',a:'Layout'};
  if(id.includes('reactRedux'))return {c:()=>cls=>cls,connect:()=>cls=>cls};
  if(id.includes('/Modal')){const Modal={confirm:options=>{trace.push(['confirm',options]);}};return {a:Modal,Modal};}
  if(id.includes('localeSettings')){const localeSettings={periodText:{month_price:()=> 'Month',year_price:()=> 'Year',reset_price:()=> 'Reset'}};return {a:localeSettings,localeSettings};}
  if(id.includes('i18n'))return {formatMessage:({id})=>id};
  if(id.includes('MoneyDisplay'))return {formatPrice:value=>(value / 100).toFixed(2)};
  if(id.includes('siteHelpers'))return {h:()=>expired,c:content=>content,isExpired:()=>expired,parseJson:content=>content};
  if(id.includes('4172412b'))return {router:{push:route=>trace.push(['navigate',route])}};
  if(id==='antd/lib/result')return 'Result';
  for(const [key,name]of [['/Icon','Icon'],['antdRadio','Radio'],['4d6f5257','Result'],['antdButton','Button']])if(id.includes(key))return {a:name,[name]:name};
  if(/iconStyles|374b616b|4a2b2f76|2b4c3642|32717463/.test(id))return {};
  if(id.includes('6a65685a'))return Object.assign;
  if(id.includes('moduleInterop'))return {markEsModule:o=>Object.defineProperty(o,'__esModule',{value:true}),interopDefault:obj=>{const f=()=>obj;Object.defineProperty(f,'a',{get:f});return f;}};
        throw Error(id);
 }},{timeout:2000});return module.exports;}
 return evaluate(code).default;
}
const normalize=value=>JSON.parse(JSON.stringify(value,(key,value)=>key==='ref'||key==='key'?undefined:typeof value==='function'?'[handler]':value));
function props(trace,options={}){return {match:{params:{plan_id:'7'}},plan:{plan:{id:7,name:'Plan',content:'<b>fixture</b>',renew:options.renew,month_price:1000,year_price:null,reset_price:50},selectPeriod:'month_price',fetchLoading:options.loading},coupon:{coupon:options.coupon||{}},comm:{config:{currency_symbol:'¥',currency:'CNY'}},order:{orders:options.orders||[],saveLoading:false,cancelLoading:false},user:{userInfo:{plan_id:options.currentPlan},subscribe:{expired_at:1}},dispatch:action=>trace.push(['dispatch',action])};}
for(const loading of [false,true])for(const renew of [false,true])for(const currentPlan of [null,7])test(`PlanDetail render loading=${loading} renew=${renew} current=${currentPlan}`,async()=>{
 const values=[];for(const original of [true,false]){const trace=[];const Page=await load(original,trace,false);const page=new Page(props(trace,{loading,renew,currentPlan}));page.componentDidMount();page.couponCheck();page.componentWillUnmount();values.push(normalize({tree:page.render(),trace}));}assert.deepEqual(values[1],values[0]);
});
for(const type of [1,2])for(const value of [0,50,2000])test(`PlanDetail coupon ${type}/${value}`,async()=>{
 const values=[];for(const original of [true,false]){const trace=[];const Page=await load(original,trace,false);const page=new Page(props(trace,{coupon:{name:'Coupon',code:'CODE',type,value}}));page.order();values.push(normalize({total:page.getTotalAmount(),discount:page.getCouponJSX(),trace}));}assert.deepEqual(values[1],values[0]);
});
for(const currentPlan of [null,7,8])for(const status of [undefined,0,1,2])for(const expired of [false,true])test(`PlanDetail order guard current=${currentPlan} status=${status} expired=${expired}`,async()=>{
 const values=[];for(const original of [true,false]){const trace=[];const Page=await load(original,trace,expired);const page=new Page(props(trace,{currentPlan,orders:status===undefined?[]:[{status,trade_no:'fixture-order'}]}));page.preOrder();const confirmation=trace.find(x=>x[0]==='confirm')?.[1];if(confirmation){if(confirmation.onCancel)confirmation.onCancel();confirmation.onOk();const cancel=trace.find(x=>x[1]?.type==='order/cancel');if(cancel)cancel[1].complete();}values.push(normalize(trace));}assert.deepEqual(values[1],values[0]);
});
