// One-time extraction of menu data; normal builds do not run this script.
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
 const file=path.join(home,target,'src/layouts/Sidebar.jsx');
 const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'module',plugins:['jsx']});
 let navigation;
 traverse(ast,{ObjectProperty(p){if(p.node.key.name==='nav'&&t.isArrayExpression(p.node.value)){
  navigation=p.node.value;p.node.value=t.callExpression(t.identifier('createNavigation'),[]);
 }}});
 if(!navigation)throw Error('Navigation array not found: '+target);
 const items=navigation.elements.map(node=>{
  const item={};
  for(const prop of node.properties){
   const key=prop.key.name,value=prop.value;
   if(key==='icon'){
    const attr=value.openingElement.attributes.find(a=>a.name.name==='className');
    item.iconClass=(attr.value.expression||attr.value).value;
   }else if(key==='title'&&t.isCallExpression(value))item.title=value.arguments[0].properties.find(p=>p.key.name==='id').value.value;
   else if(t.isStringLiteral(value))item[key]=value.value;
   else throw Error('Unexpected navigation value');
  }
  return item;
 });
 const config=`import React from 'react';\n${target==='user'?"import { formatMessage } from '../vendor/i18n.js';\n":''}\n// Item order controls sidebar order. Routes are registered separately in app/routes.js.\nexport const navigationItems = ${JSON.stringify(items,null,2)};\n\nexport function createNavigation() {\n  return navigationItems.map(({ iconClass, ...item }) => ({\n    ...item,\n    title: ${target==='user'?'formatMessage({ id: item.title })':'item.title'},\n    ...(iconClass ? { icon: <i className={iconClass}></i> } : {}),\n  }));\n}\n`;
 await fs.mkdir(path.join(home,target,'src/config'),{recursive:true});
 await fs.writeFile(path.join(home,target,'src/config/navigation.jsx'),config);
 ast.program.body=ast.program.body.filter(node=>!(t.isImportDeclaration(node)&&node.source.value==='../vendor/i18n.js'));
 ast.program.body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('createNavigation'),t.identifier('createNavigation'))],t.stringLiteral('../config/navigation.jsx')));
 await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
 console.log(target,items.length,'navigation entries extracted');
}
