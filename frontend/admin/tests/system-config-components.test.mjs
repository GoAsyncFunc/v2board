import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    // Like the real React, nested array children are flattened one level.
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
};
const ConfigRow = function ConfigRow() {};
const Switch = function Switch() {};
const Tabs = Object.assign(function Tabs() {}, { TabPane: function TabPane() {} });
const Modal = Object.assign(function Modal() {}, {
    error: () => {},
    success: () => {},
});

const SHIM = {
    './ConfigRow': ConfigRow,
    'antd/lib/switch': Switch,
    'antd/lib/tabs': Tabs,
    'antd/lib/modal': Modal,
};

const modals = [];
Object.defineProperty(Modal, 'error', {
    value: (options) => modals.push({ variant: 'error', options }),
});
Object.defineProperty(Modal, 'success', {
    value: (options) => modals.push({ variant: 'success', options }),
});

async function load(relativePath) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const notifications = [];
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/message') {
                return {
                    error: (options) => notifications.push({ variant: 'error', options }),
                    success: (options) => notifications.push({ variant: 'success', options }),
                };
            }
            for (const [key, value] of Object.entries(SHIM)) {
                if (id === key || id.endsWith(key)) return value;
            }
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return Object.assign(module.exports, { notifications });
}

function findNodes(tree, type) {
    if (Array.isArray(tree)) return tree.flatMap((child) => findNodes(child, type));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(tree.type === type ? [tree] : []),
        ...findNodes(tree.children, type),
        ...findNodes(tree.props?.children, type),
    ];
}

const plain = (value) => JSON.parse(JSON.stringify(value));

test('mail test result renders the log rows and picks the notification variant', async () => {
    const runtime = await load('../src/pages/config/system/components/MailTestResult.tsx');
    const { default: MailTestResult, showMailTestResult } = runtime;

    const failed = MailTestResult({
        log: {
            error: 'SMTP timeout',
            email: 'to@x.com',
            config: { host: 'smtp.x.com', port: 465 },
        },
    });
    const rows = findNodes(failed, 'div').slice(1);
    assert.deepEqual(
        rows.map((row) => row.children.map((span) => span.children[0]).join('')),
        [
            '失败原因:SMTP timeout',
            '收信地址:to@x.com',
            '发信服务器:smtp.x.com',
            '发信端口:465',
            '发信加密方式:',
            '发信用户名:',
        ],
    );

    void failed;
    // The bundle shows the mail-test result in an antd Modal (module 366c4b4b);
    // the variant picks error/success from the log.
    showMailTestResult({ error: 'boom' });
    showMailTestResult({ error: undefined, email: 'ok@x.com' });
    assert.deepEqual(
        modals.map((call) => [call.variant, call.options.title]),
        [
            ['error', '发送失败'],
            ['success', '发送成功'],
        ],
    );
    const content = modals[1].options.content;
    assert.equal(content.type, MailTestResult);
    assert.deepEqual(plain(content.props.log), { email: 'ok@x.com' });
});

test('invite commission distribution renders three levels only when enabled', async () => {
    const { default: InviteCommissionDistribution } = await load(
        '../src/pages/config/system/components/InviteCommissionDistribution.tsx',
    );
    const changes = [];
    const TextSetting = function TextSetting() {};
    const disabled = InviteCommissionDistribution({
        invite: { commission_distribution_enable: 0 },
        onChange: (field, value) => changes.push([field, value]),
        TextSetting,
    });
    assert.equal(disabled, null);

    const tree = InviteCommissionDistribution({
        invite: { commission_distribution_enable: '1', commission_distribution_l1: 50 },
        onChange: (field, value) => changes.push([field, value]),
        TextSetting,
    });
    const rows = findNodes(tree, TextSetting);
    assert.deepEqual(
        rows.map((row) => [row.props.title, row.props.value, row.props.isChildren]),
        [
            ['一级邀请人比例', 50, true],
            ['二级邀请人比例', undefined, true],
            ['三级邀请人比例', undefined, true],
        ],
    );
    rows[2].props.onChange(10);
    assert.deepEqual(plain(changes), [['commission_distribution_l3', 10]]);
});

test('site trial settings toggle the hour field with the plan select', async () => {
    const { default: SiteTrialSettings } = await load(
        '../src/pages/config/system/components/SiteTrialSettings.tsx',
    );
    const changes = [];
    const plans = [
        { id: 1, name: 'Basic' },
        { id: 2, name: 'Pro' },
    ];
    const tree = SiteTrialSettings({
        site: { try_out_plan_id: 0, try_out_hour: 2 },
        plans,
        onChange: (field, value) => changes.push([field, value]),
    });
    const select = findNodes(tree, 'select')[0];
    assert.deepEqual(
        select.children.map((option) => [option.props.value, option.children[0]]),
        [
            [0, '关闭'],
            [1, 'Basic'],
            [2, 'Pro'],
        ],
    );
    assert.equal(findNodes(tree, 'input').length, 0, 'hour input hidden while closed');
    select.props.onChange({ target: { value: 1 } });
    assert.deepEqual(plain(changes), [['try_out_plan_id', 1]]);

    const opened = SiteTrialSettings({
        site: { try_out_plan_id: 1, try_out_hour: 2 },
        plans,
        onChange: (field, value) => changes.push([field, value]),
    });
    const hourInput = findNodes(opened, 'input')[0];
    assert.equal(hourInput.props.defaultValue, 2);
    hourInput.props.onChange({ target: { value: 24 } });
    assert.deepEqual(plain(changes).at(-1), ['try_out_hour', 24]);
});

test('subscribe link validity renders only for the expire method', async () => {
    const { default: SubscribeLinkValidity } = await load(
        '../src/pages/config/system/components/SubscribeLinkValidity.tsx',
    );
    const changes = [];
    assert.equal(
        SubscribeLinkValidity({ subscribe: { show_subscribe_method: 1 }, onChange: () => {} }),
        null,
    );
    const tree = SubscribeLinkValidity({
        subscribe: { show_subscribe_method: '2', show_subscribe_expire: 60 },
        onChange: (field, value) => changes.push([field, value]),
    });
    const row = findNodes(tree, ConfigRow)[0];
    assert.equal(row.props.title, '订阅链接有效时间(分钟)');
    const input = findNodes(tree, 'input')[0];
    assert.equal(input.props.defaultValue, 60);
    input.props.onChange({ target: { value: '30' } });
    assert.deepEqual(plain(changes), [['show_subscribe_expire', '30']]);
});

test('safe config field helpers bind text and toggle inputs', async () => {
    const { TextSetting, ToggleSetting } = await load(
        '../src/pages/config/system/components/SafeConfigFields.tsx',
    );
    const changes = [];
    const text = TextSetting({
        title: '安全门',
        description: 'd',
        placeholder: 'p',
        value: 'abc',
        onChange: (event) => changes.push(['text', event.target.value]),
    });
    const row = findNodes(text, ConfigRow)[0];
    assert.deepEqual([row.props.title, row.props.description], ['安全门', 'd']);
    findNodes(text, 'input')[0].props.onChange({ target: { value: 'xyz' } });
    assert.deepEqual(plain(changes), [['text', 'xyz']]);

    const area = TextSetting({
        title: 't',
        description: 'd',
        placeholder: 'p',
        multiline: true,
        rows: 6,
        onChange: (event) => changes.push(['area', event.target.value]),
    });
    const textarea = findNodes(area, 'textarea')[0];
    assert.equal(textarea.props.rows, 6);
    textarea.props.onChange({ target: { value: 'line' } });
    assert.deepEqual(plain(changes).at(-1), ['area', 'line']);

    const toggle = ToggleSetting({
        title: '开关',
        description: 'd',
        value: '0',
        onChange: (value) => changes.push(['toggle', value]),
    });
    const on = ToggleSetting({
        title: '开关',
        description: 'd',
        value: '1',
        onChange: (value) => changes.push(['toggle', value]),
    });
    assert.equal(findNodes(toggle, Switch)[0].props.checked, false);
    assert.equal(findNodes(on, Switch)[0].props.checked, true);
    findNodes(toggle, Switch)[0].props.onChange(true);
    findNodes(on, Switch)[0].props.onChange(false);
    assert.deepEqual(plain(changes).slice(-2), [
        ['toggle', 1],
        ['toggle', 0],
    ]);
});

test('system config tabs wire every group through the shared change callback', async () => {
    const tabMocks = {};
    const tabKeys = [
        'site',
        'safe',
        'subscribe',
        'deposit',
        'ticket',
        'invite',
        'frontend',
        'server',
        'email',
        'telegram',
        'app',
    ];
    for (const key of tabKeys) tabMocks[key] = function Tab() {};
    const shim = {
        './ConfigRow': ConfigRow,
        'antd/lib/switch': Switch,
        'antd/lib/tabs': Tabs,
    };
    const source = await fs.readFile(
        new URL('../src/pages/config/system/components/SystemConfigTabs.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const config = { tabs: 'safe' };
    for (const key of tabKeys) config[key] = { key };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/tabs') return Tabs;
            for (const key of tabKeys) {
                if (id.endsWith(`${key[0].toUpperCase()}${key.slice(1)}ConfigTab`))
                    return tabMocks[key];
            }
            for (const [key, value] of Object.entries(shim)) {
                if (id === key || id.endsWith(key)) return value;
            }
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    const changes = [];
    const tree = module.exports.default({
        config,
        onChange: (group, field, value) => changes.push([group, field, value]),
        onChangeTab: (tab) => changes.push(['tab', tab]),
        onSetWebhook: () => changes.push(['webhook']),
        onTestSendMail: () => changes.push(['mail']),
        plans: [],
    });

    const panes = findNodes(tree, Tabs.TabPane);
    assert.equal(panes.length, tabKeys.length);
    assert.deepEqual(
        panes.map((pane) => [pane.props.tab, pane.props.key]),
        [
            ['站点', 'site'],
            ['安全', 'safe'],
            ['订阅', 'subscribe'],
            ['充值', 'deposit'],
            ['工单', 'ticket'],
            ['邀请&佣金', 'invite'],
            ['个性化', 'frontend'],
            ['节点', 'server'],
            ['邮件', 'email'],
            ['Telegram', 'telegram'],
            ['APP', 'app'],
        ],
    );
    findNodes(tree, Tabs)[0].props.onChange('telegram');
    assert.deepEqual(plain(changes), [['tab', 'telegram']]);

    // Each tab receives its config group and a group-bound change callback.
    for (const [index, key] of tabKeys.entries()) {
        const tabProps = panes[index].children[0].props;
        assert.deepEqual(tabProps[key], { key });
        tabProps.onChange('field', 'v');
        assert.deepEqual(plain(changes).at(-1), [key, 'field', 'v']);
    }
});
