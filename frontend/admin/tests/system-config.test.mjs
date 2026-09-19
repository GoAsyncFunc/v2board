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
    ['subscribe', '../src/components/config/SubscribeConfigTab.jsx'],
    ['deposit', '../src/components/config/DepositConfigTab.jsx'],
    ['ticket', '../src/components/config/TicketConfigTab.jsx'],
    ['invite', '../src/components/config/InviteConfigTab.jsx'],
    ['frontend', '../src/components/config/FrontendConfigTab.jsx'],
    ['app', '../src/components/config/AppConfigTab.jsx'],
    ['telegram', '../src/components/config/TelegramConfigTab.jsx'],
    ['email', '../src/components/config/EmailConfigTab.jsx'],
    ['server', '../src/components/config/ServerConfigTab.jsx'],
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
        if (id.includes('SubscribeConfigTab')) return components.subscribe;
        if (id.includes('DepositConfigTab')) return components.deposit;
        if (id.includes('TicketConfigTab')) return components.ticket;
        if (id.includes('InviteConfigTab')) return components.invite;
        if (id.includes('FrontendConfigTab')) return components.frontend;
        if (id.includes('AppConfigTab')) return components.app;
        if (id.includes('TelegramConfigTab')) return components.telegram;
        if (id.includes('EmailConfigTab')) return components.email;
        if (id.includes('ServerConfigTab')) return components.server;
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
    SubscribeConfigTab: components.subscribe.default,
    DepositConfigTab: components.deposit.default,
    TicketConfigTab: components.ticket.default,
    InviteConfigTab: components.invite.default,
    FrontendConfigTab: components.frontend.default,
    AppConfigTab: components.app.default,
    TelegramConfigTab: components.telegram.default,
    EmailConfigTab: components.email.default,
    ServerConfigTab: components.server.default,
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

test('Subscribe config tab maps reset, event and link mode controls', async () => {
  const { SubscribeConfigTab } = await loadConfig();
  const changes = [];
  const subscribe = {
    plan_change_enable: 0, reset_traffic_method: 0, surplus_enable: 0,
    allow_new_period: 0, new_order_event_id: 0, renew_order_event_id: 0,
    change_order_event_id: 0, show_info_to_server_enable: 0,
    show_subscribe_method: 2, show_subscribe_expire: 30,
  };
  const tree = SubscribeConfigTab({
    subscribe,
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
  assert.match(JSON.stringify(tree), /订阅链接有效时间/);
  controls.find(control => control.props.value === 0 && control.type === 'select')
    .props.onChange({ target: { value: '4' } });
  controls.find(control => control.props.value === 2 && control.type === 'select')
    .props.onChange({ target: { value: '1' } });
  controls.find(control => control.props.defaultValue === 30)
    .props.onChange({ target: { value: '60' } });
  assert.deepEqual(JSON.parse(JSON.stringify(changes)), [
    ['reset_traffic_method', '4'],
    ['show_subscribe_method', '1'],
    ['show_subscribe_expire', '60'],
  ]);
});

test('Deposit config tab splits reward rules and saves them under deposit', async () => {
  const { DepositConfigTab } = await loadConfig();
  const changes = [];
  const tree = DepositConfigTab({
    deposit: { deposit_bounus: ['50:18', '100:38'] },
    onChange: (field, value) => changes.push([field, value]),
  });
  const row = tree.children[0].type({ ...tree.children[0].props, children: tree.children[0].children });
  const textarea = row.children[1].children[0][0];
  textarea.props.onChange({ target: { value: '50:18,200:88' } });
  assert.deepEqual(JSON.parse(JSON.stringify(changes)), [
    ['deposit_bounus', ['50:18', '200:88']],
  ]);
});

test('Ticket config tab preserves all ticket access options', async () => {
  const { TicketConfigTab } = await loadConfig();
  const changes = [];
  const tree = TicketConfigTab({
    ticket: { ticket_status: 1 },
    onChange: (field, value) => changes.push([field, value]),
  });
  const row = tree.children[0].type({ ...tree.children[0].props, children: tree.children[0].children });
  const select = row.children[1].children[0][0];
  assert.equal(select.props.value, 1);
  assert.equal(select.children.length, 3);
  select.props.onChange({ target: { value: '2' } });
  assert.deepEqual(changes, [['ticket_status', '2']]);
});

test('Invite config tab preserves invitation, withdrawal and distribution controls', async () => {
  const { InviteConfigTab } = await loadConfig();
  const changes = [];
  const invite = {
    invite_force: 1, invite_commission: 10, invite_gen_limit: 5,
    invite_never_expire: 0, commission_first_time_enable: 1,
    commission_auto_check_enable: 0, commission_withdraw_limit: 100,
    commission_withdraw_method: ['支付宝', 'USDT'], withdraw_close_enable: 0,
    commission_distribution_enable: 1, commission_distribution_l1: 50,
    commission_distribution_l2: 30, commission_distribution_l3: 20,
  };
  const tree = InviteConfigTab({
    invite,
    onChange: (field, value) => changes.push([field, value]),
  });
  const rendered = JSON.stringify(tree);
  assert.match(rendered, /一级邀请人比例/);
  assert.match(rendered, /三级邀请人比例/);
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
  controls.find(control => control.props.defaultValue === 10)
    .props.onChange({ target: { value: '20' } });
  controls.find(control => Array.isArray(control.props.defaultValue))
    .props.onChange({ target: { value: '支付宝,贝宝' } });
  assert.deepEqual(JSON.parse(JSON.stringify(changes)), [
    ['invite_commission', 20],
    ['commission_withdraw_method', ['支付宝', '贝宝']],
  ]);
});

test('Frontend config tab maps theme switches, color and background settings', async () => {
  const { FrontendConfigTab } = await loadConfig();
  const changes = [];
  const tree = FrontendConfigTab({
    frontend: {
      frontend_theme_sidebar: 'dark',
      frontend_theme_header: 'light',
      frontend_theme_color: 'default',
      frontend_background_url: '/background.png',
    },
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
  assert.match(JSON.stringify(tree), /前后分离/);
  controls.filter(control => control.type === 'Switch')[0].props.onChange(true);
  controls.filter(control => control.type === 'Switch')[1].props.onChange(false);
  controls.find(control => control.type === 'select').props.onChange({ target: { value: 'black' } });
  controls.find(control => control.props.defaultValue === '/background.png')
    .props.onChange({ target: { value: '/new.png' } });
  assert.deepEqual(changes, [
    ['frontend_theme_sidebar', 'light'],
    ['frontend_theme_header', 'dark'],
    ['frontend_theme_color', 'black'],
    ['frontend_background_url', '/new.png'],
  ]);
});

test('App config tab maps platform versions and download URLs to app fields', async () => {
  const { AppConfigTab } = await loadConfig();
  const changes = [];
  const tree = AppConfigTab({
    app: {
      windows_version: '1.0.0', windows_download_url: '/win.exe',
      macos_version: '1.0.0', macos_download_url: '/mac.dmg',
      android_version: '1.0.0', android_download_url: '/app.apk',
    },
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
  assert.match(JSON.stringify(tree), /用于自有客户端/);
  controls.find(control => control.props.defaultValue === '1.0.0')
    .props.onChange({ target: { value: '2.0.0' } });
  controls.find(control => control.props.defaultValue === '/win.exe')
    .props.onChange({ target: { value: '/new.exe' } });
  assert.deepEqual(changes, [
    ['windows_version', '2.0.0'],
    ['windows_download_url', '/new.exe'],
  ]);
});

test('Telegram config tab conditionally exposes webhook setup and maps bot settings', async () => {
  const { TelegramConfigTab } = await loadConfig();
  const changes = [];
  let webhookCalls = 0;
  const tree = TelegramConfigTab({
    telegram: {
      telegram_bot_token: 'token',
      telegram_bot_enable: 0,
      telegram_discuss_link: 'https://t.me/group',
    },
    webhookLoading: false,
    onChange: (field, value) => changes.push([field, value]),
    onSetWebhook: () => { webhookCalls += 1; },
  });
  const controls = [];
  const collect = node => {
    if (Array.isArray(node)) return node.forEach(collect);
    if (!node || typeof node !== 'object') return;
    if (typeof node.type === 'function') {
      collect(node.type({ ...node.props, children: node.children }));
      return;
    }
    if (node.props?.onChange || node.props?.onClick) controls.push(node);
    collect(node.children);
    collect(node.props?.children);
  };
  collect(tree);
  assert.match(JSON.stringify(tree), /设置Webhook/);
  controls.find(control => control.props.onClick).props.onClick();
  controls.find(control => control.props.onChange && control.props.defaultValue === 'https://t.me/group')
    .props.onChange({ target: { value: 'https://t.me/new' } });
  assert.equal(webhookCalls, 1);
  assert.deepEqual(changes, [['telegram_discuss_link', 'https://t.me/new']]);
});

test('Email config tab maps SMTP fields, templates and test-mail action', async () => {
  const { EmailConfigTab } = await loadConfig();
  const changes = [];
  let testMailCalls = 0;
  const tree = EmailConfigTab({
    email: {
      email_host: 'smtp.example.test', email_port: '465', email_encryption: 'ssl',
      email_username: 'mailer', email_password: 'secret', email_from_address: 'from@example.test',
      email_template: 'default',
    },
    templates: ['default', 'custom'],
    testSendMailLoading: false,
    onChange: (field, value) => changes.push([field, value]),
    onTestSendMail: () => { testMailCalls += 1; },
  });
  const controls = [];
  const collect = node => {
    if (Array.isArray(node)) return node.forEach(collect);
    if (!node || typeof node !== 'object') return;
    if (typeof node.type === 'function') {
      collect(node.type({ ...node.props, children: node.children }));
      return;
    }
    if (node.props?.onChange || node.props?.onClick) controls.push(node);
    collect(node.children);
    collect(node.props?.children);
  };
  collect(tree);
  assert.match(JSON.stringify(tree), /SMTP服务器地址/);
  controls.find(control => control.props.defaultValue === 'smtp.example.test')
    .props.onChange({ target: { value: 'smtp.new.test' } });
  controls.find(control => control.props.onClick).props.onClick();
  assert.equal(testMailCalls, 1);
  assert.deepEqual(changes, [['email_host', 'smtp.new.test']]);
});

test('Server config tab maps node endpoints, numeric intervals and device mode', async () => {
  const { ServerConfigTab } = await loadConfig();
  const changes = [];
  const tree = ServerConfigTab({
    server: {
      server_api_url: '/api', server_token: 'secret',
      server_pull_interval: 60, server_push_interval: 60,
      server_node_report_min_traffic: 100, server_device_online_min_traffic: 50,
      device_limit_mode: 0,
    },
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
  controls.find(control => control.props.defaultValue === '/api')
    .props.onChange({ target: { value: '/node-api' } });
  controls.find(control => control.props.defaultValue === 60)
    .props.onChange({ target: { value: '120' } });
  assert.deepEqual(changes, [
    ['server_api_url', '/node-api'],
    ['server_pull_interval', '120'],
  ]);
});
