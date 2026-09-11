// One-time extraction: deliberately excludes all filters/sorters/actions.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../admin/src/pages/Plan.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});let original,count=0;
traverse(ast,{ArrayExpression(p){for(let index=0;index<p.node.elements.length;index++){
 const col=p.node.elements[index];if(!t.isObjectExpression(col)||!col.properties.some(x=>x.key?.name==='dataIndex'&&x.value?.value==='group_id'))continue;
 original=t.cloneNode(col,true);count++;p.node.elements[index]=t.callExpression(t.identifier('createPlanGroupColumn'),[t.identifier('f')]);
}}});
if(count!==1)throw Error('Expected exactly one rate column, found '+count);
await fs.writeFile(new URL('../tests/fixtures/pages/admin-plan-group.cjs',import.meta.url),'// Original readonly column unchanged, dependencies injected.\nmodule.exports = function(f,m,l){return '+generate(original).code+';};\n');
ast.program.body.unshift(...parse("const { createPlanGroupColumn } = require('../components/PlanGroupColumn.jsx');").program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
