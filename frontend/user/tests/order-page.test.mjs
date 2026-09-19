import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const source=await fs.readFile(new URL('../src/pages/Order.jsx',import.meta.url),'utf8');
const code=(await transform(source,{loader:'jsx',format:'cjs'})).code;
function setup(cancelLoading){
 const trace=[],module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require(id){
  if(id==='react')return {Component:class{constructor(props){this.props=props;}}};
  if(id.includes('reactRedux'))return {c:()=>cls=>cls};
  if(id.includes('i18n'))return {formatMessage:({id})=>id};
  if(id.includes('Modal'))return {a:{confirm:options=>{trace.push(['confirm',options]);return options;}}};
  return {};
 }},{timeout:2000});
 return {page:new module.exports.OrderPage({order:{cancelLoading},dispatch:action=>trace.push(['dispatch',action])}),trace};
}
test('Order page fetches only on mount or explicit refresh',()=>{
 const {page,trace}=setup(false);page.componentDidMount();page.fetchData();
 assert.deepEqual(structuredClone(trace),[['dispatch',{type:'order/fetch'}],['dispatch',{type:'order/fetch'}]]);
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
