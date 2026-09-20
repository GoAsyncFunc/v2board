import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const normalize = value => JSON.parse(JSON.stringify(value));

function createReact() {
  return {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update, callback) { this.state = { ...this.state, ...update }; callback?.(); }
      forceUpdate() {}
    },
    Fragment: 'Fragment',
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/server/Manage.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const React = createReact();
  vm.runInNewContext(code, {
    module, exports: module.exports, React, window: { confirm: () => true },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id.includes('utils/clipboard')) return { copyText: () => true };
      if (id === 'react-router-dom') return { Prompt: 'Prompt' };
      if (id === 'antd/lib/list') return Object.assign('List', { Item: Object.assign('List.Item', { Meta: 'List.Item.Meta' }) });
      if (id === 'antd/lib/menu') return Object.assign('Menu', { Item: 'Menu.Item' });
      if (id === 'antd/lib/message') return { success() {} };
      if (id.startsWith('antd/')) return id;
      if (id.includes('siteHelpers')) return { getPreference: () => 50, isMobile: () => false, setPreference() {} };
      if (id.includes('ServerTypeTag')) return { renderServerTypeTag: (_type, label) => label };
      if (id.includes('ServerNameColumn')) return { createServerNameColumn: () => ({ key: 'name' }) };
      if (id.includes('ServerRateColumn')) return { createServerRateColumn: () => ({ key: 'rate' }) };
      return { __esModule: true, default: id };
    },
  });
  return module.exports;
}

function props(dispatch, servers = []) {
  return {
    dispatch,
    serverManage: { servers, fetchLoading: false, sortMode: false },
    serverGroup: { groups: [{ id: 1, name: '默认组' }] },
  };
}

test('Server management initializes dependencies and filters node records', async () => {
  const runtime = await loadPage();
  const actions = [];
  const servers = [
    { id: 1, type: 'vmess', name: 'Tokyo', host: 'jp.example.com', port: 443, online: 2, available_status: 2, group_id: ['1'] },
    { id: 2, type: 'trojan', name: 'Paris', host: 'fr.example.com', port: 443, online: 0, available_status: 0, group_id: [] },
  ];
  const page = new runtime.ServerManagePage(props(action => actions.push(action), servers));
  page.componentDidMount();
  assert.deepEqual(normalize(actions), [
    { type: 'serverManage/getNodes' },
    { type: 'serverGroup/fetch' },
    { type: 'serverRoute/fetch' },
  ]);
  assert.equal(page.state.pageSize, 50);
  page.setState({ searchKey: 'Tokyo' });
  assert.deepEqual(normalize(page.filteredServers()), [servers[0]]);
});

test('Server management dispatches typed node actions and table sorting', async () => {
  const runtime = await loadPage();
  const actions = [];
  const server = { id: 7, type: 'vless', name: 'Node', host: 'node.example.com', port: 443, show: 1, online: 3, available_status: 2, group_id: ['1'] };
  const page = new runtime.ServerManagePage(props(action => actions.push(action), [server]));
  page.copy(server);
  page.drop(server);
  page.update(server, 'show', 0);
  assert.deepEqual(normalize(actions), [
    { type: 'serverVless/copy', id: 7 },
    { type: 'serverVless/drop', id: 7 },
    { type: 'serverVless/update', id: 7, key: 'show', value: 0 },
  ]);
  const tree = page.renderDesktopTable([server], page.props.serverGroup.groups, true);
  tree.props.onDragEnd(1, 3);
  assert.deepEqual(normalize(actions.at(-1)), { type: 'serverManage/sort', fromIndex: 1, toIndex: 3 });
});
