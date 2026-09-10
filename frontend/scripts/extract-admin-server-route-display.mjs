// One-time extraction of readonly display columns only.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../admin/src/pages/ServerRoute.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
const keys=['id','remarks','match'];const columns=[];
traverse(ast,{ArrayExpression(p){if(!p.node.elements.some(e=>t.isObjectExpression(e)&&e.properties.some(x=>x.key?.name==='dataIndex'&&x.value.value==='match')))return;
 for(let index=0;index<p.node.elements.length;index++){
  const col=p.node.elements[index];if(!t.isObjectExpression(col))continue;
  const key=col.properties.find(x=>x.key?.name==='dataIndex')?.value.value;if(!keys.includes(key))continue;
  columns.push(t.cloneNode(col,true));p.node.elements[index]=t.memberExpression(t.identifier('readonlyColumns'),t.stringLiteral(key),true);
 }p.skip();}});
if(columns.length!==3)throw Error('Expected 3 readonly columns');
await fs.writeFile(new URL('../tests/fixtures/pages/admin-server-route-display.cjs',import.meta.url),'// Original readonly columns, extracted unchanged; write menus deliberately excluded.\nmodule.exports = function(){return '+generate(t.arrayExpression(columns)).code+';};\n');
ast.program.body.unshift(...parse("const { createReadonlyServerRouteColumns } = require('../components/ServerRouteDisplayColumns.jsx'); const readonlyColumns = createReadonlyServerRouteColumns();",{sourceType:'script'}).program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
