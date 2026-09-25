import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function load(target,original){
 const trace=[],classes={},cache=new Map();
 const window={settings:{title:'Test',theme:{sidebar:'dark',header:'light'}},localStorage:{getItem:()=> 'zh-CN'},scrollTo:(...args)=>trace.push(['scroll',...args])};
 const document={};
 class Component{
  constructor(props){this.props=props;this.state={};}
  setState(value,callback){this.state={...this.state,...value};if(callback)callback();}
  forceUpdate(){trace.push(['update']);}
 }
 const React={Component,createElement(type,props,...children){
  if(typeof type==='function'&&(type.name==='HeaderAccountMenu'||type.name==='HeaderSearchOverlay'||type.name==='SidebarNavigation'))return type({...props,children});
  return {type:typeof type==='function'?(type.displayName||type.name):type,props:props||{},children};
 }};
 const connect=selector=>cls=>{const method=cls.prototype.renderMenu||cls.prototype.navigateTo?'Sidebar':cls.prototype.darkMode?'Header':'MainLayout';classes[method]=cls;const wrapper=function(){};wrapper.displayName='Connected'+method;return wrapper;};
 function evaluate(file){
  if(cache.has(file))return cache.get(file);
  const module={exports:{}};cache.set(file,module.exports);
  const code=compiled.get(file);
  const require=id=>{
   if(id==='react'||id.includes('reactRuntime'))return React;
   if(id==='react-redux'||id.includes('reactRedux'))return {c:connect,connect};
   if(id.includes('moduleInterop'))return {interopDefault:obj=>{const f=()=>obj&&obj.__esModule?obj.default:obj;Object.defineProperty(f,'a',{get:f});return f;}};
   if(id==='../app/history.js'||id==='../app/history'||id==='../../app/history')return {__esModule:true,default:{location:{pathname:'/dashboard'},push:route=>trace.push(['navigate',route])}};
   if(id.includes('routerHistory')||id.includes('app/navigationService'))return {push:route=>trace.push(['navigate',route])};
   if(id.includes('i18n'))return {formatMessage:({id})=>id};
   if(id.includes('LanguageSelector'))return {a:'LanguageSelector'};
   if(id.includes('siteHelpers'))return {
    e:()=> '0',d:()=> '0',q:(...a)=>trace.push(['pref',...a]),i:(...a)=>trace.push(['pref',...a]),g:()=>trace.push(['clearToken']),
    getPreference:()=> '0',getCookie:()=> '0',setPreference:(...a)=>trace.push(['pref',...a]),clearToken:()=>trace.push(['clearToken'])
   };
   if(id==='darkreader'||id.includes('6e444349'))return {enable:options=>trace.push(['dark',options]),disable:()=>trace.push(['light'])};
   if(id.includes('withLocaleRuntime'))return cls=>cls;
   if(id.includes('/Icon'))return {a:'Icon',Icon:'Icon'};
   if(id==='antd/lib/config-provider'||id.includes('antdConfigProvider'))return {__esModule:true,default:'ConfigProvider',a:'ConfigProvider'};
   if(id==='antd/lib/locale-provider/zh_CN'||id.includes('antdZhCnLocale'))return {__esModule:true,default:'zh-CN',a:'zh-CN'};
   if(id==='../Sidebar'||id==='../Sidebar/SidebarLayout')return evaluate(path.join(home,'src/layouts/Sidebar/SidebarLayout.tsx'));
   if(id==='../Header'||id==='../Header/HeaderLayout')return evaluate(path.join(home,'src/layouts/Header/HeaderLayout.tsx'));
   if(id==='../../config/navigationConfig')return evaluate(path.join(home,'src/config/navigationConfig.tsx'));
   if(id.includes('HeaderAccountMenu'))return evaluate(path.join(home,'src/layouts/Header/components/HeaderAccountMenu.tsx'));
   if(id.includes('HeaderSearchOverlay'))return evaluate(path.join(home,'src/layouts/Header/components/HeaderSearchOverlay.tsx'));
   if(id.includes('SidebarNavigation'))return evaluate(path.join(home,'src/layouts/Sidebar/components/SidebarNavigation.tsx'));
   if(/Styles|474e4e74|apiClient|siteSettings/.test(id))return {};
   throw Error('Unexpected dependency '+id);
  };
  vm.runInNewContext(code,{module,exports:module.exports,require,window,document,Math},{filename:file,timeout:3000});
  cache.set(file,module.exports);return module.exports;
 }
 const paths=original?[path.join(home,'tests/fixtures/layouts',target+'.jsx')]:[
  path.join(home,'src/layouts/MainLayout/MainLayout.tsx'),
  path.join(home,'src/layouts/Sidebar/SidebarLayout.tsx'),
  path.join(home,'src/layouts/Header/HeaderLayout.tsx'),
 ];
 if(!original)paths.push(path.join(home,'src/layouts/Header/components/HeaderAccountMenu.tsx'));
 if(!original)paths.push(path.join(home,'src/layouts/Header/components/HeaderSearchOverlay.tsx'));
 if(!original)paths.push(path.join(home,'src/layouts/Sidebar/components/SidebarNavigation.tsx'));
 if(!original)paths.push(path.join(home,'src/config/navigationConfig.tsx'));
 const compiled=new Map();for(const file of paths)compiled.set(file,(await transform(await fs.readFile(file,'utf8'),{loader:file.endsWith('.tsx')?'tsx':'jsx',format:'cjs',jsxFactory:'React.createElement'})).code);
 evaluate(paths[0]);return {classes,trace,document};
}
function normalize(value){return JSON.parse(JSON.stringify(value,(key,value)=>key==='key'?undefined:typeof value==='function'?'[handler]':value));}
const target = 'admin';
test(`${target}: sidebar/header/layout rendering and behavior match original`,async()=>{
 const old=await load(target,true),next=await load(target,false);
 for(const name of ['Sidebar','Header','MainLayout']){
  for(const loading of [false,true])for(const showNav of [false,true]){
   const props={location:{pathname:'/plan'},layout:{showNav},user:{userInfo:{email:'test@example.com'}},search:{placeholder:'Search',defaultValue:'',onChange(){}},title:'Test page',children:'Page content',loading,dispatch(){}};
   const a=new old.classes[name](props),b=new next.classes[name](props);
   assert.deepEqual(normalize(b.render()),normalize(a.render()),name);
  }
 }
 function actions(subject, modern){
  const props={location:{pathname:'/dashboard'},user:{userInfo:{}},dispatch:action=>subject.trace.push(['dispatch',action])};
  const header=new subject.classes.Header(props);
  header.componentDidMount();header.darkMode();header.logout();
  if(target==='user')header.showDropmenu('showAvatarMenu');else header.showAvatarMenu();
  assert.equal(header.state.showAvatarMenu,true);
  const expandedHeader=normalize(header.render());
  subject.document.onclick({});assert.equal(header.state.showAvatarMenu,false);
  const sidebar=new subject.classes.Sidebar(props);
  if(modern)sidebar.navigateTo('/plan');
  else sidebar.renderMenu('item','Plan','/plan',null).children[0].props.onClick();
  const main=new subject.classes.MainLayout(props);main.componentDidMount();
  return {trace:normalize(subject.trace),expandedHeader};
 }
 assert.deepEqual(actions(next,true),actions(old,false));
});
