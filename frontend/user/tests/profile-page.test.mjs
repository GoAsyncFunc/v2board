import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(responseCode = 200) {
  const source = await fs.readFile(new URL('../src/pages/Profile.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [], confirmations = [], notices = [], requests = [];
  const React = {
    Component: class { constructor(props) { this.props = props; } },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id === 'react-redux') return { connect: () => Component => Component };
    if (id.includes('/ui.js')) return { Switch: 'Switch', Button: 'Button', message: {
      success: text => notices.push(['success', text]), error: text => notices.push(['error', text]),
    } };
    if (id.includes('/Modal')) return { Modal: { confirm: options => confirmations.push(options) } };
    if (id.includes('MainLayout')) return 'Layout';
    if (id.includes('TelegramBindModal')) return 'TelegramBindModal';
    if (id.includes('/request')) return { get: async path => { requests.push(path); return { code: responseCode }; } };
    if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
    if (id.includes('MoneyDisplay')) return { formatMoney: amount => (amount / 100).toFixed(2) };
    throw Error(id);
  } });
  const page = new module.exports.ProfilePage({
    dispatch: action => actions.push(action),
    user: { userInfo: { balance: 1250, auto_renewal: 1, remind_expire: 1, remind_traffic: 0 } },
    comm: { config: { currency: 'CNY' } },
  });
  return { page, actions, confirmations, notices, requests };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Profile startup and password validation preserve request fields', async () => {
  const { page, actions, notices } = await load();
  page.componentDidMount();
  assert.deepEqual(actions.map(action => action.type), ['user/getUserInfo', 'comm/config']);
  page.oldPasswordRef.current = { value: 'old' };
  page.newPasswordRef.current = { value: 'new' };
  page.repeatPasswordRef.current = { value: 'mismatch' };
  page.changePassword();
  assert.deepEqual(notices, [['error', '两次新密码输入不同']]);
  assert.equal(actions.length, 2);
  page.repeatPasswordRef.current.value = 'new';
  page.changePassword();
  assert.deepEqual(JSON.parse(JSON.stringify(actions.at(-1))), { type: 'user/changePassword', oldPassword: 'old', newPassword: 'new' });
});

test('Giftcard rejects empty input and submits the original entered code', async () => {
  const { page, actions, notices } = await load();
  page.giftcardRef.current = { value: '' };
  page.redeemGiftcard();
  assert.equal(actions.length, 0);
  assert.deepEqual(notices, [['error', '请输入礼品卡']]);
  page.giftcardRef.current.value = 'CARD-123';
  page.redeemGiftcard();
  assert.equal(actions[0].type, 'user/redeemgiftcard');
  assert.equal(actions[0].giftcard, 'CARD-123');
});

for (const [method, endpoint] of [['resetSecurity', '/user/resetSecurity'], ['unbindTelegram', '/user/unbindTelegram']]) {
  for (const code of [200, 422]) test(`Profile ${method} response=${code} runs only after confirmation`, async () => {
    const { page, actions, confirmations, requests, notices } = await load(code);
    page[method]();
    assert.equal(requests.length, 0);
    await confirmations[0].onOk();
    assert.deepEqual(requests, [endpoint]);
    assert.deepEqual(actions.map(action => action.type), code === 200 ? ['user/getUserInfo', 'user/getSubscribe'] : []);
    assert.equal(notices.length, code === 200 ? 1 : 0);
  });
}

test('Deposit confirmation converts yuan to cents and preserves the order payload', async () => {
  const { page, actions, confirmations } = await load();
  page.deposit();
  assert.equal(actions.length, 0);
  confirmations[0].title.props.onChange({ target: { value: '12.50' } });
  confirmations[0].onOk();
  assert.deepEqual(JSON.parse(JSON.stringify(actions[0])), {
    type: 'order/save', params: { period: 'deposit', deposit_amount: 1250, plan_id: 0 },
  });
});

test('Profile switches retain boolean display and numeric setting updates', async () => {
  const { page, actions } = await load();
  const switches = nodes(page.render(), node => node.type === 'Switch');
  assert.deepEqual(switches.map(node => node.props.checked), [true, true, false]);
  switches[0].props.onChange(false);
  switches[1].props.onChange(false);
  switches[2].props.onChange(true);
  assert.deepEqual(JSON.parse(JSON.stringify(actions)), [
    { type: 'user/update', key: 'auto_renewal', value: 0 },
    { type: 'user/update', key: 'remind_expire', value: 0 },
    { type: 'user/update', key: 'remind_traffic', value: 1 },
  ]);
});

test('Telegram section preserves disabled, unbound and bound states', async () => {
  const { page } = await load();
  assert.equal(page.renderTelegram({}, {}), null);
  const unbound = page.renderTelegram({}, { is_telegram: 1 });
  assert.equal(nodes(unbound, node => node.type === 'TelegramBindModal').length, 1);
  const bound = page.renderTelegram({ telegram_id: 1234 }, { is_telegram: 1 });
  assert.match(JSON.stringify(bound), /Telegram ID: 1234/);
  assert.equal(nodes(bound, node => node.type === 'TelegramBindModal').length, 0);
});
