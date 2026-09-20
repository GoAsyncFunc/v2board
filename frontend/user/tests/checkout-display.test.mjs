import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(name) {
  const source = await fs.readFile(new URL(`../src/components/commerce/checkout/${name}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const confirmations = [], actions = [];
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id === 'react') return { createElement: (type, props, ...children) => ({ type, props: props || {}, children }) };
    if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
    if (id.includes('localeSettings')) return { localeSettings: { periodText: { month_price: () => 'Month' } } };
    if (id.includes('DateTimeDisplay')) return { formatDateTimeSeconds: value => `date:${value}` };
    if (id.includes('MoneyDisplay')) return { formatPrice: value => (value / 100).toFixed(2) };
    if (id.includes('/Modal') || id === 'antd/lib/modal') {
      const Modal = { confirm: options => confirmations.push(options) };
      return { __esModule: true, default: Modal, Modal };
    }
    if (id.includes('/LoadingContainer')) return 'Loading';
    if (id.includes('/Icon') || id === 'antd/lib/icon') return { __esModule: true, default: 'Icon', Icon: 'Icon' };
    throw Error(id);
  } });
  return { render: module.exports.default, confirmations, actions, dispatch: action => actions.push(action) };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}
function text(tree) {
  if (Array.isArray(tree)) return tree.map(text).join('');
  if (tree && typeof tree === 'object') return text(tree.children);
  return tree == null || typeof tree === 'boolean' ? '' : String(tree);
}

test('Product information preserves deposit label and legacy traffic-only plan branch', async () => {
  const { render } = await load('ProductInfo');
  assert.match(text(render({ order: { plan: { id: 0 } } })), /产品名称：充值/);
  const plan = text(render({ order: { plan: { id: 7, name: 'Monthly', transfer_enable: 100 }, period: 'month_price' } }));
  assert.match(plan, /产品流量：100 GB/);
  assert.doesNotMatch(plan, /产品名称|类型\/周期|Monthly/);
});

test('Order information formats adjustments and requires confirmation before cancellation', async () => {
  const runtime = await load('OrderInfo');
  const order = { status: 0, trade_no: 'TEST', created_at: 100, discount_amount: 100, surplus_amount: 200, refund_amount: 300, balance_amount: 400, pre_handling_amount: 50 };
  const tree = runtime.render({ order, cancelLoading: true, dispatch: runtime.dispatch });
  for (const amount of ['1.00', '2.00', '3.00', '4.00', '0.50']) assert.ok(text(tree).includes(amount));
  const button = nodes(tree, node => node.type === 'button')[0];
  assert.equal(button.props.disabled, true);
  button.props.onClick();
  assert.equal(runtime.actions.length, 0);
  assert.equal(runtime.confirmations[0].okButtonProps.loading, true);
  runtime.confirmations[0].onOk();
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.actions)), [{ type: 'order/cancel', tradeNo: 'TEST' }]);
  assert.equal(nodes(runtime.render({ order: { ...order, status: 3 }, dispatch: runtime.dispatch }), node => node.type === 'button').length, 0);
});

for (const deposit of [false, true]) test(`Payment summary preserves totals and checkout gating deposit=${deposit}`, async () => {
  const { render } = await load('OrderPaymentSummary');
  let checkouts = 0;
  const props = {
    order: { plan: { id: deposit ? 0 : 7, name: 'Monthly', month_price: 2000 }, period: 'month_price',
      total_amount: 1000, pre_handling_amount: 50, discount_amount: 100, surplus_amount: 200, refund_amount: 300,
      bounus: 250, get_amount: 1250 },
    config: { currency_symbol: '$', currency: 'USD' }, selectedPayment: { payment: 'StripeCredit' },
    stripe: {}, checkoutLoading: false, onCheckout: () => checkouts++,
  };
  let tree = render(props);
  assert.equal(nodes(tree, node => node.type === 'h1').map(text)[0], '$ 10.50 USD');
  assert.equal(text(tree).includes('充值奖励'), deposit);
  assert.equal(text(tree).includes('实际到账'), deposit);
  assert.equal(nodes(tree, node => node.type === 'button')[0].props.disabled, true);
  props.stripe.token = 'test-token';
  tree = render(props);
  const button = nodes(tree, node => node.type === 'button')[0];
  assert.equal(button.props.disabled, false);
  button.props.onClick();
  assert.equal(checkouts, 1);
  props.checkoutLoading = true;
  assert.equal(nodes(render(props), node => node.type === 'button')[0].props.disabled, true);
});
