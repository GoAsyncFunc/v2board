import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
async function setup(original){
 const trace=[],timers=new Map();let next=0;
 const React={Component:class{constructor(props){this.props=props;}setState(s){this.state={...this.state,...s};}},createElement:(type,props,...children)=>({type,props,children})};
 const module={exports:{}};const text=await fs.readFile(new URL(original?'./fixtures/pages/user-order-detail.jsx':'../user/src/pages/OrderDetail.jsx',import.meta.url),'utf8');
 const code=(await transform(text,{loader:'jsx',format:'cjs'})).code;
 const statusCode=(await transform(await fs.readFile(new URL('../user/src/components/checkout/OrderStatusResult.jsx',import.meta.url),'utf8'),{loader:'jsx',format:'cjs'})).code;
 const deps=id=>{
  if(id==='react')return React;
  if(id.includes('i18n'))return {formatMessage:({id})=>id};
  if(id.includes('4172412b'))return {router:{push:url=>trace.push(['navigate',url])}};
  return {};
 };
 const statusModule={exports:{}};vm.runInNewContext(statusCode,{module:statusModule,exports:statusModule.exports,require:deps});
 vm.runInNewContext(code,{module,exports:module.exports,setTimeout(fn,delay){const id=++next;timers.set(id,fn);trace.push(['timer',id,delay]);return id;},clearTimeout(id){timers.delete(id);trace.push(['clear',id]);},require(id){
  if(id.includes('OrderStatusResult'))return statusModule.exports;
  if(id==='react'||id.includes('71317449'))return React;
  if(id.includes('reactRedux'))return {c:()=>cls=>cls};
  if(id.includes('5642306f'))return ()=> 'StripeForm';
  if(id.includes('i18n'))return {formatMessage:({id})=>id};
  if(id.includes('74737172'))return {a:{error:msg=>trace.push(['error',msg])}};
  if(id.includes('4172412b'))return {router:{push:url=>trace.push(['navigate',url])}};
  if(id.includes('moduleInterop'))return {markEsModule:o=>Object.defineProperty(o,'__esModule',{value:true}),interopDefault:o=>{const f=()=>o;Object.defineProperty(f,'a',{get:f});return f;}};
  return {};
 }},{timeout:2000});
 const props={match:{params:{trade_no:'TEST-ORDER'}},order:{selectMethod:1,paymentMethod:[{id:1,payment:'Alipay',handling_fee_fixed:20,handling_fee_percent:2},{id:2,payment:'StripeCredit',handling_fee_fixed:0,handling_fee_percent:0}],order:{total_amount:1000}}};
 props.dispatch=action=>trace.push(['dispatch',action]);
 return {page:new module.exports.default(props),trace,timers};
}
const clean=x=>JSON.parse(JSON.stringify(x,(k,v)=>typeof v==='function'?'[callback]':v));
for(const scenario of ['mount','method','stripe-key','checkout','stripe-missing','stripe-token','poll-pending','poll-complete','unmount','status','late-poll','late-detail','missing-free','missing-paid','checkout-missing','close-before-complete','complete-before-close','empty-response'])test(`OrderDetail original/new ${scenario}`,async()=>{
 const results=[];for(const original of [true,false]){
  const {page,trace,timers}=await setup(original);
  if(scenario==='mount'){page.componentDidMount();trace.find(x=>x[1]?.type==='order/detail')[1].callback();trace.find(x=>x[1]?.type==='order/getPaymentMethod')[1].complete(page.props.order.paymentMethod);}
  if(scenario==='method')page.changePaymentMethod(1);
  if(scenario==='stripe-key'){page.changePaymentMethod(2);trace.find(x=>x[1]?.type==='comm/getStripePublicKey')[1].complete('pk_fixture');}
  if(scenario.startsWith('stripe-')&&scenario!=='stripe-key'){page.props.order.selectMethod=2;if(scenario==='stripe-token')page.stripeCallback(null,{id:'tok_fixture'});page.checkout();}
  if(scenario==='checkout')page.checkout();
  if(scenario.startsWith('poll-')){page.check();const fn=timers.values().next().value;timers.clear();fn();trace.find(x=>x[1]?.type==='order/check')[1].callback({data:scenario==='poll-pending'?0:1});}
  if(scenario==='unmount'){page.check();page.componentWillUnmount();assert.equal(timers.size,0);}
  if(scenario==='late-poll'){page.check();const fn=timers.values().next().value;timers.clear();fn();const callback=trace.find(x=>x[1]?.type==='order/check')[1].callback;page.componentWillUnmount();callback({data:0});assert.equal(timers.size,1,'Inherited late callback restarts polling');}
  if(scenario==='late-detail'){page.fetchData();const callback=trace.find(x=>x[1]?.type==='order/detail')[1].callback;page.componentWillUnmount();callback();assert.equal(timers.size,1,'Inherited detail callback restarts polling');}
  if(scenario==='missing-free'){page.props.order.paymentMethod=[];page.props.order.order.total_amount=0;page.changePaymentMethod(999);}
  if(scenario==='missing-paid'){page.props.order.paymentMethod=[];try{page.changePaymentMethod(999);}catch(error){trace.push(['threw',error.name]);}assert.equal(trace.at(-1)[0],'threw','Inherited missing paid method throws');}
  if(scenario==='checkout-missing'){page.props.order.paymentMethod=[];page.checkout();}
  if(scenario==='close-before-complete'||scenario==='complete-before-close'){
   page.check();const fn=timers.values().next().value;timers.clear();fn();const callback=trace.find(x=>x[1]?.type==='order/check')[1].callback;
   const close=()=>page.props.dispatch({type:'order/setState',payload:{qrcodeModalVisible:false,payUrl:undefined}});
   if(scenario==='close-before-complete')close();callback({data:1});if(scenario==='complete-before-close')close();
   assert.equal(timers.size,0);assert.equal(trace.filter(x=>x[1]?.type==='order/detail').length,1);
  }
  if(scenario==='empty-response'){page.check();timers.values().next().value();trace.find(x=>x[1]?.type==='order/check')[1].callback({});assert.equal(trace.filter(x=>x[1]?.type==='order/detail').length,1,'Inherited undefined data is treated as completed');}
  if(scenario==='status')for(const status of [1,2,3,4,99])trace.push(['result',status,page.getResultText(status)]);
  results.push(clean({trace,state:page.state,order:page.props.order,timers:timers.size}));
 }assert.deepEqual(results[1],results[0]);
});
