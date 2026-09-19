import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const source=await fs.readFile(new URL('../src/pages/Order.tsx',import.meta.url),'utf8');
const code=(await transform(source,{loader:'tsx',format:'cjs'})).code;
function setup(cancelLoading, mobile=false){
 const trace=[],module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require(id){
  if(id==='react')return {Component:class{constructor(props){this.props=props;}},createElement:(type,props,...children)=>({type,props:props||{},children})};
  if(id==='react-redux'||id.includes('reactRedux'))return {c:()=>cls=>cls,connect:()=>cls=>cls};
  if(id.includes('i18n'))return {formatMessage:({id})=>id};
  if(id.includes('Modal')){const Modal={confirm:options=>{trace.push(['confirm',options]);return options;}};return {a:Modal,Modal};}
  if(id.includes('MainLayout'))return 'Layout';
  if(id.includes('MobileList'))return {Item:{Brief:'Brief'}};
  if(id.includes('siteHelpers'))return {isMobile:()=>mobile};
  if(id.includes('routerHistory'))return {push:route=>trace.push(['navigate',route])};
  if(id.includes('DateTimeDisplay'))return {formatDateTimeSeconds:value=>`date:${value}`};
  if(id.includes('MoneyDisplay'))return {formatPrice:value=>(value/100).toFixed(2)};
  if(id.includes('localeSettings'))return {localeSettings:{orderStatusText:{0:()=> '待支付',2:()=> '已取消'}}};
  if(id.includes('OrderColumns'))return {orderBadgeStatuses:['error','processing','default'],createOrderColumns:onCancel=>[{key:'action',onCancel}]};
  if(id.includes('antdTable'))return {a:'Table'};
  if(id.includes('antdBadge'))return {a:'Badge'};
  return {};
 }},{timeout:2000});
 return {page:new module.exports.OrderPage({order:{cancelLoading,orders:[],fetchLoading:false},dispatch:action=>trace.push(['dispatch',action])}),trace};
}
test('Order page fetches only on mount or explicit refresh',()=>{
 const {page,trace}=setup(false);page.componentDidMount();page.fetchData();
 assert.deepEqual(structuredClone(trace),[['dispatch',{type:'order/fetch'}],['dispatch',{type:'order/fetch'}]]);
});

function nodes(tree,predicate){
 if(Array.isArray(tree))return tree.flatMap(node=>nodes(node,predicate));
 if(!tree||typeof tree!=='object')return [];
 return [...(predicate(tree)?[tree]:[]),...nodes(tree.children,predicate)];
}

test('Desktop orders retain records, horizontal scrolling and confirmation-backed cancellation',()=>{
 const {page,trace}=setup(false);
 const order={trade_no:'TEST-ORDER',status:0,total_amount:1250,period:'month_price'};
 page.props.order.orders=[order];
 page.props.order.fetchLoading=true;
 const tree=page.render();
 const table=nodes(tree,node=>node.type==='Table')[0];
 assert.equal(table.props.dataSource,page.props.order.orders);
 assert.equal(table.props.pagination,false);
 assert.equal(table.props.scroll.x,900);
 assert.equal(nodes(tree,node=>node.props.className?.includes('block-mode-loading')).length,1);
 table.props.columns[0].onCancel(order);
 assert.equal(trace[0][0],'confirm');
 assert.equal(trace.length,1);
});

test('Mobile orders display amount, status and timestamp and navigate to order details',()=>{
 const {page,trace}=setup(false,true);
 page.props.order.orders=[{trade_no:'MOBILE-ORDER',status:0,total_amount:1250,created_at:1700000000,plan:{name:'Monthly'}}];
 const tree=page.render();
 assert.equal(nodes(tree,node=>node.type==='Table').length,0);
 const item=nodes(tree,node=>node.props.arrow==='horizontal')[0];
 assert.equal(item.props.multipleLine,true);
 assert.match(JSON.stringify(item.props.extra),/12\.50/);
 assert.match(JSON.stringify(item.props.extra),/待支付/);
 assert.match(JSON.stringify(item.children),/Monthly/);
 assert.match(JSON.stringify(item.children),/date:1700000000/);
 item.props.onClick();
 assert.deepEqual(trace,[['navigate','/order/MOBILE-ORDER']]);
 page.props.order.orders=[];
 assert.equal(nodes(page.render(),node=>node.props.arrow==='horizontal').length,0);
});
for(const loading of [false,true])test(`Order cancel confirms before dispatch, loading=${loading}`,()=>{
 const {page,trace}=setup(loading);const confirm=page.cancel({trade_no:'FIXTURE-ORDER'});
 assert.equal(trace.filter(x=>x[0]==='dispatch').length,0);
 assert.equal(confirm.okButtonProps.loading,loading);
 assert.equal(confirm.okText,'关闭订单');
 assert.match(confirm.content,/如果你已经付款/);
 confirm.onOk();
 assert.deepEqual(structuredClone(trace.at(-1)),['dispatch',{type:'order/cancel',tradeNo:'FIXTURE-ORDER'}]);
});
