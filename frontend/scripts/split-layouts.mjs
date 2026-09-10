// One-time structure-preserving split; not part of build.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
for(const target of ['user','admin']){
 const user=target==='user';
 const source=await fs.readFile(path.join(home,'tests/fixtures/layouts',target+'.jsx'),'utf8');
 const ast=parse(source,{sourceType:'unambiguous',plugins:['jsx']});
 const renames=user?{l:'Sidebar',v:'Header',x:'MainLayout',f:'ConnectedSidebar',y:'ConnectedHeader',m:'headerTheme',w:'layoutTheme'}:{c:'Sidebar',p:'Header',y:'MainLayout',u:'ConnectedSidebar',m:'ConnectedHeader',d:'headerTheme',v:'layoutTheme'};
 traverse(ast,{Program(p){for(const [from,to] of Object.entries(renames))p.scope.rename(from,to);p.stop();}});
 const replacements=user?{'i.a':'React','s.a':'history','c["c"]':'connect','u["formatMessage"]':'formatMessage','r["a"]':'Icon','p["a"]':'LanguageSelector','h["e"]':'getPreference','h["q"]':'setPreference','d["disable"]':'disableDarkMode','d["enable"]':'enableDarkMode'}:{'o.a':'React','s.a':'history','l["c"]':'connect','r["a"]':'ConfigProvider','g["a"]':'chineseLocale','f["d"]':'getPreference','f["i"]':'setPreference','f["g"]':'clearToken','h["disable"]':'disableDarkMode','h["enable"]':'enableDarkMode'};
 traverse(ast,{MemberExpression:{exit(p){const key=generate(p.node).code;if(replacements[key])p.replaceWith(t.identifier(replacements[key]));}}});
 const classes=ast.program.body.filter(t.isClassDeclaration);
 for(const cls of classes){
  const name=cls.id.name;
  const fileAst=t.file(t.program([cls]));
  traverse(fileAst,{
   CallExpression:{exit(p){const node=p.node;
    if(t.isIdentifier(node.callee,{name:'Object'})&&node.arguments.length===1&&t.isIdentifier(node.arguments[0])){p.replaceWith(node.arguments[0]);return;}
    if(!t.isMemberExpression(node.callee)||node.callee.object.name!=='React'||node.callee.property.name!=='createElement')return;
    const [tag,props,...children]=node.arguments;if(!t.isIdentifier(tag))return;
    const attrs=(!props||t.isNullLiteral(props))?[]:[t.jsxSpreadAttribute(props)];
    const jsxName=t.jsxIdentifier(tag.name);
    p.replaceWith(t.jsxElement(t.jsxOpeningElement(jsxName,attrs,false),t.jsxClosingElement(jsxName),children.map(child=>t.isJSXElement(child)?child:t.jsxExpressionContainer(child)),false));
   }},
  });
  let imports="import React from 'react';\nimport { c as connect } from '../vendor/reactRedux.js';\n";
  let exports='';
  if(name==='Sidebar'){
   imports+="import history from '../vendor/routerHistory.js';\n";
   if(user)imports+="import { formatMessage } from '../vendor/i18n.js';\n";
   else imports+="import '../vendor/siteSettings.js';\n";
   exports=`export default connect(state => ({ ${user?'header: state.header':'layout: state.layout'} }))(Sidebar);`;
  }else if(name==='Header'){
   imports+="import { enable as enableDarkMode, disable as disableDarkMode } from '../vendor/modules/6e444349.js';\n";
   imports+=user?"import { e as getPreference, q as setPreference } from '../vendor/siteHelpers.js';\nimport { formatMessage } from '../vendor/i18n.js';\nimport { a as LanguageSelector } from '../components/LanguageSelector.jsx';\n":"import { d as getPreference, i as setPreference, g as clearToken } from '../vendor/siteHelpers.js';\nimport history from '../vendor/routerHistory.js';\nimport '../services/request.js';\n";
   imports+='const headerTheme = window.settings.theme;\n';
   exports=`export default connect(state => ({user: state.user${user?'':', layout: state.layout'}}))(Header);`;
  }else{
   imports+="import ConnectedSidebar from './Sidebar.jsx';\nimport ConnectedHeader from './Header.jsx';\n";
   imports+=user?"import { a as Icon } from '../vendor/Icon.js';\nimport '../vendor/iconStyles.js';\nimport withLocale from '../vendor/modules/624b656c.js';\n":"import { a as ConfigProvider } from '../vendor/modules/7745492b.js';\nimport { a as chineseLocale } from '../vendor/modules/2b477661.js';\nimport '../vendor/modules/474e4e74.js';\n";
   imports+='const layoutTheme = window.settings.theme;\n';
   exports=`const ConnectedLayout = ${user?'withLocale(' : ''}connect(state => ({layout: state.layout}))(MainLayout)${user?')':''};\nexport { ConnectedLayout as a };\nexport default ConnectedLayout;`;
  }
  await fs.writeFile(path.join(home,target,'src/layouts',name+'.jsx'),imports+'\nexport '+generate(cls,{jsescOption:{minimal:true}}).code+'\n'+exports+'\n');
 }
}
