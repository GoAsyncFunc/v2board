import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function compile(relativePath, loader = 'js') {
  const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
  return (await transform(source, {
    format: 'cjs',
    loader,
    jsxFactory: 'React.createElement',
  })).code;
}

function evaluate(code, globals) {
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, ...globals });
  return module.exports;
}

test('user i18n runtime delegates messages and reloads locale without refreshing', async () => {
  const stored = new Map([['umi_locale', 'zh-CN']]);
  const events = [];
  const window = {
    g_lang: 'zh-CN',
    g_langSeparator: '-',
    localStorage: {
      getItem: key => stored.get(key) || '',
      setItem: (key, value) => stored.set(key, value),
    },
    location: { reload: () => events.push('reload') },
    dispatchEvent: event => events.push(event.type),
  };
  const React = { createContext: value => ({ defaultValue: value }) };
  const reactIntl = {
    addLocaleData() {},
    injectIntl: component => component,
    IntlProvider: 'IntlProvider',
    intlShape: {},
  };
  const runtime = evaluate(await compile('../src/vendor/i18n.js'), {
    window,
    localStorage: window.localStorage,
    navigator: { language: 'zh-CN' },
    Event: class Event { constructor(type) { this.type = type; } },
    console,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-intl') return reactIntl;
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  const intl = {
    prefix: 'translated',
    formatMessage({ id }) { return `${this.prefix}:${id}`; },
  };
  let localeReloads = 0;
  runtime.setIntlApi(intl);
  runtime.setLocaleController({ reloadAppLocale: () => { localeReloads += 1; } });

  assert.equal(runtime.formatMessage({ id: 'hello' }), 'translated:hello');
  runtime.setLocale('en-US', false);
  assert.equal(stored.get('umi_locale'), 'en-US');
  assert.equal(window.g_lang, 'en-US');
  assert.equal(localeReloads, 1);
  assert.deepEqual(events, ['languagechange']);
});

test('user IntlApiBridge injects the react-intl API before rendering children', async () => {
  const injected = [];
  const pluginCalls = [];
  class Component {
    constructor(props) { this.props = props; }
  }
  const React = {
    Component,
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
  };
  const history = { location: {}, listen: () => () => {} };
  const localeExports = {
    enAntd: {}, enData: [], enMessages: {}, faAntd: {}, faData: [], faMessages: {},
    jaAntd: {}, jaData: [], jaMessages: {}, koAntd: {}, koData: [], koMessages: {},
    twAntd: {}, viAntd: {}, viData: [], viMessages: {}, zhAntd: {}, zhData: [], zhMessages: {},
  };
  const LangContext = { Consumer: 'Consumer', Provider: 'Provider' };
  const routerModule = evaluate(await compile('../src/app/Router.jsx', 'jsx'), {
    React,
    window: { g_routes: undefined },
    localStorage: { getItem: () => null },
    require(id) {
      if (id === 'react') return React;
      if (id.includes('appRuntime')) {
        return {
          routeRenderer() {},
          mergeConfig: () => ({}),
          applyForEach: key => pluginCalls.push(key),
        };
      }
      if (id.includes('/dva')) return { routerBindings: { ConnectedRouter: 'ConnectedRouter' } };
      if (id.includes('/ui')) return { ConfigProvider: 'ConfigProvider' };
      if (id.includes('/locales')) return localeExports;
      if (id.includes('/i18n')) {
        return {
          setIntlApi: value => injected.push(value),
          setLocaleController() {},
          addLocaleData() {},
          injectIntl: component => component,
          IntlProvider: 'IntlProvider',
          LangContext,
        };
      }
      if (id === './history.js') return { __esModule: true, default: history };
      if (id === './routes.js') return { __esModule: true, default: [] };
      if (id.includes('dateTime')) return {};
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  assert.deepEqual(pluginCalls, [], 'Router module evaluation must not access plugins before bootstrap initializes them');
  const router = new routerModule.default({ store: 'fixture-store' });
  assert.deepEqual(pluginCalls, ['patchRoutes', 'onRouteChange']);
  const routerTree = router.render();
  assert.equal(routerTree.children[0].props.store, 'fixture-store');

  const intl = { formatMessage: ({ id }) => id };
  const bridge = new routerModule.IntlApiBridge({ intl, children: 'page' });
  assert.equal(bridge.render(), 'page');
  assert.deepEqual(injected, [intl]);
});
