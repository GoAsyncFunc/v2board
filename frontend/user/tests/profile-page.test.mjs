import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(responseCode = 200) {
  const source = await fs.readFile(new URL('../src/pages/account/Profile.tsx', import.meta.url), 'utf8');
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
    if (id.endsWith('/profile/ProfileTelegram')) return {
      __esModule: true,
      default: 'ProfileTelegram',
      ProfileTelegramCommunity: 'ProfileTelegramCommunity',
    };
    if (id.includes('/profile/')) return {
      __esModule: true,
      default: id.split('/').at(-1),
    };
    if (id.includes('/ui.js')) return { Switch: 'Switch', Button: 'Button', message: {
      success: text => notices.push(['success', text]), error: text => notices.push(['error', text]),
    } };
    if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
    if (id === 'antd/lib/switch') return { __esModule: true, default: 'Switch' };
    if (id === 'antd/lib/message') return { __esModule: true, default: {
      success: text => notices.push(['success', text]), error: text => notices.push(['error', text]),
    } };
    if (id.includes('/Modal') || id === 'antd/lib/modal') {
      const Modal = { confirm: options => confirmations.push(options) };
      return { __esModule: true, default: Modal, Modal };
    }
    if (id.includes('MainLayout')) return 'Layout';
    if (id.includes('/apiClient')) return { get: async path => { requests.push(path); return { code: responseCode }; } };
    if (id.includes('types/apiContracts')) return { isSuccessfulResponse: response => response.code === 200 };
    if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
    if (id.includes('MoneyDisplay')) return { formatMoney: amount => (amount / 100).toFixed(2) };
    if (id.includes('utils/giftcard')) return { describeGiftcardRedemption: ({ type, value }) => type === 1 ? `账户余额 ${(value / 100).toFixed(2)}` : '未知类型' };
    throw Error(id);
  } });
  const page = new module.exports.ProfilePage({
    dispatch: action => actions.push(action),
    user: { userInfo: { balance: 1250, auto_renewal: 1, remind_expire: 1, remind_traffic: 0 } },
    comm: { config: { currency: 'CNY' } },
  });
  return { page, actions, confirmations, notices, requests };
}

async function loadProfileComponent(fileName) {
  const source = await fs.readFile(new URL(`../src/components/account/profile/${fileName}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
    if (id === 'antd/lib/switch') return { __esModule: true, default: 'Switch' };
    if (id.includes('TelegramBindModal')) return { __esModule: true, default: 'TelegramBindModal' };
    if (id.includes('MoneyDisplay')) return { formatMoney: amount => (amount / 100).toFixed(2) };
    if (id.includes('i18n')) return { formatMessage: ({ id: messageId }) => messageId };
    throw Error(id);
  } });
  return module.exports;
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
  actions.at(-1).complete();
  assert.deepEqual(notices.at(-1), ['success', '修改成功，请重新登陆']);
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
  actions[0].complete({ type: 1, value: 1234 });
  assert.deepEqual(notices.at(-1), ['success', '兑换成功: 账户余额 12.34']);
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

test('Profile page composes the account presentation sections', async () => {
  const { page } = await load();
  const sectionNames = nodes(page.render(), node => typeof node.type === 'string' && node.type.startsWith('Profile'))
    .map(node => node.type);
  assert.deepEqual(sectionNames, [
    'ProfileWallet',
    'ProfileGiftcard',
    'ProfilePasswordForm',
    'ProfileNotificationSettings',
    'ProfileTelegram',
    'ProfileTelegramCommunity',
    'ProfileSecurityReset',
  ]);
});

test('Profile switches retain boolean display and numeric setting updates', async () => {
  const walletModule = await loadProfileComponent('ProfileWallet');
  const notificationModule = await loadProfileComponent('ProfileNotificationSettings');
  const actions = [];
  const userInfo = { balance: 1250, auto_renewal: 1, remind_expire: 1, remind_traffic: 0 };
  const userState = { auto_renewal_loading: false, remind_expire_loading: false, remind_traffic_loading: false };
  const onSettingChange = (key, value) => actions.push({ type: 'user/update', key, value });
  const wallet = walletModule.default({
    config: { currency: 'CNY' }, userInfo, userState, onDeposit() {}, onSettingChange,
  });
  const notifications = notificationModule.default({ userInfo, userState, onSettingChange });
  const switches = nodes([wallet, notifications], node => node.type === 'Switch');
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
  const telegramModule = await loadProfileComponent('ProfileTelegram');
  assert.equal(telegramModule.default({ userInfo: {}, config: {}, onUnbind() {} }), null);
  const unbound = telegramModule.default({
    userInfo: {}, config: { is_telegram: 1 }, onUnbind() {},
  });
  assert.equal(nodes(unbound, node => node.type === 'TelegramBindModal').length, 1);
  const bound = telegramModule.default({
    userInfo: { telegram_id: 1234 }, config: { is_telegram: 1 }, onUnbind() {},
  });
  assert.match(JSON.stringify(bound), /Telegram ID: 1234/);
  assert.equal(nodes(bound, node => node.type === 'TelegramBindModal').length, 0);
  const community = telegramModule.ProfileTelegramCommunity({
    config: { telegram_discuss_link: 'https://t.me/example' },
  });
  assert.equal(nodes(community, node => node.type === 'a')[0].props.href, 'https://t.me/example');
});
