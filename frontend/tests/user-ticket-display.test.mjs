import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = { createElement: (type, props, ...children) => ({ type: typeof type === 'function' ? (type.displayName || type.name) : type, props, children }) };
const Badge = function Badge() {};
Badge.displayName = 'Badge';
const formatMessage = ({ id }) => id;
const moment = value => ({ format: pattern => `${value}:${pattern}` });
const levels = ['低', '中', '高'];
const deps = { createElement: React.createElement, Badge, formatMessage, moment, levels };

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-ticket-display.cjs' : '../user/src/components/TicketReadonlyColumns.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, {
    module, exports: module.exports, require(id) {
      if (id === 'react') return React;
      if (id.includes('77642f52')) return moment;
      if (id.includes('antdBadge')) return { a: Badge };
      if (id.includes('i18n')) return { formatMessage };
      throw Error(id);
    },
  });
  return original ? module.exports(deps) : module.exports.createReadonlyTicketColumns(levels);
}
function normalize(value) {
  if (Array.isArray(value)) return Array.from(value, normalize);
  if (typeof value === 'function') return '[fn]';
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalize(entry)]));
  return value;
}

for (const level of [0, 1, 2, 99, '1', -1, null, undefined, Symbol('level')]) test(`ticket level coercion ${String(level)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).find(c => c.key === 'level');
    let value, error;
    try { value = column.render(level); } catch (e) { error = e.name; }
    results.push({ value: typeof value === 'symbol' ? String(value) : value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

for (const status of [0, 1, 2, null, undefined]) for (const reply of [0, 1, 2, '1', '', null]) test(`ticket reply ${status}/${reply}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = (await load(original)).find(c => c.key === 'reply_status');
    const record = { status };
    let value, error;
    try { value = normalize(column.render(reply, record)); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

for (const field of ['created_at', 'updated_at']) for (const time of [0, null, undefined, 1700000000, -999999999, Infinity, NaN, '1700000000', 'invalid']) {
  test(`ticket ${field} ${String(time)}`, async () => {
    const results = [];
    for (const original of [true, false]) {
      const column = (await load(original)).find(c => c.key === field);
      let value, error;
      try { value = column.render(time); } catch (e) { error = e.name; }
      results.push({ value, error });
    }
    assert.deepEqual(results[1], results[0]);
  });
}

for (const field of ['created_at', 'updated_at']) test(`ticket date coercion trace ${field}`, async () => {
  const results = [];
  const trace = [];
  const value = { [Symbol.toPrimitive](hint) { trace.push(hint); return 1700000000; } };
  for (const original of [true, false]) {
    const column = (await load(original)).find(c => c.key === field);
    results.push(column.render(value));
  }
  assert.deepEqual(results[1], results[0]);
});

const records = [{ id: 7, subject: 'Fixture 工单', level: 0, reply_status: 1, status: 0, created_at: 1700000000, updated_at: 1700000100 }, { id: 8, level: 1, status: 1 }, { id: 9, level: 2, status: 2, reply_status: 0 }, { id: 10, subject: '长标题'.repeat(50), level: 99, status: 1 }, {}];
for (const [index, record] of records.entries()) test(`ticket readonly display ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const columns = await load(original);
    const values = columns.map(column => column.render ? normalize(column.render(record[column.dataIndex], record)) : record[column.dataIndex]);
    results.push(normalize({ columns, values }));
  }
  assert.deepEqual(results[1], results[0]);
});

test('ticket titles preserve formatMessage output', async () => {
  const results = [];
  for (const original of [true, false]) results.push([...(await load(original))].map(column => column.title));
  assert.deepEqual(results[1], results[0]);
  assert.deepEqual(results[1], ['#', '主题', '工单级别', '工单状态', '创建时间', '最后回复']);
});
