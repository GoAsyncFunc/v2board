// One-time extraction of readonly display columns only.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../admin/src/pages/Plan.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
const keys=['month_price','quarter_price','half_year_price','year_price','two_year_price','three_year_price','onetime_price','reset_price'];const columns=[];
traverse(ast,{ArrayExpression(p){if(!p.node.elements.some(e=>t.isObjectExpression(e)&&e.properties.some(x=>x.key?.name==='dataIndex'&&x.value.value==='month_price')))return;
 for(let index=0;index<p.node.elements.length;index++){
  const col=p.node.elements[index];if(!t.isObjectExpression(col))continue;
  const key=col.properties.find(x=>x.key?.name==='dataIndex')?.value.value;if(!keys.includes(key))continue;
  columns.push(t.cloneNode(col,true));p.node.elements[index]=t.memberExpression(t.identifier('readonlyColumns'),t.stringLiteral(key),true);
 }p.skip();}});
if(columns.length!==8)throw Error('Expected 8 readonly columns');
await fs.writeFile(new URL('../tests/fixtures/pages/admin-plan-price.cjs',import.meta.url),'// Original readonly columns, extracted unchanged; write menus deliberately excluded.\nmodule.exports = function(){return '+generate(t.arrayExpression(columns)).code+';};\n');
ast.program.body.unshift(...parse("const { createReadonlyPlanPriceColumns } = require('../components/PlanPriceColumns.jsx'); const readonlyColumns = createReadonlyPlanPriceColumns();",{sourceType:'script'}).program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
