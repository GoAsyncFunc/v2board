import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
import { loadDateTimeFormatter } from './helpers/load-date-time.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

const fixedNow = 1700000000000;
class FakeDate extends Date { constructor(...args) { super(...(args.length ? args : [fixedNow])); } }
const React = { createElement: (type, props, ...children) => ({ type: typeof type === 'function' ? (type.displayName || type.name) : type, props, children }) };
const Tooltip = function Tooltip() {};
Tooltip.displayName = 'Tooltip';
const Badge = function Badge() {};
Badge.displayName = 'Badge';
const moment = value => ({ format: pattern => `${value}:${pattern}` });
const deps = { createElement: React.createElement, Tooltip, Badge, moment };

async function load(original) {
  const module = { exports: {} };
  const dateTime = original ? null : await loadDateTimeFormatter(moment);
  const file = new URL(original ? './fixtures/pages/admin-user-display.cjs' : '../src/pages/user/components/UserDisplayColumns.tsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'tsx' })).code, {
    module, exports: module.exports, Date: FakeDate, require(id) {
      if (id === 'react') return React;
      if (id === 'antd/lib/tooltip') return Tooltip;
      if (id === 'antd/lib/badge') return Badge;
      if (id.includes('antdTooltip')) return { a: Tooltip };
      if (id.includes('antdBadge')) return { a: Badge };
      if (id.includes('utils/dateTime')) return dateTime;
      if (id === 'moment' || id.includes('77642f52')) return moment;
        throw Error(id);
    },
  });
  return original ? module.exports(deps) : module.exports.createReadonlyUserEmailColumn();
}

function normalize(value) {
  if (Array.isArray(value)) return Array.from(value, normalize);
  if (typeof value === 'function') return '[fn]';
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalize(entry)]));
  return value;
}

test('user email column shape is readonly', async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = await load(original);
    results.push({ dataIndex: column.dataIndex, key: column.key, title: column.title, hasSorter: 'sorter' in column, hasFilters: 'filters' in column });
  }
  assert.deepEqual(results[1], results[0]);
  assert.deepEqual(results[1], { dataIndex: 'email', key: 'email', title: '邮箱', hasSorter: false, hasFilters: false });
});

const boundary = fixedNow / 1000 - 600;
const values = [undefined, null, 0, 1, '1700000000', boundary - 1, boundary, boundary + 1, 1700000000, -1, NaN, Infinity];
for (const lastSeen of values) test(`user last-online ${String(lastSeen)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = await load(original);
    let value, error;
    try { value = normalize(column.render('fixture@example.com', { t: lastSeen })); } catch (e) { error = e.name; }
    results.push({ value, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('user online status uses a fixed clock deterministically', async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = await load(original);
    results.push([...values].map(lastSeen => column.render('e', { t: lastSeen }).children[0].props.status));
  }
  assert.deepEqual(results[1], results[0]);
});

const records = [{ email: 'online@example.com', t: 1700000000 }, { email: 'stale@example.com', t: 1600000000 }, { email: 'never@example.com' }, { email: null }, { email: undefined, t: null }];
for (const [index, record] of records.entries()) test(`user readonly display ${index + 1}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const column = await load(original);
    results.push(normalize({ column: { dataIndex: column.dataIndex, key: column.key, title: column.title }, render: column.render(record.email, record) }));
  }
  assert.deepEqual(results[1], results[0]);
});
