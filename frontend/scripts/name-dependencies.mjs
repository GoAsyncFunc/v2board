import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const common={'2f4d4b6a':'reactRedux','48673072':'dva','59326651':'i18n','3361346d':'routerHistory','43745851':'Icon','6b4c5856':'Modal','50776563':'iconStyles','50417262':'Divider','54655277':'notification'};
async function files(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await files(p));else if(/\.(js|jsx)$/.test(p))out.push(p);}return out;}
for(const target of ['user','admin']){
 const base=path.join(home,target,'src');
 const names={...common,'7957676f':'siteHelpers',...(target==='user'?{'7449346c':'localeSettings'}:{'32306e55':'siteSettings'})};
 const moves=new Map(Object.entries(names).map(([id,name])=>[path.join(base,'vendor/modules',id+'.js'),path.join(base,'vendor',name+'.js')]));
 const paths=await files(base);
 for(const oldFile of paths){
  const newFile=moves.get(oldFile)||oldFile;
  const ast=parse(await fs.readFile(oldFile,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
  let changed=oldFile!==newFile;
  traverse(ast,{StringLiteral(p){
   const parent=p.parent;
   const isPath=(parent.type==='CallExpression'&&parent.callee.name==='require'&&parent.arguments[0]===p.node)||parent.type==='ImportDeclaration'||parent.type==='ExportNamedDeclaration';
   if(!isPath||!p.node.value.startsWith('.'))return;
   const original=path.resolve(path.dirname(oldFile),p.node.value);
   const destination=moves.get(original)||original;
   const rel=path.relative(path.dirname(newFile),destination).replaceAll(path.sep,'/');
   const value=rel.startsWith('.')?rel:'./'+rel;
   if(value!==p.node.value){p.node.value=value;delete p.node.extra;changed=true;}
  }});
  if(changed){await fs.mkdir(path.dirname(newFile),{recursive:true});await fs.writeFile(newFile,generate(ast,{jsescOption:{minimal:true}}).code+'\n');}
 }
 for(const [oldFile] of moves)await fs.unlink(oldFile);
 console.log(target,': named',moves.size,'dependency sources');
}
