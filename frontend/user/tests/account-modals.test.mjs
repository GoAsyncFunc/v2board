import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(name, stateProps) {
  const source = await fs.readFile(new URL(`../src/components/${name}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { loader: 'tsx', format: 'cjs' });
  const actions = [], copied = [];
  const React = {
    Fragment: 'Fragment',
    Component: class {
      constructor(props) { this.props = props; }
      setState(update, complete) {
        this.state = { ...this.state, ...(typeof update === 'function' ? update(this.state) : update) };
        complete?.();
      }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    cloneElement: (child, props) => ({ ...child, props: { ...child.props, ...props } }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, window: { settings: { title: 'Test' } },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id.endsWith('/Modal.js') || id === 'antd/lib/modal') return { __esModule: true, default: 'Modal', Modal: 'Modal' };
      if (id.endsWith('/Icon.js') || id === 'antd/lib/icon') return { __esModule: true, default: 'Icon' };
      if (id.endsWith('/ui.js')) return { Input: 'Input', Select: Object.assign('Select', { Option: 'Option' }) };
      if (id.endsWith('/clipboard.js') || id === 'copy-to-clipboard') return value => copied.push(value);
      if (id.endsWith('/i18n.js')) return { formatMessage: ({ id }) => id };
      throw Error(id);
    },
  });
  const component = new module.exports[name]({
    ...stateProps,
    children: { type: 'button', props: { title: 'Open' } },
    dispatch: action => actions.push(action),
  });
  return { component, actions, copied };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Commission transfer preserves amount text, balance units and success-only close', async () => {
  const { component, actions } = await load('TransferCommissionModal', { user: { userInfo: { commission_balance: 12345 } } });
  component.render().children[0].props.onClick();
  assert.equal(component.state.visible, true);
  const inputs = nodes(component.render(), node => node.type === 'Input');
  assert.equal(inputs[0].props.value, 123.45);
  assert.equal(inputs[0].props.disabled, true);
  inputs[1].props.onChange({ target: { value: '12.50' } });
  const modal = nodes(component.render(), node => node.type === 'Modal')[0];
  modal.props.onOk();
  assert.equal(actions[0].type, 'user/transfer');
  assert.equal(actions[0].transferAmount, '12.50');
  assert.equal(component.state.visible, true);
  actions[0].callback();
  assert.equal(component.state.visible, false);
  assert.equal(component.state.transferAmount, undefined);
  component.show();
  nodes(component.render(), node => node.type === 'Modal')[0].props.onCancel();
  assert.equal(component.state.visible, false);
  assert.equal(actions.length, 1);
});

test('Withdrawal preserves configured methods and submits selected account before reset', async () => {
  const { component, actions } = await load('WithdrawModal', {
    user: { userInfo: {} },
    comm: { config: { withdraw_methods: ['Bank', 'Wallet'] } },
  });
  component.show();
  const tree = component.render();
  assert.deepEqual(nodes(tree, node => node.type === 'Option').map(node => node.props.value), ['Bank', 'Wallet']);
  nodes(tree, node => node.props.placeholder === '请选择提现方式')[0].props.onChange('Wallet');
  nodes(tree, node => node.type === 'Input')[0].props.onChange({ target: { value: 'test-account' } });
  component.ok();
  assert.equal(actions[0].type, 'ticket/withdraw');
  assert.equal(actions[0].withdrawMethod, 'Wallet');
  assert.equal(actions[0].withdrawAccount, 'test-account');
  assert.equal(component.state.visible, true);
  actions[0].callback();
  assert.equal(component.state.visible, false);
  assert.equal(component.state.withdrawMethod, undefined);
  assert.equal(component.state.withdrawAccount, undefined);
  component.props.comm.config = {};
  component.show();
  assert.equal(nodes(component.render(), node => node.type === 'Option').length, 0);
});

test('Telegram binding loads bot on open, copies binding command and closes without refetch', async () => {
  const { component, actions, copied } = await load('TelegramBindModal', {
    telegram: { botInfo: {} },
    user: { subscribe: { subscribe_url: 'https://example.test/subscription' } },
  });
  component.render().children[0].props.onClick();
  assert.equal(actions[0].type, 'telegram/getBotInfo');
  assert.equal(nodes(component.render(), node => node.type === 'Icon' && node.props.type === 'loading').length, 1);
  component.props.telegram.botInfo = { username: 'test_bot' };
  const tree = component.render();
  assert.equal(nodes(tree, node => node.type === 'a')[0].props.href, 'https://t.me/test_bot');
  nodes(tree, node => node.type === 'code')[0].props.onClick();
  assert.deepEqual(copied, ['/bind https://example.test/subscription']);
  nodes(tree, node => node.type === 'Modal')[0].props.onCancel();
  assert.equal(component.state.visible, false);
  assert.equal(actions.length, 1);
  component.toggle();
  assert.equal(actions.length, 2);
});
