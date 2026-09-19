import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadConfig() {
  const actions = [], timers = new Map();
  let nextTimer = 0;
  const React = {
    Component: class { constructor(props) { this.props = props; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const components = {};
  for (const [name, file] of [
    ['row', '../src/components/config/ConfigRow.jsx'],
    ['site', '../src/components/config/SiteConfigTab.jsx'],
    ['safe', '../src/components/config/SafeConfigTab.jsx'],
    ['page', '../src/pages/ConfigSystem.jsx'],
  ]) {
    const { code } = await transform(await fs.readFile(new URL(file, import.meta.url), 'utf8'), { format: 'cjs', loader: 'jsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
      module, exports: module.exports,
      setTimeout(callback, delay) { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
      clearTimeout(id) { timers.delete(id); },
      require(id) {
        if (id === 'react') return React;
        if (id.includes('reactRedux')) return { connect: () => Page => Page };
        if (id.includes('ConfigRow')) return components.row;
        if (id.includes('SiteConfigTab')) return components.site;
        if (id.includes('SafeConfigTab')) return components.safe;
        if (id.includes('MainLayout')) return 'Layout';
        if (id.includes('ui.js')) return {
          Button: 'Button', Input: 'Input', Switch: 'Switch',
          Tabs: { TabPane: 'TabPane' },
        };
        throw new Error(id);
      },
    });
    components[name] = module.exports;
  }
  return {
    ConfigRow: components.row.default, SiteConfigTab: components.site.default,
    SafeConfigTab: components.safe.default,
    Page: components.page.SystemConfigPage,
    timers, actions, dispatch: action => actions.push(JSON.parse(JSON.stringify(action))),
  };
}

test('System config initializes all independent configuration sources in order', async () => {
  const { Page, actions, dispatch } = await loadConfig();
  new Page({ dispatch }).componentDidMount();
  assert.deepEqual(actions.map(action => action.type), [
    'config/fetch', 'plan/fetch', 'config/getEmailTemplate', 'config/getThemeTemplate',
  ]);
});

test('System config preserves sibling fields and debounces saves for the updated group', async () => {
  const { Page, actions, timers, dispatch } = await loadConfig();
  const config = { site: { app_name: 'Old', app_description: 'Keep' }, email: { host: 'old' } };
  const page = new Page({ config, dispatch });
  page.set('site', 'app_name', 'New');
  assert.deepEqual(actions[0], {
    type: 'config/setState', payload: { site: { app_name: 'New', app_description: 'Keep' } },
  });
  assert.equal(config.site.app_name, 'Old');
  page.set('email', 'host', 'mail.example.test');
  assert.equal(timers.size, 1);
  const timer = [...timers.values()][0];
  assert.equal(timer.delay, 1500);
  timer.callback();
  assert.deepEqual(actions.at(-1), { type: 'config/save', parentKey: 'email' });
  assert.equal(page.inputDelayTimer, null);
});

test('Config row keeps its two-column layout, descriptions and nested-row styling', async () => {
  const { ConfigRow } = await loadConfig();
  const control = { type: 'input', props: { value: 'Example' } };
  for (const isChildren of [false, true]) {
    const tree = ConfigRow({ title: 'Title', description: 'Help', isChildren, children: control });
    assert.equal(tree.props.className, isChildren ? 'row v2board-config-children' : 'row ');
    assert.equal(tree.props.style.padding, '20px');
    assert.equal(tree.props.style.borderBottom, '1px solid #eee');
    assert.equal(tree.children[0].props.className, 'col-lg-6');
    assert.equal(tree.children[0].children[0].children[0], 'Title');
    assert.equal(tree.children[0].children[1].children[0], 'Help');
    assert.equal(tree.children[1].props.className, 'col-lg-6 text-right');
    assert.equal(tree.children[1].children[0], control);
  }
});

test('Site config tab maps each control to its semantic setting key', async () => {
  const { SiteConfigTab } = await loadConfig();
  const changes = [];
  const site = {
    app_name: 'Demo', app_description: 'Description', app_url: 'https://example.test',
    force_https: 0, logo: '', subscribe_url: '', subscribe_path: '/subscribe',
    tos_url: '', stop_register: 0, try_out_plan_id: 1, try_out_hour: 24,
    currency: 'CNY', currency_symbol: '¥',
  };
  const tree = SiteConfigTab({
    site,
    plans: [{ id: 1, name: 'Trial' }],
    onChange: (field, value) => changes.push([field, value]),
  });
  const controls = [];
  const collect = node => {
    if (Array.isArray(node)) return node.forEach(collect);
    if (!node || typeof node !== 'object') return;
    if (typeof node.type === 'function') {
      collect(node.type({ ...node.props, children: node.children }));
      return;
    }
    if (node.props?.onChange) controls.push(node);
    collect(node.children);
    collect(node.props?.children);
  };
  collect(tree);
  controls.find(control => control.props.defaultValue === 'Demo').props.onChange({ target: { value: 'New' } });
  controls.find(control => control.props.defaultValue === '').props.onChange({ target: { value: 'logo' } });
  controls.find(control => control.props.defaultValue === 24).props.onChange({ target: { value: '48' } });
  assert.deepEqual(changes, [['app_name', 'New'], ['logo', 'logo'], ['try_out_hour', '48']]);
});

test('Safe config tab exposes conditional security controls and semantic updates', async () => {
  const { SafeConfigTab } = await loadConfig();
  const changes = [];
  const safe = {
    email_verify: 1, email_gmail_limit_enable: 0, safe_mode_enable: 0, secure_path: 'admin',
    email_whitelist_enable: 1, email_whitelist_suffix: ['example.com'],
    recaptcha_enable: 1, recaptcha_key: 'key', recaptcha_site_key: 'site',
    register_limit_by_ip_enable: 0, register_limit_count: 5, register_limit_expire: 10,
    password_limit_enable: 0, password_limit_count: 5, password_limit_expire: 10,
  };
  const tree = SafeConfigTab({ safe, onChange: (field, value) => changes.push([field, value]) });
  const serialized = JSON.stringify(tree);
  assert.match(serialized, /白名单后缀/);
  assert.match(serialized, /密钥/);
  assert.doesNotMatch(serialized, /达到注册次数后开启惩罚/);
  const controls = [];
  const collect = node => {
    if (Array.isArray(node)) return node.forEach(collect);
    if (!node || typeof node !== 'object') return;
    if (typeof node.type === 'function') {
      collect(node.type({ ...node.props, children: node.children }));
      return;
    }
    if (node.props?.onChange) controls.push(node);
    collect(node.children);
    collect(node.props?.children);
  };
  collect(tree);
  const securePath = controls.find(control => control.props.defaultValue === 'admin');
  securePath.props.onChange({ target: { value: 'control' } });
  const whitelist = controls.find(control => Array.isArray(control.props.defaultValue));
  whitelist.props.onChange({ target: { value: 'example.com,example.org' } });
  assert.deepEqual(JSON.parse(JSON.stringify(changes)), [
    ['secure_path', 'control'],
    ['email_whitelist_suffix', ['example.com', 'example.org']],
  ]);
});
