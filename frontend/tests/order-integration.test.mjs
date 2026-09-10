import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const bundle=(await build({absWorkingDir:home,stdin:{resolveDir:home,contents:`import {OrderDetailPage} from './user/src/pages/OrderDetail.jsx';import order from './user/src/models/order.js';import comm from './user/src/models/comm.js';globalThis.integration={OrderDetailPage,order,comm};`},bundle:true,write:false,format:'iife',loader:{'.js':'jsx'},plugins:[{name:'integration-boundaries',setup(b){
 b.onResolve({filter:/.*/},args=>{
  if(args.path==='react'||args.path.includes('/vendor/')||args.path.includes('/layouts/')||args.path.includes('/components/'))return {path:args.path,namespace:'mock'};
 });
 b.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:`module.exports=globalThis.dependency(${JSON.stringify(args.path)});`,loader:'js'}));
}}]})).outputFiles[0].text;
function setup(mode){
 const events=[],timers=new Map(),pending=new Set();let timerId=0,checkCount=0,release;
 const location={origin:'http://fixture.test',pathname:'/'};let href='http://fixture.test/';Object.defineProperty(location,'href',{get:()=>href,set:value=>events.push(['redirect',value])});
 const state={order:null,comm:null};const methods=[{id:1,payment:'Alipay',handling_fee_fixed:0,handling_fee_percent:0},{id:2,payment:'StripeCredit',handling_fee_fixed:0,handling_fee_percent:0}];
 const record={trade_no:'TEST',status:0,total_amount:1000,plan:{id:7}};
 async function fetchResponse(url,options){
  const endpoint=new URL(url).pathname.replace('/api/v1','');events.push(['http',endpoint,options.method||'GET',options.body]);
  if(endpoint.endsWith('getStripePublicKey'))return {status:500,json:async()=>({message:'Key unavailable'})};
  if(endpoint.endsWith('/checkout')){
   if(mode==='network')throw Error('Offline');
   if(mode==='422'||mode==='500')return {status:Number(mode),json:async()=>mode==='422'?{errors:{method:['Invalid method']}}:{message:'Payment unavailable'}};
   return {status:200,json:async()=>({type:0,data:'fixture-qr'})};
  }
  if(endpoint.endsWith('/check')){
   checkCount++;
   if(mode==='late')await new Promise(resolve=>{release=resolve;});
   return {status:200,json:async()=>({data:mode==='late'?0:1})};
  }
  return {status:200,json:async()=>({data:endpoint.endsWith('/detail')?record:endpoint.endsWith('getPaymentMethod')?methods:[]})};
 }
 class Component{constructor(props){this.props=props;}setState(value){this.state={...this.state,...value};}}
 const context=vm.createContext({URL,console,document:{},window:{settings:{title:'Fixture'},location},setTimeout(fn,ms){const id=++timerId;timers.set(id,fn);events.push(['timer',ms]);return id;},clearTimeout:id=>timers.delete(id),dependency(id){
  if(id==='react'||id.includes('71317449'))return {Component};
  if(id.includes('reactRedux'))return {c:()=>cls=>cls};
  if(id.includes('moduleInterop'))return {markEsModule:o=>Object.defineProperty(o,'__esModule',{value:true}),interopDefault:o=>{const f=()=>o;Object.defineProperty(f,'a',{get:f});return f;}};
  if(id.includes('70307045'))return Object.assign;
  if(id.includes('dva'))return {b:fetchResponse};
  if(id.includes('i18n'))return {formatMessage:({id})=>id,getLocale:()=> 'zh-CN'};
  if(id.includes('siteHelpers'))return {d:()=> 'fixture-token',o:()=>events.push(['clear-token']),r:(...args)=>events.push(['notify',...args])};
  if(id.includes('routerHistory'))return {push:value=>events.push(['navigate',value])};
  if(id.includes('5642306f'))return ()=>null;
  if(id.includes('74737172'))return {a:{info:(...a)=>events.push(['info',...a]),loading:(...a)=>events.push(['loading',...a]),error:(...a)=>events.push(['error-message',...a])}};
  return {};
 }});
 vm.runInContext(bundle,context,{timeout:3000});const {OrderDetailPage,order,comm}=context.integration;const models={order,comm};
 state.order={...order.state,order:{...record},paymentMethod:methods,selectMethod:1};state.comm={...comm.state};
 let page;
 async function dispatch(action,namespace){
  const type=action.type.includes('/')?action.type:`${namespace}/${action.type}`;events.push(['action',type]);
  const [modelName,name]=type.split('/');const model=models[modelName];
  if(!model){events.push(['external-action',type]);return;}
  if(model.reducers[name]){state[modelName]=model.reducers[name](state[modelName],action);if(page)page.props[modelName]=state[modelName];return;}
  if(!model.effects[name]){events.push(['unresolved',type]);return;}
  const iterator=model.effects[name](action,{put:a=>track(dispatch(a,modelName)),select:fn=>fn(state)});
  let step=iterator.next();while(!step.done){let value;try{value=await step.value;}catch(e){step=iterator.throw(e);continue;}step=iterator.next(value);}
 }
 function track(promise){pending.add(promise);promise.catch(e=>events.push(['rejection',e.message])).finally(()=>pending.delete(promise));return promise;}
 page=new OrderDetailPage({order:state.order,comm:state.comm,match:{params:{trade_no:'TEST'}},dispatch:a=>track(dispatch(a))});
 async function flush(){while(pending.size)await Promise.allSettled([...pending]);}
 return {page,state,events,timers,flush,dispatch:a=>track(dispatch(a)),async tick(){const [id,fn]=timers.entries().next().value;timers.delete(id);fn();await flush();},release:()=>release?.(),hasRelease:()=>!!release,checkCount:()=>checkCount};
}
test('detail + method selection + QR checkout + polling completion flow',async()=>{
 const h=setup('qr');h.page.componentDidMount();await h.flush();assert.equal(h.state.order.selectMethod,1);assert.equal(h.timers.size,1);
 h.page.checkout();await h.flush();assert.equal(h.state.order.qrcodeModalVisible,true);assert.equal(h.state.order.payUrl,'fixture-qr');
 await h.tick();assert.equal(h.state.order.qrcodeModalVisible,false);assert.equal(h.checkCount(),1);assert.equal(h.timers.size,0);
 assert.equal(h.events.filter(e=>e[0]==='http'&&e[1]==='/user/order/detail').length,2);
});
test('Stripe key HTTP failure leaves key unset and tokenless checkout reports error',async()=>{
 const h=setup('key');h.page.changePaymentMethod(2);await h.flush();assert.equal(h.page.state.pk,undefined);
 assert.ok(h.events.some(e=>e[0]==='notify'&&e[3]==='Key unavailable'));
 h.page.checkout();await h.flush();assert.ok(h.events.some(e=>e[0]==='error-message'));assert.ok(!h.events.some(e=>e[0]==='http'&&e[1].endsWith('/checkout')));
});
for(const status of ['422','500'])test(`checkout ${status} passes through real request wrapper`,async()=>{
 const h=setup(status);h.page.checkout();await h.flush();assert.equal(h.state.order.checkoutLoading,false);assert.equal(h.state.order.qrcodeModalVisible,false);assert.ok(h.events.some(e=>e[0]==='notify'&&e[2]==='请求失败'));
});
test('network rejection retains loading with no notification (inherited)',async()=>{
 const h=setup('network');h.page.checkout();await h.flush();assert.equal(h.state.order.checkoutLoading,true);assert.ok(h.events.some(e=>e[0]==='rejection'&&e[1]==='Offline'));assert.ok(!h.events.some(e=>e[0]==='notify'));
});
test('cancel preserves fetch/details typo and callback ordering',async()=>{
 const h=setup('cancel');await h.dispatch({type:'order/cancel',tradeNo:'TEST',complete:()=>h.events.push(['complete'])});await h.flush();
 assert.ok(h.events.some(e=>e[0]==='unresolved'&&e[1]==='order/details'));assert.equal(h.events.at(-1)[0],'complete');
 assert.ok(!h.events.some(e=>e[0]==='http'&&e[1].endsWith('/detail')));
});
test('late check response after unmount restarts polling (inherited)',async()=>{
 const h=setup('late');h.page.check();const [id,fn]=h.timers.entries().next().value;h.timers.delete(id);fn();
 for(let i=0;i<20&&!h.hasRelease();i++)await Promise.resolve();assert.ok(h.hasRelease());h.page.componentWillUnmount();h.release();await h.flush();assert.equal(h.timers.size,1);
});
