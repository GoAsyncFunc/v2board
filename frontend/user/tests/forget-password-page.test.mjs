import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/Forgetpassword.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [], notices = [], timers = [], routes = [];
  const window = { settings: {} };
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
    module, exports: module.exports, window,
    setTimeout(callback, delay) { timers.push({ callback, delay }); },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux' || id.includes('reactRedux')) return { connect: () => Page => Page };
      if (id.includes('Icon.js')) return { Icon: 'Icon' };
      if (id.includes('routerHistory')) return { push: route => routes.push(route) };
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
    passport: { sendEmailVerifyLoading: false, forgetLoading: false },
    guest: { commConfig: { is_recaptcha: true } },
    dispatch: action => actions.push(action),
  });
  page.emailInput.current = { value: 'test@example.com' };
  page.emailCodeInput.current = { value: '123456' };
  page.passwordInput.current = { value: 'new-password' };
  page.repeatedPasswordInput.current = { value: 'new-password' };
  return { page, actions, notices, timers, routes, window };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Forgot password validates matching passwords and preserves request fields', async () => {
  const { page, actions, notices } = await loadPage();
  page.componentDidMount();
  assert.equal(actions[0].type, 'guest/getCommConfig');
  page.repeatedPasswordInput.current.value = 'different';
  page.forget();
  assert.equal(actions.length, 1);
  assert.deepEqual(notices, [['error', '请求失败', '两次密码输入不同']]);
  page.repeatedPasswordInput.current.value = page.passwordInput.current.value;
  page.forget();
  assert.deepEqual(JSON.parse(JSON.stringify(actions[1])), {
    type: 'passport/forget', email: 'test@example.com', password: 'new-password', emailCode: '123456',
  });
});

test('Verification starts its original countdown only after successful dispatch callback', async () => {
  const { page, actions, timers } = await loadPage();
  const recaptcha = nodes(page.render(), node => node.type === 'Recaptcha')[0];
  assert.equal(recaptcha.props.visible, true);
  recaptcha.props.callback('captcha-token');
  assert.equal(actions[0].type, 'passport/sendEmailVerify');
  assert.equal(actions[0].recaptchaData, 'captcha-token');
  assert.equal(actions[0].isforget, 1);
  assert.equal(actions[0].email, 'test@example.com');
  assert.equal(timers.length, 0);
  actions[0].callback();
  for (let seconds = 59; seconds >= 0; seconds--) {
    const timer = timers.shift();
    assert.equal(timer.delay, 1000);
    timer.callback();
    assert.equal(page.state.sendEmailVerifyTimeout, seconds);
    assert.equal(nodes(page.render(), node => node.type === 'button')[0].props.disabled, true);
  }
  timers.shift().callback();
  assert.equal(page.state.sendEmailVerifyTimeout, 60);
  assert.equal(timers.length, 0);
  assert.equal(nodes(page.render(), node => node.type === 'button')[0].props.disabled, false);
});

test('Forgot password retains branding, pending buttons, language control and login navigation', async () => {
  const { page, routes, window } = await loadPage();
  assert.match(JSON.stringify(page.render()), /V2Board/);
  window.settings = { title: 'Demo', logo: '/logo.png', description: 'Description', background_url: '/bg.png' };
  page.props.passport = { sendEmailVerifyLoading: true, forgetLoading: true };
  const tree = page.render();
  assert.equal(nodes(tree, node => node.type === 'img')[0].props.src, '/logo.png');
  assert.equal(nodes(tree, node => node.props.className === 'v2board-background')[0].props.style.backgroundImage, 'url(/bg.png)');
  assert.equal(nodes(tree, node => node.type === 'LanguageSelector').length, 1);
  assert.ok(nodes(tree, node => node.type === 'button').every(node => node.props.disabled));
  assert.equal(nodes(tree, node => node.type === 'Icon').length, 2);
  nodes(tree, node => node.type === 'a' && node.props.onClick)[0].props.onClick();
  assert.deepEqual(routes, ['/login']);
});
