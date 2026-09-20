import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/server/Group.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [];
  const React = {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update) {
        const next = typeof update === 'function' ? update(this.state) : update;
        this.state = { ...this.state, ...next };
      }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Page => Page };
      if (id === 'antd/lib/button') return 'Button';
      if (id === 'antd/lib/divider') return 'Divider';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/table') return 'Table';
      if (id.includes('MainLayout')) return 'Layout';
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('PermissionGroupEditor')) return 'PermissionGroupEditor';
      if (id.includes('ServerGroupDisplayColumns')) return {
        createReadonlyServerGroupColumns: () => ({
          id: { key: 'id' }, name: { key: 'name' }, user_count: { key: 'user_count' }, server_count: { key: 'server_count' },
        }),
      };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });
  return { Page: module.exports.ServerGroupPage, actions, dispatch: action => actions.push(JSON.parse(JSON.stringify(action))) };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

test('Server group page fetches, renders rows, exposes the editor and dispatches delete', async () => {
  const runtime = await loadPage();
  const groups = [{ id: 3, name: 'Operators', user_count: 2, server_count: 1 }];
  const page = new runtime.Page({
    serverGroup: { groups, fetchLoading: false },
    dispatch: runtime.dispatch,
  });
  page.componentDidMount();
  assert.deepEqual(runtime.actions, [{ type: 'serverGroup/fetch' }]);
  const tree = page.render();
  const table = nodes(tree, node => node.type === 'Table')[0];
  assert.equal(table.props.dataSource, groups);
  const actionCell = table.props.columns[4].render(null, groups[0]);
  const deleteLink = nodes(actionCell, node => node.type === 'a' && node.props.onClick)[0];
  deleteLink.props.onClick();
  assert.deepEqual(runtime.actions.at(-1), { type: 'serverGroup/drop', id: 3 });
  assert.equal(nodes(tree, node => node.type === 'PermissionGroupEditor').length, 1);
});
