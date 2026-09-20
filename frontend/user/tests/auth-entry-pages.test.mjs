import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
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

async function compile(relativePath) {
  const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
  return (await transform(source, { format: 'cjs', loader: 'tsx' })).code;
}

function findNodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => findNodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...findNodes(tree.children, predicate)];
}

test('Login restores token login, session check, keyboard submit and navigation', async () => {
  const code = await compile('../src/pages/auth/Login.tsx');
  const actions = [], routes = [], listeners = new Map();
  const React = createReact();
  const window = {
    settings: { title: 'Demo', description: 'Description', background_url: '/background.png' },
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name, listener) => {
      if (listeners.get(name) === listener) listeners.delete(name);
    },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, window,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Page => Page };
      if (id.includes('Divider') || id === 'antd/lib/divider') return { __esModule: true, default: 'Divider', Divider: 'Divider' };
      if (id.includes('Icon') || id === 'antd/lib/icon') return { __esModule: true, default: 'Icon', Icon: 'Icon' };
      if (id.includes('routerHistory')) return { push: route => routes.push(route) };
      if (id.includes('i18n')) return { formatMessage: ({ id: messageId }) => messageId, getLocale: () => 'zh-CN' };
      if (id.includes('LanguageSelector')) return { LanguageSelector: 'LanguageSelector' };
      if (id.includes('localeSettings')) return { localeSettings: { i18nText: { 'zh-CN': '简体中文' } } };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });

  const page = new module.exports.UserLogin({
    passport: { loginLoading: false },
    location: { query: { verify: 'token', redirect: '/profile' } },
    dispatch: action => actions.push(action),
  });
  page.emailInput.current = { value: 'user@example.com' };
  page.passwordInput.current = { value: 'password' };
  page.componentDidMount();
  assert.deepEqual(JSON.parse(JSON.stringify(actions.slice(0, 2))), [
    { type: 'passport/token2Login', verify: 'token', redirect: '/profile' },
    { type: 'user/checkLogin', redirect: '/profile' },
  ]);
  listeners.get('keydown')({ keyCode: 13 });
  assert.deepEqual(JSON.parse(JSON.stringify(actions[2])), {
    type: 'passport/login', email: 'user@example.com', password: 'password', redirect: '/profile',
  });

  const tree = page.render();
  assert.equal(findNodes(tree, node => node.props.className === 'v2board-background')[0].props.style.backgroundImage, 'url(/background.png)');
  assert.equal(findNodes(tree, node => node.type === 'LanguageSelector').length, 1);
  const links = findNodes(tree, node => node.type === 'a' && node.props.onClick);
  links[0].props.onClick();
  links[1].props.onClick();
  assert.deepEqual(routes, ['/register', '/forgetpassword']);
  page.componentWillUnmount();
  assert.equal(listeners.has('keydown'), false);
});

test('Home page redirects without configured content and decodes configured HTML', async () => {
  const code = await compile('../src/pages/auth/Index.tsx');
  const routes = [];
  const React = createReact();
  const window = { settings: {}, atob: value => Buffer.from(value, 'base64').toString('binary') };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, window, decodeURI, Buffer,
    require(id) {
      if (id === 'react') return React;
      if (id.includes('routerHistory')) return { push: route => routes.push(route) };
      throw new Error(id);
    },
  });

  const page = new module.exports.HomePage({});
  page.componentDidMount();
  assert.deepEqual(routes, ['/login']);
  assert.match(JSON.stringify(page.render()), /v2board/);

  window.settings.homepage = Buffer.from(encodeURI('<strong>Welcome</strong>'), 'binary').toString('base64');
  assert.equal(page.render().props.dangerouslySetInnerHTML.__html, '<strong>Welcome</strong>');
});
