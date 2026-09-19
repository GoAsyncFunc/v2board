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
      setState(update) { this.state = { ...this.state, ...update }; }
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/ServerRoute.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const React = createReact();
  vm.runInNewContext(code, {
    module, exports: module.exports, React,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/input') return Object.assign('Input', { TextArea: 'Input.TextArea' });
      if (id === 'antd/lib/select') return Object.assign('Select', { Option: 'Select.Option' });
      if (id.startsWith('antd/')) return id;
      if (id.includes('RouteActionColumn')) return { createRouteActionColumn: () => ({ key: 'action' }) };
      if (id.includes('ServerRouteDisplayColumns')) return { createReadonlyServerRouteColumns: () => ({ id: {}, remarks: {}, match: {} }) };
      if (id.includes('adminSettings')) return { settings: { routeActionText: {} } };
      return { __esModule: true, default: id };
    },
  });
  return module.exports;
}

test('Route editor normalizes match values and closes after save', async () => {
  const runtime = await loadPage();
  const actions = [];
  const editor = new runtime.RouteEditor({
    children: { props: {} }, dispatch: action => actions.push(action),
    serverRoute: { routes: [], fetchLoading: false, saveLoading: false },
    route: { id: 7, action: 'route_ip', match: ['10.0.0.0/8', '', 'geoip:cn'] },
  });
  editor.setState({ visible: true });
  editor.save();
  assert.deepEqual(normalize(actions[0]), {
    type: 'serverRoute/save', params: { id: 7, action: 'route_ip', match: ['10.0.0.0/8', 'geoip:cn'] },
  });
  actions[0].callback();
  assert.equal(editor.state.visible, false);
  assert.match(editor.matchPlaceholder(), /geoip:cn/);
  editor.updateRoute({ action: 'protocol' });
  assert.equal(editor.matchPlaceholder(), 'http\ntls\nquic\nbittorrent');
});

test('Route editor converts comma strings and missing match values', async () => {
  const runtime = await loadPage();
  const actions = [];
  const editor = new runtime.RouteEditor({ children: { props: {} }, dispatch: action => actions.push(action), serverRoute: { routes: [], fetchLoading: false }, route: { action: 'block', match: 'a,,b' } });
  editor.save();
  assert.deepEqual(normalize(actions[0].params.match), ['a', 'b']);
  editor.state.route.match = undefined;
  editor.save();
  assert.deepEqual(normalize(actions[1].params.match), []);
});

test('Server route page fetches, renders records and dispatches deletion', async () => {
  const runtime = await loadPage();
  const actions = [];
  const routes = [{ id: 3, remarks: 'CN', action: 'block', match: ['example.com'] }];
  const page = new runtime.ServerRoutePage({ dispatch: action => actions.push(action), serverRoute: { routes, fetchLoading: false, saveLoading: false } });
  page.componentDidMount();
  const tree = page.render();
  const table = findNode(tree, node => node.type === 'antd/lib/table');
  assert.equal(table.props.dataSource, routes);
  const actionCell = table.props.columns.at(-1).render(null, routes[0]);
  findNode(actionCell, node => node.type === 'a' && node.children.includes('删除')).props.onClick();
  assert.deepEqual(normalize(actions), [{ type: 'serverRoute/fetch' }, { type: 'serverRoute/drop', id: 3 }]);
});

function findNode(tree, predicate) {
  if (Array.isArray(tree)) return tree.map(node => findNode(node, predicate)).find(Boolean);
  if (!tree || typeof tree !== 'object') return undefined;
  if (predicate(tree)) return tree;
  return findNode(tree.children, predicate) || findNode(tree.props?.children, predicate);
}
