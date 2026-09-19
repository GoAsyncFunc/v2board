import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original){
 const module={exports:{}};const file=new URL(original?'./fixtures/pages/admin-payment-notify.cjs':'../src/components/PaymentNotifyColumn.tsx',import.meta.url);
 vm.runInNewContext((await transform(await fs.readFile(file,'utf8'),{format:'cjs',loader:'tsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id==='antd/lib/tooltip')return 'Tooltip';if(id==='antd/lib/icon')return 'Icon';if(id.includes('antdTooltip'))return {a:'Tooltip'};if(id.includes('Icon'))return {a:'Icon',Icon:'Icon'};
        throw Error(id);}});
 return original?module.exports({a:React},{a:'Tooltip'},{a:'Icon'}):module.exports.createPaymentNotifyColumn();
}
for(const [index,value]of ['https://invalid.test/notify','',null,undefined,0,'<b>literal</b>'].entries())test(`payment notify readonly ${index}`,async()=>{
 const before=await load(true),after=await load(false);assert.deepEqual(structuredClone(after),structuredClone(before));
 assert.ok(!('render' in after)&&!('sorter' in after)&&!('filters' in after));
 assert.equal({notify_url:value}[after.dataIndex],{notify_url:value}[before.dataIndex]);
});
