import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

const formatMessage = ({ id }) => id;
const moment = value => ({ format: pattern => `${value}:${pattern}` });
const deps = { formatMessage, moment };

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-invite-display.cjs' : '../src/components/InviteDisplayColumns.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, {
    module, exports: module.exports, require(id) {
      if (id.includes('77642f52')) return moment;
      if (id.includes('i18n')) return { formatMessage };
        throw Error(id);
    },
  });
  return original
    ? module.exports(deps)
    : { codeDate: module.exports.createInviteCodeDateColumn(), commission: module.exports.createReadonlyCommissionColumns() };
}

for (const field of ['created_at']) for (const time of [0, null, undefined, 1700000000, -999999999, Infinity, NaN, '1700000000', 'invalid']) {
  test(`invite ${field} ${String(time)}`, async () => {
    const results = [];
    for (const original of [true, false]) {
      const columns = (await load(original)).commission;
      const column = columns.find(c => c.dataIndex === field);
      let value, error;
      try { value = column.render(time); } catch (e) { error = e.name; }
      results.push({ value, error });
    }
    assert.deepEqual(results[1], results[0]);
  });
}

test('invite code date column matches commission created_at', async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).codeDate;
    results.push({ align: column.align, title: column.title, value: column.render(1700000000) });
  }
  assert.deepEqual(results[1], results[0]);
});

for (const amount of [0, 1, 100, 12345, -100, 99, 101, null, undefined, '12345', 1.5, Infinity, NaN]) test(`commission amount ${String(amount)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).commission.find(c => c.dataIndex === 'get_amount');
    let value, error;
    try { value = column.render(amount, {}); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

const normalize = value => (Array.isArray(value) ? Array.from(value, normalize) : (typeof value === 'function' ? '[fn]' : (value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalize(v)])) : value)));

const records = [{ created_at: 1700000000, get_amount: 12345 }, { created_at: null, get_amount: 0 }, {}, { created_at: '1700000000', get_amount: '5000' }];
for (const [index, record] of records.entries()) test(`invite readonly display ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const { codeDate, commission } = await load(original);
    const values = [codeDate, ...commission].map(column => column.render ? normalize(column.render(record[column.dataIndex], record)) : record[column.dataIndex]);
    results.push(normalize({ codeDate, commission, values }));
  }
  assert.deepEqual(results[1], results[0]);
});

test('invite titles preserve formatMessage output', async () => {
  const results = [];
  for (const original of [true, false]) {
    const { codeDate, commission } = await load(original);
    results.push([...[...commission].map(c => c.title), codeDate.title]);
  }
  assert.deepEqual(results[1], results[0]);
  assert.deepEqual(results[1], ['发放时间', '佣金', '创建时间']);
});
