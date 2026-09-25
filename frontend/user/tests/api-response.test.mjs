import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadApiTypes() {
  const source = await fs.readFile(new URL('../src/types/apiContracts.ts', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports });
  return module.exports;
}

test('user API success guard preserves the inherited status-code contract', async () => {
  const { isSuccessfulResponse } = await loadApiTypes();
  assert.equal(isSuccessfulResponse({ code: 200, data: { id: 7 } }), true);
  assert.equal(isSuccessfulResponse({ code: 200 }), true);
  assert.equal(isSuccessfulResponse({ code: 422, data: { id: 7 } }), false);

  const modelDirectory = new URL('../src/models/', import.meta.url);
  for (const entry of await fs.readdir(modelDirectory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.ts')) continue;
    const source = await fs.readFile(new URL(entry.name, modelDirectory), 'utf8');
    assert.doesNotMatch(source, /response\.data!/, entry.name);
  }
});
