// One-time extraction; match only the readonly status/name column, not other name fields.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../src/pages/ServerManage.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});let original,count=0;
traverse(ast,{ArrayExpression(p){for(let index=0;index<p.node.elements.length;index++){
 const col=p.node.elements[index];if(!t.isObjectExpression(col)||!col.properties.some(x=>x.key?.name==='dataIndex'&&x.value?.value==='name')||!generate(col).code.includes('available_status'))continue;
 original=t.cloneNode(col,true);count++;p.node.elements[index]=t.callExpression(t.identifier('createServerNameColumn'),[t.identifier('D')]);
}}});
if(count!==1)throw Error('Expected one readonly name column: '+count);
await fs.writeFile(new URL('../tests/fixtures/pages/admin-server-name.cjs',import.meta.url),'// Original column unchanged; React binding only supports fixture JSX compilation.\nmodule.exports = function(y,u,h,m,D){const React=y.a;return '+generate(original).code+';};\n');
ast.program.body.unshift(...parse("const { createServerNameColumn } = require('../components/ServerNameColumn.tsx');").program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
