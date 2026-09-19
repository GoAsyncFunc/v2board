// One-time extraction of readonly display columns only.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../src/pages/Giftcard.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
const keys=['id','name','type','value','plan_id','limit_use','started_at'];const columns=[];
traverse(ast,{ArrayExpression(p){if(!p.node.elements.some(e=>t.isObjectExpression(e)&&e.properties.some(x=>x.key?.name==='dataIndex'&&x.value.value==='limit_use')))return;
 for(let index=0;index<p.node.elements.length;index++){
  const col=p.node.elements[index];if(!t.isObjectExpression(col))continue;
  const key=col.properties.find(x=>x.key?.name==='dataIndex')?.value.value;if(!keys.includes(key))continue;
  columns.push(t.cloneNode(col,true));p.node.elements[index]=t.memberExpression(t.callExpression(t.identifier('createReadonlyGiftcardColumns'),[t.identifier('y')]),t.stringLiteral(key),true);
 }p.skip();}});
if(columns.length!==7)throw Error('Expected 7 readonly columns');
await fs.writeFile(new URL('../tests/fixtures/pages/admin-giftcard-display.cjs',import.meta.url),'// Original readonly columns, extracted unchanged; write menus deliberately excluded.\nmodule.exports = function(b,d,_,y){return '+generate(t.arrayExpression(columns)).code+';};\n');
ast.program.body.unshift(...parse("const { createReadonlyGiftcardColumns } = require('../components/GiftcardDisplayColumns.tsx');",{sourceType:'script'}).program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
