import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as babelParse } from '@babel/parser';
const parse = (code) => babelParse(code, { sourceType: 'module', allowUndeclaredExports: true });
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse = traverseModule.default || traverseModule;
const generate = generatorModule.default || generatorModule;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const home = path.join(root, 'frontend');
for (const target of ['user', 'admin']) {
 const dest = path.join(home,target,'src');
 try { await fs.access(dest); throw Error(`${dest} exists; refusing to overwrite edits`); } catch(e) { if(e.code !== 'ENOENT') throw e; }
 const index = JSON.parse(await fs.readFile(path.join(root,'recovered-ui',target,'index.json'),'utf8'));
 const sources = new Map();
 for(const entry of index) sources.set(entry.id,{...entry, code:await fs.readFile(path.join(root,'recovered-ui',target,entry.file),'utf8')});
 const routes=[];
 const routeAst=parse('('+sources.get('i4x8').code+')');
 traverse(routeAst,{ObjectExpression(p){
  const props=p.node.properties;
  const route=props.find(x=>x.key?.name==='path');
  const comp=props.find(x=>x.key?.name==='component');
  if(t.isStringLiteral(route?.value) && t.isMemberExpression(comp?.value) && t.isCallExpression(comp.value.object)) {
   const id=comp.value.object.arguments[0]?.value;
   if(sources.has(id)) routes.push({path:route.value.value,id});
  }
 }});
 const chosen=new Map();
 for(const route of routes) {
  const name=route.path==='/'?'Index':route.path.split('/').filter(Boolean).map(x=>x.startsWith(':')?'Detail':x[0].toUpperCase()+x.slice(1)).join('');
  chosen.set(route.id,`pages/${name}.jsx`);route.file=chosen.get(route.id);
 }
 const modelBootstrap=sources.get('xg5P')?.code || '';
 for(const match of modelBootstrap.matchAll(/namespace:\s*"([\w-]+)"\s*\},\s*n\("([^"]+)"\)\.default/g)) {
  if(sources.has(match[2]))chosen.set(match[2],`models/${match[1]}.js`);
 }
 for(const [id,file] of Object.entries(target==='user'?{'L12J':'layouts/MainLayout.jsx','t3Un':'services/request.js','TEnU':'components/LanguageSelector.jsx'}:{'Bl7J':'layouts/MainLayout.jsx','t3Un':'services/request.js'}))if(sources.has(id))chosen.set(id,file);
 // Include directly referenced UI components; third-party packages stay in the compatibility runtime.
 let changed=true;
 while(changed){changed=false;for(const id of [...chosen.keys()]) {
  for(const m of sources.get(id).code.matchAll(/\bn\("([^"]+)"\)/g)) {
   const dep=sources.get(m[1]);
   if(dep && !chosen.has(dep.id) && dep.bundle==='umi.js' && dep.code.includes('.createElement(') && /(?:v2board-|block-content|nav-main|form-control)/.test(dep.code)) {
    chosen.set(dep.id,`components/Recovered_${Buffer.from(dep.id).toString('hex')}.jsx`);changed=true;
   }
  }
 }}
 const manifest=[];
 for(const [id,file] of chosen) {
  const original=sources.get(id);
  const ast=parse('('+original.code+')');
  let fnPath;
  traverse(ast,{FunctionExpression(p){if(!fnPath)fnPath=p;}});
  const names=['legacyModule','legacyExports','requireModule'];
  fnPath.node.params.forEach((p,i)=>{if(t.isIdentifier(p))fnPath.scope.rename(p.name,names[i]);});
  const reactAliases=new Set();
  traverse(ast,{CallExpression(p){const c=p.node.callee;if(t.isMemberExpression(c)&&c.property.name==='createElement')if (generate(c.object).code !== 'document') reactAliases.add(generate(c.object).code);}});
  // Convert React.createElement bottom-up. Spread config retains exact runtime prop/key/ref semantics.
  traverse(ast,{CallExpression:{exit(p){
   const n=p.node,c=n.callee;
   if(!t.isMemberExpression(c)||c.property.name!=='createElement'||!reactAliases.has(generate(c.object).code)||n.arguments.some(t.isSpreadElement))return;
   const [tag,props,...children]=n.arguments;
   let name;
   if(t.isStringLiteral(tag)&&/^[a-z][\w-]*$/.test(tag.value))name=t.jsxIdentifier(tag.value);
   else if(t.isIdentifier(tag)&&/^[A-Z]/.test(tag.name))name=t.jsxIdentifier(tag.name);
   else return; // Complex component expressions remain valid React calls; do not change evaluation order.
   const attrs=(!props||t.isNullLiteral(props))?[]:[t.jsxSpreadAttribute(props)];
   p.replaceWith(t.jsxElement(t.jsxOpeningElement(name,attrs,false),t.jsxClosingElement(name),children.map(x=>t.isJSXElement(x)?x:t.jsxExpressionContainer(x)),false));
  }}});
  const body=fnPath.node.body.body;
  // JSX always uses the exact same bundled React instance, not a second installed copy.
  const prelude=parse('import { requireModule as runtimeRequire, legacyExports as runtimeExports, legacyModule as runtimeModule } from "@legacy/runtime";\nlet requireModule = runtimeRequire, legacyExports = runtimeExports, legacyModule = runtimeModule;\nconst React = requireModule("q1tI");\n').program.body;
  const program=t.program([...prelude,...body,...parse('export { legacyExports as webpackExports };\nexport default legacyExports.default;').program.body]);
  const text='// Recovered business source. Legacy dependencies are explicitly bridged; see frontend/README.md.\n'+generate(program,{comments:true,jsescOption:{minimal:true}}).code+'\n';
  const output=path.join(dest,file);await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,text);
  manifest.push({id,file,bundle:original.bundle,jsxElements:(text.match(/<\w/g)||[]).length});
 }
 await fs.writeFile(path.join(home,target,'modules.json'),JSON.stringify(manifest,null,2));
 await fs.writeFile(path.join(home,target,'routes.json'),JSON.stringify(routes,null,2));
 console.log(target, routes.length,'routes',manifest.length,'source modules');
}
