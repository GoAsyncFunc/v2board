import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

function createReact() {
  return {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update) { this.state = { ...this.state, ...update }; }
      forceUpdate() {}
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadPlanPage() {
  const source = await fs.readFile(new URL('../src/pages/Plan.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const React = createReact();
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    React,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id.startsWith('antd/')) return { __esModule: true, default: Object.assign(id, { Item: 'Item', Option: 'Option', TextArea: 'TextArea' }) };
      if (id.includes('PlanGroupColumn')) return { createPlanGroupColumn: () => ({ key: 'group_id' }) };
      if (id.includes('PlanResourceColumns')) return { createReadonlyPlanResourceColumns: () => ({ name: {}, count: {}, transfer_enable: {}, device_limit: {} }) };
      if (id.includes('PlanPriceColumns')) return { createReadonlyPlanPriceColumns: () => ({ month_price: {}, quarter_price: {}, half_year_price: {}, year_price: {}, two_year_price: {}, three_year_price: {}, onetime_price: {}, reset_price: {} }) };
      return { __esModule: true, default: id };
    },
  });
  return module.exports;
}

test('Plan editor loads dependencies, normalizes empty prices and closes after save', async () => {
  const runtime = await loadPlanPage();
  const actions = [];
  const editor = new runtime.PlanEditor({
    children: { props: {} }, dispatch: action => actions.push(action),
    plan: { plans: [], fetchLoading: false, saveLoading: false },
    serverGroup: { groups: [] }, config: { site: { currency_symbol: '¥' } },
  });
  editor.componentDidMount();
  editor.setState({ visible: true });
  editor.updatePrice('month_price', '');
  editor.updatePrice('year_price', '12.5');
  editor.save();
  assert.deepEqual(actions.slice(0, 2).map(action => action.type), ['config/fetch', 'serverGroup/fetch']);
  assert.equal(actions[2].type, 'plan/save');
  assert.equal(actions[2].params.month_price, null);
  assert.equal(actions[2].params.year_price, '12.5');
  actions[2].callback();
  assert.equal(editor.state.visible, false);
});

test('Plan page preserves fetch, update, delete and sort actions', async () => {
  const runtime = await loadPlanPage();
  const actions = [];
  const page = new runtime.PlanPage({ dispatch: action => actions.push(action), plan: { plans: [], fetchLoading: false }, serverGroup: { groups: [] } });
  page.componentDidMount();
  page.update(7, 'show', 1);
  page.drop(7);
  const tree = page.render();
  const sortable = findNode(tree, node => node.props?.nodeSelector === 'tr');
  sortable.props.onDragEnd(1, 0);
  assert.deepEqual(JSON.parse(JSON.stringify(actions)), [
    { type: 'plan/fetch' }, { type: 'serverGroup/fetch' },
    { type: 'plan/update', id: 7, key: 'show', value: 1 },
    { type: 'plan/drop', id: 7 }, { type: 'plan/sort', fromIndex: 1, toIndex: 0 },
  ]);
});

function findNode(tree, predicate) {
  if (Array.isArray(tree)) return tree.map(node => findNode(node, predicate)).find(Boolean);
  if (!tree || typeof tree !== 'object') return undefined;
  if (predicate(tree)) return tree;
  return findNode(tree.children, predicate) || findNode(tree.props?.children, predicate);
}
