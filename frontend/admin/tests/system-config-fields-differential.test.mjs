// Field-level differential for the config/system page: the original webpack
// module (31644d2b.js, hex of module id "1dM+") is executed unmodified against
// the recovered tab components. Both sides render the same fixture config and
// every ConfigRow is compared field by field: title, description, isChildren,
// control kind, bound value, select options and the (group, field, value)
// produced by probing the change handler — plus the action buttons.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';

const MODULE_DIR =
    '/Users/infsr/Downloads/pro/projects/v2board-recovered-ui-archive/admin/umi/modules';
// hex(31 64 4d 2b) = "1dM+" — the system config page module.
const BUNDLE_FILE = '31644d2b.js';
const PROBE = 'PROBE';

// Leaf markers let the resolver stop at antd shims on both sides.
function makeLeaf(kind) {
    const fn = function LeafComponent() {};
    fn.__leafKind = kind;
    return fn;
}
const ButtonLeaf = makeLeaf('Button');
const InputLeaf = makeLeaf('Input');
const SwitchLeaf = makeLeaf('Switch');
const TabsLeaf = makeLeaf('Tabs');
TabsLeaf.TabPane = makeLeaf('TabPane');
const CardLeaf = makeLeaf('Card');

const React = {
    Component: class {
        constructor(props) {
            this.props = props;
            this.state = {};
        }
        setState(update) {
            const next = typeof update === 'function' ? update(this.state, this.props) : update;
            this.state = { ...this.state, ...next };
        }
    },
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
    Fragment: 'Fragment',
};

const CSS_ONLY = new Set(['+L6B', '5NDa', 'Znn+', 'BoS7']);

function makeWebpackRequire() {
    const modules = {
        q1tI: { __esModule: true, default: React },
        jehZ: { __esModule: true, default: Object.assign },
        p0pE: { __esModule: true, default: Object.assign },
        '/MKj': { __esModule: true, c: () => (component) => component },
        '2/Rp': { __esModule: true, a: ButtonLeaf },
        '5rEg': { __esModule: true, a: InputLeaf },
        ZTPi: { __esModule: true, a: TabsLeaf },
        Sdc0: { __esModule: true, a: SwitchLeaf },
        Bl7J: { __esModule: true, a: CardLeaf },
    };
    const requireFn = (id) => {
        if (CSS_ONLY.has(id)) return {};
        if (!(id in modules)) throw new Error(`Unexpected bundle dependency: ${id}`);
        return modules[id];
    };
    requireFn.r = (exports) => {
        Object.defineProperty(exports, '__esModule', { value: true });
    };
    requireFn.d = (exports, name, getter) => {
        Object.defineProperty(exports, name, { enumerable: true, get: getter });
    };
    requireFn.n = makeNn();
    return requireFn;
}

function makeNn() {
    // webpack's n.n: alias helper exposing the module (or its default) via
    // the returned getter and its ".a" property.
    return (m) => {
        const getter = m && m.__esModule ? () => m.default : () => m;
        Object.defineProperty(getter, 'a', { enumerable: true, get: getter });
        return getter;
    };
}

const FIXTURE = {
    site: {
        app_name: 'SiteName',
        app_description: 'SiteDesc',
        app_url: 'https://site.example',
        force_https: 1,
        logo: '/logo.png',
        subscribe_url: 'https://sub.example',
        subscribe_path: '/sub',
        tos_url: 'https://tos.example',
        stop_register: 0,
        try_out_plan_id: 3,
        try_out_hour: 12,
        currency: 'USD',
        currency_symbol: '$',
    },
    safe: {
        email_verify: 1,
        email_gmail_limit_enable: 0,
        safe_mode_enable: 1,
        secure_path: 'secure',
        email_whitelist_enable: 1,
        email_whitelist_suffix: ['a.com', 'b.com'],
        recaptcha_enable: 1,
        recaptcha_key: 'rk',
        recaptcha_site_key: 'rsk',
        register_limit_by_ip_enable: 1,
        register_limit_count: 7,
        register_limit_expire: 9,
        password_limit_enable: 1,
        password_limit_count: 3,
        password_limit_expire: 5,
    },
    subscribe: {
        plan_change_enable: 1,
        reset_traffic_method: 2,
        surplus_enable: 1,
        allow_new_period: 0,
        new_order_event_id: 1,
        renew_order_event_id: 0,
        change_order_event_id: 1,
        show_info_to_server_enable: 1,
        show_subscribe_method: 2,
        show_subscribe_expire: 45,
    },
    deposit: { deposit_bounus: ['50:18', '100:38'] },
    ticket: { ticket_status: 1 },
    invite: {
        invite_force: 1,
        invite_commission: 10,
        invite_gen_limit: 6,
        invite_never_expire: 1,
        commission_first_time_enable: 0,
        commission_auto_check_enable: 1,
        commission_withdraw_limit: 120,
        commission_withdraw_method: ['支付宝', 'USDT'],
        withdraw_close_enable: 1,
        commission_distribution_enable: 1,
        commission_distribution_l1: 40,
        commission_distribution_l2: 30,
        commission_distribution_l3: 30,
    },
    frontend: {
        frontend_theme_sidebar: 'dark',
        frontend_theme_header: 'light',
        frontend_theme_color: 'black',
        frontend_background_url: '/bg.png',
    },
    server: {
        server_api_url: '/node-api',
        server_token: 'tok',
        server_pull_interval: 60,
        server_push_interval: 90,
        server_node_report_min_traffic: 100,
        server_device_online_min_traffic: 50,
        device_limit_mode: 1,
    },
    email: {
        email_host: 'smtp.example',
        email_port: '465',
        email_encryption: 'ssl',
        email_username: 'mailer',
        email_password: 'secret',
        email_from_address: 'from@example',
        email_template: 'default',
    },
    telegram: {
        telegram_bot_token: '123456:abc',
        telegram_bot_enable: 1,
        telegram_discuss_link: 'https://t.me/group',
    },
    app: {
        windows_version: '1.0',
        windows_download_url: '/w.exe',
        macos_version: '1.1',
        macos_download_url: '/m.dmg',
        android_version: '1.2',
        android_download_url: '/a.apk',
    },
};

const PLANS = [
    { id: 3, name: 'Pro' },
    { id: 5, name: 'Elite' },
];
const TEMPLATES = ['default', 'custom'];

function bundlePageConfig() {
    return {
        ...structuredClone(FIXTURE),
        tabs: 'site',
        fetchLoading: false,
        emailTemplate: TEMPLATES,
        themeTemplate: [],
        setTelegramWebhookLoading: false,
        testSendMailLoading: false,
    };
}

async function loadBundlePage() {
    const source = await fs.readFile(path.join(MODULE_DIR, BUNDLE_FILE), 'utf8');
    const sandbox = {
        module: { exports: {} },
        exports: undefined,
        require: makeWebpackRequire(),
        setTimeout: () => 0,
        clearTimeout: () => {},
    };
    sandbox.exports = sandbox.module.exports;
    const factory = vm.runInNewContext(
        `(function(module, exports, require, n){ return (${source})(module, exports, require); })`,
        sandbox,
        { timeout: 5000 },
    );
    const module = { exports: {} };
    factory(module, module.exports, makeWebpackRequire());
    return module.exports.default;
}

// --- recovered side --------------------------------------------------------

const TAB_SOURCES = {
    site: '../src/pages/config/system/components/SiteConfigTab.tsx',
    safe: '../src/pages/config/system/components/SafeConfigTab.tsx',
    subscribe: '../src/pages/config/system/components/SubscribeConfigTab.tsx',
    deposit: '../src/pages/config/system/components/DepositConfigTab.tsx',
    ticket: '../src/pages/config/system/components/TicketConfigTab.tsx',
    invite: '../src/pages/config/system/components/InviteConfigTab.tsx',
    frontend: '../src/pages/config/system/components/FrontendConfigTab.tsx',
    server: '../src/pages/config/system/components/ServerConfigTab.tsx',
    email: '../src/pages/config/system/components/EmailConfigTab.tsx',
    telegram: '../src/pages/config/system/components/TelegramConfigTab.tsx',
    app: '../src/pages/config/system/components/AppConfigTab.tsx',
};

async function loadRecoveredTabs() {
    const tabs = {};
    const componentCache = new Map();
    // Every config/system sibling component resolves through the same shim.
    const loadComponent = async (basename) => {
        if (componentCache.has(basename)) return componentCache.get(basename);
        const source = await fs.readFile(
            new URL(`../src/pages/config/system/components/${basename}`, import.meta.url),
            'utf8',
        );
        const { code } = await esbuildTransform(source, { format: 'cjs', loader: 'tsx' });
        const module = { exports: {} };
        componentCache.set(basename, module.exports);
        const syncRequire = (id) => {
            if (id === 'react') return React;
            if (id === 'antd/lib/switch') return SwitchLeaf;
            if (id === 'antd/lib/input') return InputLeaf;
            if (id === 'antd/lib/button') return ButtonLeaf;
            if (id.startsWith('./')) {
                const basename2 = `${id.slice(2)}.tsx`;
                if (!componentCache.has(basename2)) {
                    throw new Error(`sibling not preloaded: ${id}`);
                }
                return componentCache.get(basename2);
            }
            if (id === '@/types/systemConfigurationContracts') return {};
            throw new Error(`Unexpected recovered dependency: ${id}`);
        };
        vm.runInNewContext(code, {
            module,
            exports: module.exports,
            React,
            require: syncRequire,
        });
        // esbuild's CJS output reassigns module.exports; refresh the cache.
        componentCache.set(basename, module.exports);
        return module.exports;
    };
    // preload siblings in dependency order
    for (const name of [
        'ConfigRow.tsx',
        'SafeConfigFields.tsx',
        'SiteTrialSettings.tsx',
        'SafeConfigLimits.tsx',
        'SubscribeLinkValidity.tsx',
        'InviteCommissionDistribution.tsx',
    ]) {
        await loadComponent(name);
    }
    for (const [key, file] of Object.entries(TAB_SOURCES)) {
        const mod = await loadComponent(path.basename(file));
        tabs[key] = mod.default;
    }
    return tabs;
}

// --- tree resolution & extraction -----------------------------------------

function resolve(node) {
    if (Array.isArray(node)) return node.flatMap(resolve);
    if (!node || typeof node !== 'object') return node;
    const { type, props, children } = node;
    if (typeof type === 'function') {
        if (type.__leafKind) {
            return { kind: type.__leafKind, props, children: resolve(children || []) };
        }
        const merged = { ...props, children };
        if (type.prototype && type.prototype.render) {
            const instance = new type(merged);
            return { type: type.name, props, children: [resolve(instance.render())] };
        }
        return { type: type.name, props, children: [resolve(type(merged))] };
    }
    return { type, props, children: resolve(children || []) };
}

function flattenText(node) {
    if (node === null || node === undefined || node === false || node === true) return '';
    if (Array.isArray(node)) return node.map(flattenText).join('');
    if (typeof node === 'object') {
        if (node.kind || node.props) return flattenText(node.children);
        return '';
    }
    return String(node);
}

function collectControls(node, out = []) {
    if (Array.isArray(node)) {
        node.forEach((child) => collectControls(child, out));
        return out;
    }
    if (!node || typeof node !== 'object') return out;
    if (node.kind) {
        out.push(node);
        return out;
    }
    if (['input', 'textarea', 'select'].includes(node.type)) {
        out.push({ kind: node.type, props: node.props, children: node.children });
        return out;
    }
    collectControls(node.children, out);
    return out;
}

function extractRows(node, rows = []) {
    if (Array.isArray(node)) {
        node.forEach((child) => extractRows(child, rows));
        return rows;
    }
    if (!node || typeof node !== 'object') return rows;
    if (node.props?.style?.padding === '20px') {
        const left = node.children[0];
        rows.push({
            isChildren: String(node.props.className ?? '').includes('v2board-config-children'),
            title: flattenText(left.children[0]?.children ?? []),
            description: flattenText(left.children[1]?.children ?? []),
            controls: collectControls(node.children[1]),
        });
        return rows;
    }
    extractRows(node.children, rows);
    return rows;
}

const jsonSafe = (value) =>
    value === undefined
        ? null
        : JSON.parse(
              JSON.stringify(value, (_key, child) =>
                  typeof child === 'function' ? '[f]' : child,
              ),
          );

const sameValue = (a, b) =>
    a === b ||
    (Number.isNaN(a) && Number.isNaN(b)) ||
    JSON.stringify(a) === JSON.stringify(b);

function deriveChange(action) {
    if (action.type !== 'config/setState') return [action.type];
    const group = Object.keys(action.payload)[0];
    const payloadGroup = action.payload[group];
    const field = Object.keys(payloadGroup).find(
        (key) => !sameValue(payloadGroup[key], FIXTURE[group]?.[key]),
    );
    assert.ok(field, `probe must change a field in ${group}`);
    return ['setState', group, field, jsonSafe(payloadGroup[field]) ?? null];
}

function controlSignature(control, actions) {
    const before = actions.length;
    if (control.kind === 'Switch') control.props.onChange(!control.props.checked);
    else if (control.kind === 'Button') control.props.onClick();
    else control.props.onChange({ target: { value: PROBE } });
    const fired = actions.slice(before);
    assert.equal(fired.length, 1, `one action per probe (${control.kind})`);

    const base = { kind: control.kind, change: deriveChange(fired[0]) };
    switch (control.kind) {
        case 'Switch':
            return {
                ...base,
                bound: Boolean(control.props.checked),
                checkedChildren: control.props.checkedChildren,
                unCheckedChildren: control.props.unCheckedChildren,
            };
        case 'Input':
            return {
                ...base,
                bound: control.props.defaultValue,
                addonAfter: control.props.addonAfter,
                size: control.props.size,
                type: control.props.type,
            };
        case 'Button':
            return {
                ...base,
                buttonType: control.props.type,
                loading: Boolean(control.props.loading),
                disabled: Boolean(control.props.disabled),
                text: flattenText(control.children),
            };
        case 'select':
            return {
                ...base,
                bound: control.props.value ?? control.props.defaultValue,
                options: (control.children ?? []).map((option) => [
                    option.props.value,
                    flattenText(option),
                ]),
            };
        default:
            return {
                ...base,
                bound: jsonSafe(control.props.defaultValue) ?? null,
                placeholder: control.props.placeholder,
            };
    }
}

function extractFieldMap(resolvedTree, actions) {
    const rows = extractRows(resolvedTree);
    return rows.map((row) => ({
        isChildren: row.isChildren,
        title: row.title,
        description: row.description,
        controls: row.controls.map((control) => controlSignature(control, actions)),
    }));
}

// --- the differential ------------------------------------------------------

test('config/system tabs match the bundle field by field', async (t) => {
    const BundlePage = await loadBundlePage();
    const recoveredTabs = await loadRecoveredTabs();

    const bundleFields = {};
    const recoveredFields = {};

    const dispatchCollector = (actions) => (action) =>
        actions.push(JSON.parse(JSON.stringify(action)));

    for (const key of Object.keys(TAB_SOURCES)) {
        await t.test(`tab ${key}`, () => {
            // bundle side: render the page, slice the pane out of the Tabs
            const bundleActions = [];
            const page = new BundlePage({
                dispatch: dispatchCollector(bundleActions),
                config: bundlePageConfig(),
                plan: { plans: PLANS },
            });
            const tree = resolve(page.render());
            const panes = [];
            (function findPanes(node) {
                if (Array.isArray(node)) return node.forEach(findPanes);
                if (!node || typeof node !== 'object') return;
                if (node.kind === 'TabPane') panes.push(node);
                findPanes(node.children);
            })(tree);
            const pane = panes.find((candidate) => candidate.props.key === key);
            assert.ok(pane, `bundle renders the ${key} pane`);
            bundleFields[key] = extractFieldMap(pane, bundleActions);

            // recovered side: render the tab directly
            const recoveredActions = [];
            const emit = (group, field, value) =>
                recoveredActions.push({
                    type: 'config/setState',
                    payload: { [group]: { [field]: value } },
                });
            const props = {
                site: { site: FIXTURE.site, plans: PLANS, onChange: emit },
                safe: { safe: FIXTURE.safe, onChange: emit },
                subscribe: { subscribe: FIXTURE.subscribe, onChange: emit },
                deposit: { deposit: FIXTURE.deposit, onChange: emit },
                ticket: { ticket: FIXTURE.ticket, onChange: emit },
                invite: { invite: FIXTURE.invite, onChange: emit },
                frontend: { frontend: FIXTURE.frontend, onChange: emit },
                server: { server: FIXTURE.server, onChange: emit },
                email: {
                    email: FIXTURE.email,
                    templates: TEMPLATES,
                    testSendMailLoading: false,
                    onChange: emit,
                    onTestSendMail: () =>
                        recoveredActions.push({ type: 'config/testSendMail' }),
                },
                telegram: {
                    telegram: FIXTURE.telegram,
                    webhookLoading: false,
                    onChange: emit,
                    onSetWebhook: () =>
                        recoveredActions.push({ type: 'config/setTelegramWebhook' }),
                },
                app: { app: FIXTURE.app, onChange: emit },
            }[key];
            recoveredFields[key] = extractFieldMap(
                resolve(recoveredTabs[key](props)),
                recoveredActions,
            );

            assert.deepEqual(
                recoveredFields[key],
                bundleFields[key],
                `tab ${key} field inventory`,
            );
        });
    }

    // every fixture field must have been probed exactly once across the tabs;
    // the artifact saves a few fields under a different group than the tab
    // they are rendered in (see the wiring comments in the tab components).
    const probed = new Map();
    for (const fields of Object.values(bundleFields)) {
        for (const row of fields) {
            for (const control of row.controls) {
                if (control.change[0] !== 'setState') continue;
                const [, group, field] = control.change;
                const mapKey = `${group}.${field}`;
                probed.set(mapKey, (probed.get(mapKey) ?? 0) + 1);
            }
        }
    }
    const QUIRK_ALIASES = {
        'subscribe.show_subscribe_expire': 'safe.show_subscribe_expire',
        'frontend.frontend_theme_sidebar': 'site.frontend_theme_sidebar',
        'frontend.frontend_theme_header': 'site.frontend_theme_header',
    };
    for (const [group, values] of Object.entries(FIXTURE)) {
        for (const field of Object.keys(values)) {
            const mapKey = `${group}.${field}`;
            assert.equal(
                probed.get(QUIRK_ALIASES[mapKey] ?? mapKey),
                1,
                `fixture field ${mapKey} probed once`,
            );
        }
    }
    assert.equal(
        probed.get('subscribe.show_subscribe_expire'),
        undefined,
        'the artifact never saves show_subscribe_expire under subscribe',
    );
    assert.equal(
        probed.get('frontend.frontend_theme_sidebar'),
        undefined,
        'the artifact never saves the theme switches under frontend',
    );
});
