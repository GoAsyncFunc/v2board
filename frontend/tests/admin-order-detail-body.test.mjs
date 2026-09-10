import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {transform} from 'esbuild';
const React={createElement:(type,props,...children)=>({type,props:props||{},children})};
const settings={periodText:{month_price:'月付'},orderStatusText:['待支付','开通中','已取消','已完成','已折抵'],commissionStatusText:['待确认','有效','已发放']};
const moment=value=>({format:format=>`${value}:${format}`});
async function render(original,data){
 const trace=[],module={exports:{}};
 const file=new URL(original?'./fixtures/pages/admin-order-detail-body.cjs':'../admin/src/components/OrderDetailBody.jsx',import.meta.url);
 const text=await fs.readFile(file,'utf8');vm.runInNewContext((await transform(text,{loader:'jsx',format:'cjs'})).code,{React,module,exports:module.exports,require(id){if(id==='react')return React;if(id.includes('7449346c'))return {a:settings};if(id.includes('77642f52'))return moment;for(const [key,label]of [['424d7252','Row'],['6b504b48','Col'],['Divider','Divider'],['3353372b','Tooltip'],['Icon','Icon']])if(id.includes(key))return {a:label};throw Error(id);}});
 const onUserFilter=(...args)=>trace.push(args);
 let tree,error;
 try{tree=original?module.exports.call({state:{order:data.order,user:data.user,invite_user:data.inviteUser},props:{plan:{plans:data.plans}},jumpUserFilter:onUserFilter},{a:React},{a:'Row'},{a:'Col'},{a:settings},()=>moment,{a:'Divider'},{a:'Tooltip'},{a:'Icon'}):module.exports.default({...data,onUserFilter});}catch(e){error=e.name;}
 function click(node){if(Array.isArray(node))return node.forEach(click);if(!node||typeof node!=='object')return;if(node.type==='a')node.props.onClick();click(node.children);}
 click(tree);return JSON.parse(JSON.stringify({tree,error,trace},(key,value)=>typeof value==='function'?'handler':value));
}
const base={user:{email:'fixture@example.com'},order:{trade_no:'TEST',period:'month_price',status:3,plan_id:1,total_amount:12345,balance_amount:100,discount_amount:200,refund_amount:0,surplus_amount:30,created_at:1700000000,updated_at:1700000010,invite_user_id:2,commission_balance:100,actual_commission_balance:50,commission_status:2},inviteUser:{email:'invite@example.com'},plans:[{id:1,name:'Fixture Plan'}]};
const cases=[base,{...base,user:{}},{...base,user:null},{...base,order:{}},{...base,order:null},{...base,plans:[]},{...base,plans:null}];
for(const status of [0,1,2,3,4,99])for(const value of [null,-999999999,0])cases.push({...base,order:{...base.order,status,total_amount:value,created_at:value,updated_at:undefined,actual_commission_balance:0}});
for(const amount of [undefined,NaN,Infinity,-Infinity,'0','123.45','invalid'])cases.push({...base,order:{...base.order,total_amount:amount,commission_balance:amount,actual_commission_balance:amount}});
cases.push({...base,user:{},order:null,plans:null,inviteUser:null});
cases.push({...base,inviteUser:null});
cases.push({...base,inviteUser:null,order:{...base.order,status:2}});
cases.push({...base,plans:[{id:'1',name:'String ID must not match'}]});
for(const [index,data]of cases.entries())test(`admin detail body parity ${index+1}`,async()=>assert.deepEqual(await render(false,data),await render(true,data)));
