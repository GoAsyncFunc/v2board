// One-time structural extraction. Does not change polling/payment decisions.
import fs from 'node:fs/promises';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default||traverseModule,generate=generatorModule.default||generatorModule;
const file=new URL('../user/src/pages/OrderDetail.jsx',import.meta.url);
const ast=parse(await fs.readFile(file,'utf8'),{sourceType:'module',plugins:['jsx']});
let methods=0,qr=0;
const expr=s=>parse(s,{sourceType:'module',plugins:['jsx']}).program.body[0].expression;
traverse(ast,{JSXElement(p){
 if(p.node.openingElement.name.name==='div'&&p.node.children.some(c=>t.isJSXExpressionContainer(c)&&t.isCallExpression(c.expression)&&t.isMemberExpression(c.expression.callee)&&c.expression.callee.object.name==='methods')){
  p.replaceWith(expr('<PaymentMethods methods={methods} selectedMethod={selectedMethod} onSelect={id => this.changePaymentMethod(id)} />'));methods++;p.skip();
 }
 if(p.node.openingElement.name.name==='Modal'){
  p.replaceWith(expr('<PaymentQrModal visible={qrVisible} payUrl={payUrl} onCancel={() => this.props.dispatch({type:"order/setState",payload:{qrcodeModalVisible:false,payUrl:undefined}})} />'));qr++;p.skip();
 }
}});
if(methods!==1||qr!==1)throw Error(`Unexpected extraction: ${methods}/${qr}`);
ast.program.body=ast.program.body.filter(n=>!(t.isImportDeclaration(n)&&(n.source.value.includes('44314466')||n.source.value.includes('antdRadio'))));
ast.program.body.unshift(...parse("import PaymentMethods from '../components/checkout/PaymentMethods.jsx';import PaymentQrModal from '../components/checkout/PaymentQrModal.jsx';",{sourceType:'module'}).program.body);
await fs.writeFile(file,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
