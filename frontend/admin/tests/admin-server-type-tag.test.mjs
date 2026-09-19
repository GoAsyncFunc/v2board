import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React={createElement:(type,props,...children)=>({type,props,children})};
async function load(original){
 const file=new URL(original?'./fixtures/pages/admin-server-type-tag.cjs':'../src/components/ServerTypeTag.tsx',import.meta.url),module={exports:{}};
 const text=await fs.readFile(file,'utf8');vm.runInNewContext(original?text:(await transform(text,{format:'cjs',loader:'tsx'})).code,{module,exports:module.exports,require(id){if(id==='react')return React;if(id==='antd/lib/tag')return 'Tag';if(id.includes('antdTag'))return {a:'Tag'};
        throw Error(id);}});
 return original?module.exports({a:React},{a:'Tag'}):module.exports.renderServerTypeTag;
}
for(const type of ['shadowsocks','vmess','trojan','hysteria','tuic','vless','anytls','v2node','unknown','VMESS',null,undefined,0])for(const label of ['Fixture',0,null])test(`server type tag ${type}/${label}`,async()=>{
 const a=await load(true),b=await load(false);assert.deepEqual(structuredClone(b(type,label)),structuredClone(a(type,label)));
});
