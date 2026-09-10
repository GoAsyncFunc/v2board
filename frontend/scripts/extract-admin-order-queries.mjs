// One-time extraction; preserve selected original effects as a test-only fixture.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../admin/src/models/order.js',import.meta.url);
const source=await fs.readFile(file,'utf8');if(source.includes('const orderQueries'))throw Error('Already extracted');
const ast=parse(source,{sourceType:'unambiguous'});
const runtime=ast.program.body.find(n=>t.isFunctionDeclaration(n)&&n.id.name==='a');
const names=['fetch','filter','addFilter','changeTable'],selected=[];
traverse(ast,{ObjectMethod(p){if(names.includes(p.node.key.name)){
 selected.push(t.cloneNode(p.node,true));p.replaceWith(t.objectProperty(t.identifier(p.node.key.name),t.memberExpression(t.identifier('orderQueries'),t.identifier(p.node.key.name))));
}}});
if(selected.length!==4||!runtime)throw Error('Unexpected order model');
await fs.writeFile(new URL('../tests/fixtures/models/admin-order-query.cjs',import.meta.url),'const o = api, i = () => Object.assign;\n'+generate(runtime).code+'\nmodule.exports = '+generate(t.objectExpression(selected)).code+';\n');
ast.program.body.unshift(...parse('const orderQueries = require("./orderQueryEffects.js");').program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
