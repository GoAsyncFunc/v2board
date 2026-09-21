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
    forceUpdate() {}
  },
  Fragment: 'Fragment',
  cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
  createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Select = Object.assign('Select', { Option: 'Select.Option' });
const Input = Object.assign('Input', { TextArea: 'Input.TextArea' });
const Menu = Object.assign('Menu', { Item: 'Menu.Item' });
const findNode = (tree, predicate) => {
  if (Array.isArray(tree)) return tree.map(node => findNode(node, predicate)).find(Boolean);
  if (!tree || typeof tree !== 'object') return undefined;
  if (predicate(tree)) return tree;
  return findNode(tree.children, predicate) || findNode(tree.props?.children, predicate);
};
const normalize = value => JSON.parse(JSON.stringify(value));

async function loadModule(relativePath, localModules = {}) {
  const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === './_Modal' || id.endsWith('/_Modal')) return localModules.modal;
      if (id === './_List' || id.endsWith('/_List')) return localModules.list;
      if (id === './PlanGroupColumn') return localModules.groupColumns;
      if (id === './PlanPriceColumns') return localModules.priceColumns;
      if (id === './PlanResourceColumns') return localModules.resourceColumns;
      if (id === 'antd/lib/button') return 'Button';
      if (id === 'antd/lib/checkbox') return 'Checkbox';
      if (id === 'antd/lib/col') return 'Col';
      if (id === 'antd/lib/divider') return 'Divider';
      if (id === 'antd/lib/drawer') return 'Drawer';
      if (id === 'antd/lib/dropdown') return 'Dropdown';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/input') return Input;
      if (id === 'antd/lib/menu') return Menu;
      if (id === 'antd/lib/row') return 'Row';
      if (id === 'antd/lib/select') return Select;
      if (id === 'antd/lib/switch') return 'Switch';
      if (id === 'antd/lib/tooltip') return 'Tooltip';
      if (id.includes('ContextMenuTable')) return 'ContextMenuTable';
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('MainLayout')) return 'MainLayout';
      if (id.includes('NullableSelectOption')) return 'NullableSelectOption';
      if (id.includes('PermissionGroupEditor')) return 'PermissionGroupEditor';
      if (id.includes('Sortable')) return 'Sortable';
      throw new Error(id);
    },
  });
  return module.exports;
}

async function loadPage() {
  return loadModule('../src/pages/plan/index.tsx', {
    modal: { __esModule: true, default: 'PlanEditor', PlanEditor: 'PlanEditor' },
    list: { __esModule: true, default: 'PlanList', PlanList: 'PlanList' },
  });
}

async function loadList() {
  return loadModule('../src/pages/plan/_List/index.tsx', {
    modal: { __esModule: true, default: 'PlanEditor', PlanEditor: 'PlanEditor' },
    groupColumns: { createPlanGroupColumn: () => ({ key: 'group_id' }) },
    priceColumns: {
      createReadonlyPlanPriceColumns: () => Object.fromEntries([
        'month_price', 'quarter_price', 'half_year_price', 'year_price',
        'two_year_price', 'three_year_price', 'onetime_price', 'reset_price',
      ].map(key => [key, { key }])),
    },
    resourceColumns: {
      createReadonlyPlanResourceColumns: () => Object.fromEntries(
        ['name', 'count', 'transfer_enable', 'device_limit'].map(key => [key, { key }]),
      ),
    },
  });
}

async function loadEditor() {
  return loadModule('../src/pages/plan/_Modal/index.tsx');
}

test('Plan page composes the nested list and editor modules', async () => {
  const { PlanPage } = await loadPage();
  const actions = [];
  const plan = { plans: [], fetchLoading: false, saveLoading: false };
  const page = new PlanPage({
    dispatch: action => actions.push(action),
    plan,
    serverGroup: { groups: [] },
  });

  page.componentDidMount();
  assert.deepEqual(normalize(actions), [
    { type: 'plan/fetch' },
    { type: 'serverGroup/fetch' },
  ]);
  const tree = page.render();
  const list = findNode(tree, node => node.type === 'PlanList');
  const editor = findNode(tree, node => node.type === 'PlanEditor');
  assert.equal(list.props.plan, plan);
  assert.equal(editor.type, 'PlanEditor');
});

test('Plan editor preserves dependencies, empty price normalization, and save close behavior', async () => {
  const { PlanEditor } = await loadEditor();
  const actions = [];
  const editor = new PlanEditor({
    children: { type: 'button', props: {} },
    dispatch: action => actions.push(action),
    plan: { plans: [], fetchLoading: false, saveLoading: false },
    serverGroup: { groups: [] },
    config: { site: { currency_symbol: '¥' } },
  });

  editor.componentDidMount();
  editor.updatePrice('month_price', '');
  editor.updatePrice('year_price', '12.5');
  editor.save();
  assert.deepEqual(normalize(actions.slice(0, 2)), [
    { type: 'config/fetch', key: 'site' },
    { type: 'serverGroup/fetch' },
  ]);
  assert.equal(actions[2].type, 'plan/save');
  assert.equal(actions[2].params.month_price, null);
  assert.equal(actions[2].params.year_price, '12.5');
  actions[2].callback();
  assert.equal(editor.state.visible, false);
});

test('Plan list preserves switches, menu actions, and sorting', async () => {
  const { PlanList } = await loadList();
  const actions = [];
  const plans = [{ id: 7, name: 'Starter', show: 0, renew: 1 }];
  const list = new PlanList({
    dispatch: action => actions.push(action),
    plan: { plans, fetchLoading: false, saveLoading: false },
    serverGroup: { groups: [] },
  });

  const columns = list.columns();
  columns[1].render(0, plans[0]).props.onClick();
  columns[2].render(1, plans[0]).props.onClick();
  const actionMenu = columns[16].render(undefined, plans[0]).props.overlay;
  actionMenu.children[1].props.onClick();

  const tree = list.render();
  const sortable = findNode(tree, node => node.type === 'Sortable');
  sortable.props.onDragEnd(1, 0);
  const table = findNode(tree, node => node.type === 'ContextMenuTable');
  table.props.onContextMenu(plans[0]);

  assert.deepEqual(normalize(actions), [
    { type: 'plan/update', id: 7, key: 'show', value: 1 },
    { type: 'plan/update', id: 7, key: 'renew', value: 0 },
    { type: 'plan/drop', id: 7 },
    { type: 'plan/sort', fromIndex: 1, toIndex: 0 },
  ]);
});
