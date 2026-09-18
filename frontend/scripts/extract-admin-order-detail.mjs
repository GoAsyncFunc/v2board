// One-time readonly modal body extraction; controller/actions stay in Order.jsx.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../admin/src/pages/Order.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'unambiguous',plugins:['jsx']});let original;
traverse(ast,{ConditionalExpression(p){if(generate(p.node.test).code==='this.state.user.email'){
 original=t.cloneNode(p.node,true);
 p.replaceWith(parse('<OrderDetailBody order={this.state.order} user={this.state.user} inviteUser={this.state.invite_user} plans={this.props.plan.plans} onUserFilter={(...args) => this.jumpUserFilter(...args)} />',{plugins:['jsx']}).program.body[0].expression);p.stop();
}}});
if(!original)throw Error('Missing body');
await fs.writeFile(new URL('../tests/fixtures/pages/admin-order-detail-body.cjs',import.meta.url),'// Unmodified original render expression; injected dependencies, no API calls.\nmodule.exports = function(g,E,S,y,w,_,f,d){const React=g.a;var e,t=this.props.plan.plans,n={marginBottom:0};return '+generate(original).code+';};\n');
const tree=t.file(t.program([t.expressionStatement(t.cloneNode(original,true))]));
const aliases={'this.state.order':'order','this.state.user':'user','this.state.invite_user':'inviteUser','this.jumpUserFilter':'onUserFilter','g.a':'React','E["a"]':'Row','S["a"]':'Col','y["a"]':'settings','_["a"]':'Divider','f["a"]':'Tooltip','d["a"]':'Icon'};
traverse(tree,{MemberExpression:{exit(p){const text=generate(p.node).code;if(aliases[text])p.replaceWith(t.identifier(aliases[text]));}},CallExpression:{exit(p){if(p.node.callee.name==='w'){p.replaceWith(t.identifier('moment'));return;}
 const n=p.node;if(!t.isMemberExpression(n.callee)||n.callee.object.name!=='React'||n.callee.property.name!=='createElement')return;
 const [tag,props,...children]=n.arguments;if(!t.isIdentifier(tag))return;const name=t.jsxIdentifier(tag.name);
 p.replaceWith(t.jsxElement(t.jsxOpeningElement(name,props&&!t.isNullLiteral(props)?[t.jsxSpreadAttribute(props)]:[],false),t.jsxClosingElement(name),children.map(c=>t.isJSXElement(c)?c:t.jsxExpressionContainer(c)),false));
}}});
const imports=`import React from 'react';\nimport {a as Row} from '../vendor/modules/antdRow.js';\nimport {a as Col} from '../vendor/modules/antdCol.js';\nimport {a as settings} from '../vendor/modules/7449346c.js';\nimport moment from '../vendor/modules/77642f52.js';\nimport {a as Divider} from '../vendor/Divider.js';\nimport {a as Tooltip} from '../vendor/modules/antdTooltip.js';\nimport {a as Icon} from '../vendor/Icon.js';\n`;
await fs.writeFile(new URL('../admin/src/components/OrderDetailBody.jsx',import.meta.url),imports+'export default function OrderDetailBody({order,user,inviteUser,plans,onUserFilter}) {var e;const t=plans,n={marginBottom:0};return '+generate(tree.program.body[0].expression,{jsescOption:{minimal:true}}).code+';}\n');
ast.program.body.unshift(...parse("const OrderDetailBody = require('../components/OrderDetailBody.jsx').default;").program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
