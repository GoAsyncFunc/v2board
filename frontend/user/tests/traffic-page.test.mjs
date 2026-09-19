import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={Component:class {constructor(props){this.props=props;}},createElement:(type,props,...children)=>({type,props:props||{},children})};
async function load(original){
 const cache=new Map();
 const sources={
  page:new URL(original?'./fixtures/pages/user-traffic.jsx':'../src/pages/Traffic.jsx',import.meta.url),
  columns:new URL('../src/components/TrafficColumns.tsx',import.meta.url),
 };
 const compiled={};for(const [name,file]of Object.entries(sources))compiled[name]=(await transform(await fs.readFile(file,'utf8'),{format:'cjs',loader:name==='columns'?'tsx':'jsx'})).code;
 function evaluate(name){
  if(cache.has(name))return cache.get(name);
  const module={exports:{}};
  const require=id=>{
   if(id==='react'||id.includes('reactRuntime'))return React;
   if(id.includes('TrafficColumns'))return evaluate('columns');
   if(id.includes('MainLayout'))return {__esModule:true,default:'Layout',a:'Layout'};
   if(id.includes('reactRedux'))return {c:()=>component=>component,connect:()=>component=>component};
   if(id.includes('i18n'))return {formatMessage:({id})=>id};
   if(id.includes('siteHelpers'))return {b:value=>'traffic:'+value,formatBytes:value=>'traffic:'+value};
   if(id.includes('77642f52'))return value=>({format:pattern=>`${value}:${pattern}`});
   for(const [key,label]of [['antdTable','Table'],['antdTooltip','Tooltip'],['antdTag','Tag'],['/Icon','Icon']])if(id.includes(key))return {a:label,[label]:label};
   if(/67395956|35446d6f|2b424a64|iconStyles/.test(id))return {};
   if(id.includes('6a65685a'))return Object.assign;
   if(id.includes('moduleInterop'))return {markEsModule:o=>Object.defineProperty(o,'__esModule',{value:true}),interopDefault:obj=>{const fn=()=>obj;Object.defineProperty(fn,'a',{get:fn});return fn;}};
        throw Error(id);
  };
  vm.runInNewContext(compiled[name],{module,exports:module.exports,require},{timeout:2000});cache.set(name,module.exports);return module.exports;
 }
 return evaluate('page').default;
}
const normalize=value=>JSON.parse(JSON.stringify(value,(key,value)=>typeof value==='function'?'[function]':value));
function table(node){if(node?.type==='Table')return node;for(const child of node?.children||[]){const found=table(child);if(found)return found;}}
for(const loading of [false,true])test(`Traffic page structure and lifecycle match; loading=${loading}`,async()=>{
 const before=await load(true),after=await load(false);const traces=[[],[]];
 const instances=[before,after].map((Page,index)=>new Page({stat:{traffics:[],getTrafficLogLoading:loading},dispatch:action=>traces[index].push(action)}));
 instances.forEach(instance=>instance.componentDidMount());
 assert.deepEqual(normalize(traces[1]),normalize(traces[0]));
 assert.deepEqual(normalize(instances[1].render()),normalize(instances[0].render()));
});
for(const rate of [0,1,1.5,'0',null])test(`Traffic columns values match; rate=${rate}`,async()=>{
 const before=await load(true),after=await load(false);
 const record={record_at:1700000000,u:'1024',d:'2048',server_rate:rate};
 const rendered=[before,after].map(Page=>table(new Page({stat:{traffics:[],getTrafficLogLoading:false}}).render()).props.columns.map(column=>column.render(record[column.dataIndex],record)));
 assert.deepEqual(normalize(rendered[1]),normalize(rendered[0]));
});

test('Traffic preserves hexadecimal byte values from the original renderer', async () => {
 const before=await load(true),after=await load(false);
 const record={record_at:1700000000,u:'0x400',d:'0x800',server_rate:1.5};
 const rendered=[before,after].map(Page=>table(new Page({stat:{traffics:[],getTrafficLogLoading:false}}).render()).props.columns.map(column=>column.render(record[column.dataIndex],record)));
 assert.deepEqual(normalize(rendered[1]),normalize(rendered[0]));
});
