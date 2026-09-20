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
    },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadLogin() {
  const source = await fs.readFile(new URL('../src/pages/auth/Login.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const actions = [];
  const listeners = new Map();
  const modals = [];
  const React = createReact();
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    React,
    window: {
      settings: { title: 'Admin', background_url: 'https://img.example.test/bg.jpg', logo: 'logo.svg' },
      addEventListener: (event, listener) => listeners.set(event, listener),
      removeEventListener: event => listeners.delete(event),
    },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/modal') return { info: options => modals.push(options) };
      if (id === 'antd/lib/icon') return 'Icon';
      return {};
    },
  });
  return { ...module.exports, actions, listeners, modals };
}

test('Admin login dispatches token/session checks and removes key listener', async () => {
  const runtime = await loadLogin();
  const actions = [];
  const page = new runtime.AdminLogin({
    dispatch: action => actions.push(action),
    passport: { loginLoading: false },
    location: { query: { verify: 'verify-token', redirect: '/dashboard' } },
  });
  page.componentDidMount();
  assert.deepEqual(JSON.parse(JSON.stringify(actions)), [
    { type: 'passport/token2Login', verify: 'verify-token', redirect: '/dashboard' },
    { type: 'user/checkLogin', redirect: '/dashboard' },
  ]);
  assert.equal(runtime.listeners.has('keydown'), true);
  page.emailInput.current = { value: 'admin@example.com' };
  page.passwordInput.current = { value: 'secret' };
  runtime.listeners.get('keydown')({ key: 'Enter', keyCode: 13 });
  assert.deepEqual(JSON.parse(JSON.stringify(actions.at(-1))), { type: 'passport/login', email: 'admin@example.com', password: 'secret' });
  page.componentWillUnmount();
  assert.equal(runtime.listeners.has('keydown'), false);
});

test('Admin login opens the password recovery instructions', async () => {
  const runtime = await loadLogin();
  const page = new runtime.AdminLogin({ dispatch() {}, passport: { loginLoading: false }, location: {} });
  page.showPasswordHelp();
  assert.equal(runtime.modals.length, 1);
  assert.equal(runtime.modals[0].title, '忘记密码');
  assert.equal(runtime.modals[0].okText, '我知道了');
});
