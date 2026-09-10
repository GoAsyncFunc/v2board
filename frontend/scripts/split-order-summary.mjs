// One-time structure-preserving extraction.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../user/src/pages/OrderDetail.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'module',plugins:['jsx']});
const expression=code=>parse(code,{sourceType:'module',plugins:['jsx']}).program.body[0].expression;
let summary,result;
traverse(ast,{ClassMethod(p){if(p.node.key.name==='getResultText'){result=t.cloneNode(p.node.body,true);p.node.body=t.blockStatement([t.returnStatement(t.callExpression(t.identifier('orderResultProps'),[t.identifier('e')]))]);}},JSXElement(p){
 const attr=p.node.openingElement.attributes.find(a=>a.name?.name==='className');
 const value=attr?.value?.expression?.value||attr?.value?.value;
 if(value==='col-md-4 col-sm-12'){
  summary=t.cloneNode(p.node,true);p.replaceWith(expression('<OrderPaymentSummary order={order} config={config} checkoutLoading={checkoutLoading} selectedPayment={selectedPayment} stripe={stripe} onCheckout={() => this.checkout()} />'));p.skip();
 }
 if(p.node.openingElement.name.name==='Result'){p.replaceWith(expression('<OrderStatusResult status={order.status} />'));p.skip();}
}});
if(!summary||!result)throw Error('Missing extraction target');
const tree=t.file(t.program([t.expressionStatement(summary)]));
traverse(tree,{CallExpression(p){if(t.isMemberExpression(p.node.callee)&&t.isThisExpression(p.node.callee.object)&&p.node.callee.property.name==='checkout')p.replaceWith(t.callExpression(t.identifier('onCheckout'),[]));}});
const dir=new URL('../user/src/components/checkout/',import.meta.url);
await fs.writeFile(new URL('OrderPaymentSummary.jsx',dir),`import React from 'react';\nimport { a as Icon } from '../../vendor/Icon.js';\nimport { a as settings } from '../../vendor/localeSettings.js';\nimport { formatMessage } from '../../vendor/i18n.js';\nexport default function OrderPaymentSummary({order,config,checkoutLoading,selectedPayment,stripe,onCheckout}) { return ${generate(summary,{jsescOption:{minimal:true}}).code}; }\n`);
await fs.writeFile(new URL('OrderStatusResult.jsx',dir),`import React from 'react';\nimport { a as Result } from '../../vendor/modules/4d6f5257.js';\nimport { formatMessage } from '../../vendor/i18n.js';\nimport { router } from '../../vendor/modules/4172412b.js';\nexport function orderResultProps(e) ${generate(result,{jsescOption:{minimal:true}}).code}\nexport default function OrderStatusResult({status}) { return <Result className="py-4" {...orderResultProps(status)} />; }\n`);
ast.program.body=ast.program.body.filter(n=>!(t.isImportDeclaration(n)&&n.source.value.includes('4d6f5257')));
ast.program.body.unshift(...parse("import OrderPaymentSummary from '../components/checkout/OrderPaymentSummary.jsx';import OrderStatusResult, {orderResultProps} from '../components/checkout/OrderStatusResult.jsx';",{sourceType:'module'}).program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
