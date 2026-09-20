import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const source=await fs.readFile(new URL('../src/services/download.ts',import.meta.url),'utf8');
const code=(await transform(source,{format:'cjs',loader:'ts'})).code;
for(const fail of [false,true])test(`CSV uses DOM and releases URL; click failure=${fail}`,()=>{
 const trace=[],link={style:{},click(){trace.push('click');if(fail)throw Error('click failed');}};
 const module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,Blob,window:{URL:{createObjectURL(blob){assert.equal(blob.size,3);return 'blob:fixture';},revokeObjectURL(url){trace.push(url);}}},document:{createElement(tag){assert.equal(tag,'a');return link;}}});
 if(fail)assert.throws(()=>module.exports.downloadCsv('csv','fixture.csv'),/click failed/);
 else module.exports.downloadCsv('csv','fixture.csv');
 assert.equal(link.download,'fixture.csv');assert.equal(link.href,'blob:fixture');assert.deepEqual(trace,['click','blob:fixture']);
});
