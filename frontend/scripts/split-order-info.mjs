// One-time structural extraction; leaves business decisions unchanged.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../user/src/pages/OrderDetail.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'module',plugins:['jsx']});
const extracted={};
traverse(ast,{JSXElement(p){
 const attr=p.node.openingElement.attributes.find(a=>a.name?.name==='className');
 if((attr?.value?.expression?.value||attr?.value?.value)!=='block block-rounded')return;
 const text=generate(p.node).code;
 const name=text.includes('商品信息')?'ProductInfo':text.includes('订单信息')?'OrderInfo':null;
 if(!name)return;
 const node=t.cloneNode(p.node,true);const tree=t.file(t.program([t.expressionStatement(node)]));
 traverse(tree,{MemberExpression(q){if(t.isMemberExpression(q.node.object)&&t.isThisExpression(q.node.object.object)&&q.node.object.property.name==='props'&&q.node.property.name==='dispatch')q.replaceWith(t.identifier('dispatch'));}});
 extracted[name]=generate(node,{jsescOption:{minimal:true}}).code;
 p.replaceWith(parse(`<${name} order={order} config={config} cancelLoading={cancelLoading} dispatch={this.props.dispatch} />`,{plugins:['jsx']}).program.body[0].expression);p.skip();
}});
for(const name of ['ProductInfo','OrderInfo']){
 if(!extracted[name])throw Error('Missing '+name);
 const imports=`import React from 'react';\nimport {formatMessage} from '../../vendor/i18n.js';\nimport {a as settings} from '../../vendor/localeSettings.js';\nimport moment from '../../vendor/modules/77642f52.js';\nimport {a as Modal} from '../../vendor/Modal.js';\nimport {a as Spin} from '../../vendor/modules/76333265.js';\n`;
 await fs.writeFile(new URL(`../user/src/components/checkout/${name}.jsx`,import.meta.url),imports+`export default function ${name}({order,config,cancelLoading,dispatch}) {return ${extracted[name]};}\n`);
 ast.program.body.unshift(...parse(`import ${name} from '../components/checkout/${name}.jsx';`,{sourceType:'module'}).program.body);
}
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
