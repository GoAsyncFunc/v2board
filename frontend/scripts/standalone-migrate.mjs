// One-time migration. Normal build/dev never read the extraction workspace.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule;
const generate=generatorModule.default||generatorModule;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const home=path.join(root,'frontend');
const parser=code=>parse(code,{sourceType:'unambiguous',plugins:['jsx']});
for(const target of ['user','admin']){
 const base=path.join(home,target);
 try{await fs.access(path.join(base,'src/main.js'));throw Error('Already migrated; refusing to overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
 const index=JSON.parse(await fs.readFile(path.join(root,'recovered-ui',target,'index.json'),'utf8'));
 const business=JSON.parse(await fs.readFile(path.join(base,'modules.json'),'utf8'));
 const mapping=new Map(business.map(x=>[x.id,x.file]));
 const named={'i4x8':'app/Router.jsx','xg5P':'app/store.js','KyW6':'app/bootstrap.js','RFCh':'app/history.js'};
 for(const entry of index)if(!mapping.has(entry.id))mapping.set(entry.id,named[entry.id]||`vendor/modules/${Buffer.from(entry.id).toString('hex')}.js`);
 const relative=(from,to)=>{let x=path.relative(path.dirname(from),to).replaceAll(path.sep,'/');return x.startsWith('.')?x:'./'+x;};
 const dependencies=[];
 for(const entry of index){
  const file=mapping.get(entry.id), businessEntry=business.find(x=>x.id===entry.id);
  const output=path.join(base,'src',file);
  await fs.mkdir(path.dirname(output),{recursive:true});
  if(['q1tI','viRO','i8i4','yl30'].includes(entry.id)){
   await fs.writeFile(output,`// The application uses one npm React instance.\nmodule.exports = require('${['q1tI','viRO'].includes(entry.id)?'react':'react-dom'}');\n`);continue;
  }
  let ast,requireName='requireModule',moduleName='legacyModule',exportsName='legacyExports';
  if(businessEntry){
   ast=parser(await fs.readFile(output,'utf8'));
   ast.program.body=ast.program.body.filter(node=>!(t.isImportDeclaration(node)&&node.source.value==='@legacy/runtime')&&!t.isExportDeclaration(node)&&!(t.isVariableDeclaration(node)&&node.declarations.some(d=>['requireModule','legacyModule','legacyExports'].includes(d.id.name))));
  }else{
   ast=parser('('+await fs.readFile(path.join(root,'recovered-ui',target,entry.file),'utf8')+')');
   const fn=ast.program.body[0].expression;
   [moduleName,exportsName,requireName]=fn.params.map(p=>p.name);
   let fnPath;
   traverse(ast,{FunctionExpression(p){if(!fnPath)fnPath=p;}});
   if(moduleName)fnPath.scope.rename(moduleName,'legacyModule');
   if(exportsName)fnPath.scope.rename(exportsName,'legacyExports');
   if(requireName)fnPath.scope.rename(requireName,'requireModule');
   ast=t.file(t.program(fn.body.body));
  }
  const helpers=new Set();
  traverse(ast,{
   CallExpression(p){
    if(!t.isIdentifier(p.node.callee,{name:'requireModule'})||p.scope.getBinding('requireModule'))return;
    const arg=p.node.arguments[0];
    if(!t.isStringLiteral(arg)&&!t.isNumericLiteral(arg))throw Error(`Dynamic module load in ${target}/${file}`);
    const dep=String(arg.value);if(!mapping.has(dep))throw Error(`Missing module ${dep} in ${file}`);
    dependencies.push({from:file,to:mapping.get(dep)});
    p.replaceWith(t.callExpression(t.identifier('require'),[t.stringLiteral(relative(file,mapping.get(dep)))]));
   },
   MemberExpression(p){
    if(!t.isIdentifier(p.node.object,{name:'requireModule'})||p.scope.getBinding('requireModule'))return;
    const key=p.node.computed?p.node.property.value:p.node.property.name;
    const names={n:'interopDefault',d:'defineExport',r:'markEsModule',o:'hasOwn',t:'namespaceObject',p:'assetBase'};
    if(key==='m'){p.replaceWith(t.objectExpression([]));return;}
    if(!names[key])throw Error(`Unsupported helper ${key} in ${file}`);
    helpers.add(names[key]);p.replaceWith(t.identifier(names[key]));
   }
  });
  const prelude=parser('let legacyModule = module, legacyExports = exports;').program.body;
  if(helpers.size)prelude.push(...parser(`const {${[...helpers].join(',')}} = require(${JSON.stringify(relative(file,'app/moduleInterop.js'))});`).program.body);
  ast.program.body.unshift(...prelude);
  await fs.writeFile(output,generate(ast,{comments:true,jsescOption:{minimal:true}}).code+'\n');
 }
 await fs.writeFile(path.join(base,'dependency-map.json'),JSON.stringify(dependencies,null,2));
 await fs.writeFile(path.join(base,'src/main.js'),'// Entry compiled from source by esbuild. No old Webpack bootstrap or module registry.\nrequire("./app/bootstrap.js");\n');
 const relativeAssets=target==='user'?'theme/default/assets':'assets/admin';
 const assets=path.join(base,'public',relativeAssets);await fs.mkdir(assets,{recursive:true});
 await fs.cp(path.join(root,'public',relativeAssets),assets,{recursive:true,filter:source=>!['umi.js','components.async.js','vendors.async.js'].includes(path.basename(source))});
 let html=await fs.readFile(path.join(root,'recovered-ui/dist',target,'index.html'),'utf8');
 html=html.replace(/<script src="[^"]*\/(?:umi|components\.async|vendors\.async)\.js"><\/script>\n?/g,'');
 html=html.replace('</body>','<script src="/app.js"></script>\n</body>');
 await fs.writeFile(path.join(base,'index.html'),html);
 await fs.copyFile(path.join(root,'recovered-ui/dist',target,'settings.js'),path.join(base,'public/settings.js'));
 console.log(target,': static dependencies written; original business pages preserved');
}
