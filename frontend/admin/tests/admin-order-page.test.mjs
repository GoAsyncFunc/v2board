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
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadOrderPage(responses = []) {
  const source = await fs.readFile(new URL('../src/pages/commerce/Order.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const requests = [];
  const routes = [];
  const React = createReact();
  const Menu = Object.assign('Menu', { Item: 'Menu.Item' });
  const Button = Object.assign('Button', { Group: 'Button.Group' });
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    window: { settings: { secure_path: 'admin' } },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/button') return Button;
      if (id === 'antd/lib/menu') return Menu;
      if (id.startsWith('antd/')) return id;
      if (id.includes('routerHistory') || id.includes('app/navigation')) return { __esModule: true, default: { push: route => routes.push(route) } };
      if (id.includes('services/request')) return {
        post: async (endpoint, data) => { requests.push({ method: 'post', endpoint, data }); return responses.shift(); },
        get: async (endpoint, data) => { requests.push({ method: 'get', endpoint, data }); return responses.shift(); },
      };
      if (id.includes('types/api')) return { isSuccessfulResponse: response => response.code === 200 };
      if (id.includes('OrderDisplayColumns')) return { createReadonlyOrderColumns: () => ({ type: {}, period: {}, total_amount: {}, commission_balance: {}, created_at: {} }) };
      if (id.includes('adminSettings')) return { settings: { orderStatusText: ['未支付'], commissionStatusText: ['待确认'] } };
      return { __esModule: true, default: id };
    },
  });
  return { ...module.exports, requests, routes };
}

test('Order detail loads order, user and inviter in sequence and supports user filtering', async () => {
  const runtime = await loadOrderPage([
    { code: 200, data: { id: 7, user_id: 3, invite_user_id: 4, trade_no: 'ABC123' } },
    { code: 200, data: { email: 'buyer@example.com' } },
    { code: 200, data: { email: 'inviter@example.com' } },
  ]);
  const actions = [];
  const modal = new runtime.OrderDetailModal({ dispatch: action => actions.push(action), orderId: 7, plan: { plans: [] }, children: null });
  await modal.getOrderInfo();
  assert.deepEqual(normalize(runtime.requests), [
    { method: 'post', endpoint: '/admin/order/detail', data: { id: 7 } },
    { method: 'get', endpoint: '/admin/user/getUserInfoById', data: { id: 3 } },
    { method: 'get', endpoint: '/admin/user/getUserInfoById', data: { id: 4 } },
  ]);
  assert.equal(modal.state.user.email, 'buyer@example.com');
  assert.equal(modal.state.inviteUser.email, 'inviter@example.com');
  modal.jumpUserFilter('email', '模糊', 'buyer@example.com');
  assert.deepEqual(normalize(actions), [{ type: 'user/addFilter', key: 'email', condition: '模糊', value: 'buyer@example.com' }]);
  assert.deepEqual(runtime.routes, ['/user']);
});

test('Order detail stops requesting when the order lookup fails', async () => {
  const runtime = await loadOrderPage([{ code: 422, data: null }]);
  const modal = new runtime.OrderDetailModal({ dispatch() {}, orderId: 9, plan: { plans: [] }, children: null });
  await modal.getOrderInfo();
  assert.equal(runtime.requests.length, 1);
  assert.equal(modal.state.visible, true);
  assert.equal(modal.state.user.email, '');
});

test('Order page preserves lifecycle, status, filter and pagination actions', async () => {
  const runtime = await loadOrderPage();
  const actions = [];
  const page = new runtime.OrderPage({ dispatch: action => actions.push(action), order: { orders: [], fetchLoading: false, pagination: { current: 1, pageSize: 10 }, filter: [] } });
  page.componentDidMount();
  page.update('TRADE', 'commission_status', '1');
  const statusTree = page.renderOrderStatus(0, { trade_no: 'TRADE' });
  statusTree.props.overlay.children[0].props.onClick();
  statusTree.props.overlay.children[1].props.onClick();
  const tree = page.render();
  const table = findNode(tree, node => node.type === 'antd/lib/table');
  table.props.onChange({ current: 2, pageSize: 20 });
  page.componentWillUnmount();
  assert.equal(page.filterFields().length, 7);
  assert.deepEqual(normalize(actions), [
    { type: 'order/fetch' }, { type: 'plan/fetch' },
    { type: 'order/update', tradeNo: 'TRADE', key: 'commission_status', value: '1' },
    { type: 'order/paid', tradeNo: 'TRADE' }, { type: 'order/cancel', tradeNo: 'TRADE' },
    { type: 'order/changeTable', pagination: { current: 2, pageSize: 20 } },
    { type: 'order/empty' }, { type: 'order/setState', payload: { filter: [] } },
  ]);
});

function findNode(tree, predicate) {
  if (Array.isArray(tree)) return tree.map(node => findNode(node, predicate)).find(Boolean);
  if (!tree || typeof tree !== 'object') return undefined;
  if (predicate(tree)) return tree;
  return findNode(tree.children, predicate) || findNode(tree.props?.children, predicate);
}
