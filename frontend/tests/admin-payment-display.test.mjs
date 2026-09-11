import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
async function load(original) {
  const file = new URL(original ? './fixtures/pages/admin-payment-display.cjs' : '../admin/src/components/PaymentDisplayColumns.jsx', import.meta.url);
  const module = { exports: {} }, source = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? source : (await transform(source, { format: 'cjs' })).code, { module, exports: module.exports });
  return original ? module.exports() : Object.values(module.exports.createReadonlyPaymentColumns());
}
for (const [index, value] of ['Fixture', '', null, undefined, 0, '<b>literal</b>', '名称'.repeat(100)].entries()) test(`payment readonly fields ${index}`, async () => {
  const before = await load(true), after = await load(false);
  assert.deepEqual(structuredClone(after), structuredClone(before));
  const record = { name: value, payment: value };
  assert.deepEqual(Array.from(after, c => record[c.dataIndex]), Array.from(before, c => record[c.dataIndex]));
  assert.ok(after.every(c => !('render' in c) && !('sorter' in c) && !('filters' in c)));
});
