import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/types/api.ts', import.meta.url), 'utf8');
const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;

test('admin API success guard narrows only recovered 200 responses', () => {
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports });
  assert.equal(module.exports.isSuccessfulResponse({ code: 200, data: { id: 7 } }), true);
  assert.equal(module.exports.isSuccessfulResponse({ code: 422, data: { id: 7 } }), false);
});
