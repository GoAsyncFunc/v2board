import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/Register.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [], notices = [], timers = [];
  const React = {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update) { this.state = { ...this.state, ...update }; }
    },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, window: { settings: {} },
    setTimeout(callback, delay) { timers.push({ callback, delay }); },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux' || id.includes('reactRedux')) return { connect: () => Page => Page };
      if (id.includes('Icon.js')) return { Icon: 'Icon' };
      if (id.includes('routerHistory')) return { push() {} };
      if (id.includes('Recaptcha')) return 'Recaptcha';
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id, getLocale: () => 'zh-CN' };
      if (id.includes('LanguageSelector')) return { LanguageSelector: 'LanguageSelector' };
      if (id.includes('siteHelpers')) return { notify: (...args) => notices.push(args) };
      if (id.includes('localeSettings')) return { localeSettings: { i18nText: { 'zh-CN': '中文' } } };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });
  const page = new module.exports.default({
    passport: {},
    guest: { commConfig: {}, selectEmailSuffix: 'example.com' },
    location: { query: { code: 'invite-code' } },
    dispatch: action => actions.push(action),
  });
  page.emailInput.current = { value: 'person' };
  page.passwordInput.current = { value: 'password' };
  page.repeatedPasswordInput.current = { value: 'password' };
  page.inviteInput.current = { value: 'invite-code' };
  return { page, actions, notices, timers };
}

test('Registration validates terms before password and preserves the submitted payload', async () => {
  const { page, actions, notices } = await loadPage();
  page.props.guest.commConfig = { tos_url: '/terms', email_whitelist_suffix: ['example.com'] };
  page.repeatedPasswordInput.current.value = 'different';
  page.register('captcha');
  assert.deepEqual(notices.at(-1), ['error', '请求失败', '请同意服务条款']);
  page.setState({ tosChecked: true });
  page.register('captcha');
  assert.deepEqual(notices.at(-1), ['error', '请求失败', '两次密码输入不同']);
  assert.equal(actions.length, 0);
  page.repeatedPasswordInput.current.value = 'password';
  page.register('captcha');
  assert.deepEqual(JSON.parse(JSON.stringify(actions[0])), {
    type: 'passport/register', email: 'person@example.com', password: 'password',
    inviteCode: 'invite-code', emailCode: '', recaptchaData: 'captcha',
  });
  page.props.guest.commConfig = {};
  page.setState({ tosChecked: false });
  page.emailInput.current.value = 'whole@example.org';
  page.emailCodeInput.current = { value: '654321' };
  page.register('second-captcha');
  assert.equal(actions[1].email, 'whole@example.org');
  assert.equal(actions[1].emailCode, '654321');
});

test('Registration verification sends the resolved email and preserves countdown timing', async () => {
  const { page, actions, timers } = await loadPage();
  page.componentDidMount();
  assert.equal(actions[0].type, 'guest/getCommConfig');
  page.props.guest.commConfig.email_whitelist_suffix = ['example.com'];
  page.sendEmailVerify('captcha');
  assert.equal(actions[1].email, 'person@example.com');
  assert.equal(actions[1].isforget, 0);
  assert.equal(actions[1].recaptchaData, 'captcha');
  assert.equal(timers.length, 0);
  actions[1].callback();
  for (let seconds = 59; seconds >= 0; seconds--) {
    const timer = timers.shift();
    assert.equal(timer.delay, 1000);
    timer.callback();
    assert.equal(page.state.sendEmailVerifyTimeout, seconds);
  }
  timers.shift().callback();
  assert.equal(page.state.sendEmailVerifyTimeout, 60);
  assert.equal(timers.length, 0);
});

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Registration keeps invite locking, whitelist selection, email verification and terms controls', async () => {
  const { page, actions } = await loadPage();
  page.props.guest.commConfig = {
    email_whitelist_suffix: ['example.com', 'example.org'], is_email_verify: true,
    is_recaptcha: true, is_invite_force: true, tos_url: '/terms',
  };
  let tree = page.render();
  const invite = nodes(tree, node => node.props.ref === page.inviteInput)[0];
  assert.equal(invite.props.defaultValue, 'invite-code');
  assert.equal(invite.props.disabled, true);
  assert.equal(invite.props.placeholder, '邀请码');
  const suffix = nodes(tree, node => node.type === 'select')[0];
  suffix.props.onChange({ target: { value: 'example.org' } });
  assert.equal(actions.at(-1).payload.selectEmailSuffix, 'example.org');
  assert.equal(nodes(tree, node => node.type === 'Recaptcha').length, 2);
  assert.equal(nodes(tree, node => node.type === 'button').at(-1).props.disabled, true);
  nodes(tree, node => node.props.type === 'checkbox')[0].props.onChange();
  tree = page.render();
  assert.equal(nodes(tree, node => node.type === 'button').at(-1).props.disabled, false);
  page.props.passport.getCommConfigLoading = true;
  assert.equal(nodes(page.render(), node => node.props.role === 'status').length, 1);
  assert.equal(nodes(page.render(), node => node.props.ref === page.emailInput).length, 0);
});
