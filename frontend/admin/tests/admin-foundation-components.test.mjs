import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
  Component: class {
    constructor(props) { this.props = props; }
    setState(update, callback) {
      const next = typeof update === 'function' ? update(this.state, this.props) : update;
      this.state = { ...this.state, ...next };
      if (callback) callback();
    }
  },
  Fragment: 'Fragment',
  cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
  createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

async function load(relativePath, requireModule, globals = {}) {
  const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      return requireModule(id);
    },
    ...globals,
  });
  return module.exports;
}

test('LoadingContainer preserves the recovered spinner structure', async () => {
  const component = await load('../src/components/LoadingContainer.tsx', id => {
    if (id === 'antd/lib/spin') return 'Spin';
    throw new Error(id);
  });
  const child = { type: 'content' };
  const tree = component.default({ loading: true, children: child });
  assert.equal(tree.type, 'Spin');
  assert.equal(tree.props.spinning, true);
  assert.equal(tree.props.indicator.type, 'div');
  assert.equal(tree.props.indicator.props.className, 'spinner-grow text-primary');
  assert.equal(tree.children[0], child);
});

test('ContextMenuTable keeps row callbacks and menu positioning behavior', async () => {
  const menu = { style: { display: 'none', top: '', left: '' } };
  const records = [];
  const component = await load('../src/components/ContextMenuTable.tsx', id => {
    if (id === 'antd/lib/table') return 'Table';
    throw new Error(id);
  }, {
    document: { getElementById: id => id === 'v2board-table-dropdown' ? menu : null },
  });
  const record = { id: 7 };
  const table = new component.ContextMenuTable({ onContextMenu: value => records.push(value) });
  const events = table.rowEvents(record);
  let prevented = false;
  events.onContextMenu({ preventDefault() { prevented = true; }, clientX: 32, clientY: 48 });
  assert.equal(prevented, true);
  assert.equal(records[0], record);
  assert.deepEqual(menu.style, { display: 'unset', top: '48px', left: '32px' });
  events.onClick();
  assert.equal(records[1], undefined);
  assert.equal(menu.style.display, 'none');
  assert.equal(new component.ContextMenuTable({ disableRightClick: true }).rowEvents(record), undefined);
});

test('TrafficPanel requests the selected user and preserves pagination state', async () => {
  const calls = [];
  const response = {
    code: 200,
    data: [{ record_at: 1700000000, u: 1024, d: 2048, server_rate: 1 }],
    total: 17,
  };
  const component = await load('../src/components/TrafficPanel.tsx', id => {
    if (id === 'moment') return value => ({ format: pattern => `${value}:${pattern}` });
    if (id === 'antd/lib/modal') return 'Modal';
    if (id === 'antd/lib/table') return 'Table';
    if (id.includes('LoadingContainer')) return 'LoadingContainer';
    if (id.includes('services/request')) return { get: async (...args) => { calls.push(args); return response; }, isSuccessfulResponse: value => value.code === 200 };
    if (id.includes('siteHelpers')) return { formatBytes: value => value };
    throw new Error(id);
  }, {
    window: { settings: { secure_path: 'admin-path' } },
  });
  const panel = new component.default({ userId: 23, children: { type: 'button', props: {} } });
  await panel.loadRecords();
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['/admin-path/stat/getStatUser', { user_id: 23, page: 1, pageSize: 10, total: 0 }]]);
  assert.equal(panel.state.loading, false);
  assert.equal(panel.state.records[0].record_at, 1700000000);
  assert.deepEqual(JSON.parse(JSON.stringify(panel.state.pagination)), { page: 1, pageSize: 10, total: 17 });
  assert.equal(component.formatTrafficDate(5), '5000:YYYY-MM-DD');
});
