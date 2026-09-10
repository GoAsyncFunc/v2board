// One-time source-preserving cleanup; do not rerun on edited source.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../user/src/pages/OrderDetail.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});
const cls=ast.program.body.find(t.isClassDeclaration);cls.id=t.identifier('OrderDetailPage');cls.superClass=t.memberExpression(t.identifier('React'),t.identifier('Component'));
const tree=t.file(t.program([cls]));
const aliases={'f.a':'React','p["a"]':'MainLayout','r["a"]':'Icon','o["a"]':'Radio','i["a"]':'Modal','a["a"]':'Result','u["a"]':'message','h["a"]':'settings','b["formatMessage"]':'formatMessage','x()':'moment','v.a':'QRCode','O["a"]':'Spin','E["router"]':'router'};
traverse(tree,{MemberExpression:{exit(p){const text=generate(p.node).code;if(aliases[text])p.replaceWith(t.identifier(aliases[text]));}},CallExpression:{exit(p){const n=p.node;
 if(n.callee.name==='x'&&!p.scope.getBinding('x')){p.replaceWith(t.identifier('moment'));return;}
 if(n.callee.name==='c'&&!p.scope.getBinding('c')){p.replaceWith(t.memberExpression(t.identifier('Object'),t.identifier('assign')));return;}
 if(n.callee.name==='Object'&&n.arguments.length===1&&t.isIdentifier(n.arguments[0])){p.replaceWith(n.arguments[0]);return;}
 if(!t.isMemberExpression(n.callee)||n.callee.object.name!=='React'||n.callee.property.name!=='createElement')return;
 const [tag,props,...children]=n.arguments;
 const name=t.isIdentifier(tag)?t.jsxIdentifier(tag.name):tag.object?.name==='React'&&tag.property.name==='Fragment'?t.jsxMemberExpression(t.jsxIdentifier('React'),t.jsxIdentifier('Fragment')):null;
 if(!name)return;
 const attrs=props&&!t.isNullLiteral(props)?[t.jsxSpreadAttribute(props)]:[];
 p.replaceWith(t.jsxElement(t.jsxOpeningElement(name,attrs,false),t.jsxClosingElement(name),children.map(c=>t.isJSXElement(c)?c:t.jsxExpressionContainer(c)),false));
}},ReferencedIdentifier(p){if(p.node.name==='C'&&!p.scope.getBinding('C'))p.replaceWith(t.isJSXIdentifier(p.node)?t.jsxIdentifier('StripeForm'):t.identifier('StripeForm'));}});
traverse(tree,{ClassMethod(p){const names={render:{e:'orderState',t:'order',n:'selectedMethod',s:'methods',u:'qrVisible',l:'payUrl',d:'checkoutLoading',m:'detailsLoading',y:'cancelLoading',g:'config',w:'stripe',E:'selectedPayment'},checkout:{e:'orderState',t:'methodId',n:'methods',r:'stripe',o:'payment'},changePaymentMethod:{e:'methodId',t:'orderState',n:'methods',r:'order',o:'payment'}};
 for(const [from,to]of Object.entries(names[p.node.key.name]||{}))p.scope.rename(from,to);
},StringLiteral(p){delete p.node.extra;}});
const imports=`import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { a as Icon } from '../vendor/Icon.js';
import { a as Radio } from '../vendor/modules/39794836.js';
import { a as Modal } from '../vendor/Modal.js';
import { a as Result } from '../vendor/modules/4d6f5257.js';
import { a as message } from '../vendor/modules/74737172.js';
import { a as settings } from '../vendor/localeSettings.js';
import QRCode from '../vendor/modules/44314466.js';
import loadable from '../vendor/modules/5642306f.js';
import { formatMessage } from '../vendor/i18n.js';
import moment from '../vendor/modules/77642f52.js';
import { a as Spin } from '../vendor/modules/76333265.js';
import { router } from '../vendor/modules/4172412b.js';
import '../vendor/iconStyles.js';
import '../vendor/modules/374b616b.js';
import '../vendor/modules/32717463.js';
import '../vendor/modules/4a2b2f76.js';
import '../vendor/modules/6d69595a.js';
import '../vendor/modules/79786e6e.js';
const StripeForm = loadable({loader: () => import('../vendor/modules/6d623341.js')});
let S; // Original shared polling timer; lifecycle behavior is tested before changing it.
`;
await fs.writeFile(file,imports+'\nexport '+generate(cls,{jsescOption:{minimal:true}}).code+'\nexport default connect(({order,comm})=>({order,comm}))(OrderDetailPage);\n');
