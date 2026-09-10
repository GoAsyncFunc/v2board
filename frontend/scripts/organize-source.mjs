import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
for(const target of ['user','admin']){
 const base=path.join(home,target,'src');
 const file=path.join(base,'app/Router.jsx');
 const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
 let routeArray;
 traverse(ast,{ArrayExpression(p){if(p.node.elements.length>10&&p.node.elements.every(el=>t.isObjectExpression(el)&&el.properties.some(prop=>prop.key?.name==='path'))){routeArray=p.node;p.replaceWith(t.callExpression(t.identifier('require'),[t.stringLiteral('./routes.js')]));p.stop();}}});
 if(routeArray){
  await fs.writeFile(path.join(base,'app/routes.js'),'// Add or edit routes here. Every component is a source file, not a module ID.\nmodule.exports = '+generate(routeArray,{jsescOption:{minimal:true}}).code+';\n');
  await fs.writeFile(file,generate(ast).code+'\n');
 }
 const modules=JSON.parse(await fs.readFile(path.join(home,target,'modules.json'),'utf8'));
 for(const entry of modules){
  const source=path.join(base,entry.file);
  const ast=parse(await fs.readFile(source,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
  traverse(ast,{
   JSXSpreadAttribute(p){
    const obj=p.node.argument;if(!t.isObjectExpression(obj))return;
    if(!obj.properties.every(prop=>t.isObjectProperty(prop)&&!prop.computed&&(t.isIdentifier(prop.key)||t.isStringLiteral(prop.key))))return;
    // Preserve key/spread handling and duplicate prop evaluation where present.
    const keys=obj.properties.map(prop=>prop.key.name||prop.key.value);
    if(new Set(keys).size!==keys.length||keys.includes('__proto__'))return;
    p.replaceWithMultiple(obj.properties.map(prop=>t.jsxAttribute(t.jsxIdentifier(prop.key.name||prop.key.value),t.jsxExpressionContainer(prop.value))));
   },
   BooleanLiteral(){},
   StringLiteral(p){if(p.node.extra)delete p.node.extra;}
  });
  await fs.writeFile(source,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
 }
}
