// One-time extraction; snapshots only the original selected effects for tests.
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
 const file=path.join(home,target,'src/models/user.js');
 const source=await fs.readFile(file,'utf8');
 if(source.includes('const sessionEffects = require('))continue;
 const ast=parse(source,{sourceType:'unambiguous',plugins:['jsx']});
 const names=target==='user'?['checkLogin','getUserInfo','logout']:['checkLogin','getUserInfo'];
 const runtimeName=target==='user'?'p':'f';
 const runtime=ast.program.body.find(node=>t.isFunctionDeclaration(node)&&node.id.name===runtimeName);
 const selected=[];
 traverse(ast,{ObjectMethod(p){if(names.includes(p.node.key.name)){
  selected.push(t.cloneNode(p.node,true));
  p.replaceWith(t.objectProperty(t.identifier(p.node.key.name),t.memberExpression(t.identifier('sessionEffects'),t.identifier(p.node.key.name))));
 }}});
 if(selected.length!==names.length)throw Error('Unexpected session methods');
 const stubs=target==='user'?"const a = api, u = helpers, c = {a: history};":"const a = api, c = helpers, h = {a: history};";
 const baseline=stubs+'\n'+generate(runtime).code+'\nmodule.exports = '+generate(t.objectExpression(selected)).code+';\n';
 await fs.writeFile(path.join(home,'tests/fixtures/models',target+'-session.cjs'),baseline);
 ast.program.body.unshift(...parse('const sessionEffects = require("./sessionEffects.js");').program.body);
 await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
}
