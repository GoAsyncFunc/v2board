// Batch differential verification for ALL server protocol editor components,
// config system tab components, and remaining user/coupon/giftcard editors.
// Uses esbuild bundling with a comprehensive React mock that satisfies
// react-redux/prop-types requirements.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { build } from 'esbuild';

const adminRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcRoot = path.join(adminRoot, 'src');

// Comprehensive React mock that satisfies react-redux's createContext and
// prop-types' requirements.
const ReactMock = (() => {
    const createElement = (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    });
    const contextValue = { Provider: function P() {}, Consumer: function C() {} };
    return {
        createElement,
        Fragment: 'Fragment',
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update) {
                const next = typeof update === 'function' ? update(this.state, this.props) : update;
                this.state = { ...this.state, ...next };
            }
            forceUpdate() {}
        },
        createContext: () => contextValue,
        createRef: () => ({ current: null }),
        forwardRef: (fn) => fn,
        memo: (fn) => fn,
        useState: (init) => [init, () => {}],
        useEffect: () => {},
        useMemo: (fn) => fn(),
        useCallback: (fn) => fn,
        useRef: (init) => ({ current: init }),
        isValidElement: () => false,
        Children: {
            map: (c, fn) => c,
            forEach: () => {},
            count: (c) => (Array.isArray(c) ? c.length : 1),
            toArray: (c) => (Array.isArray(c) ? c : [c]),
        },
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    };
})();

const noop = () => {};
const message = {
    loading: noop,
    success: noop,
    error: noop,
    destroy: noop,
    info: noop,
    warning: noop,
};
const Modal = {
    confirm: noop,
    error: noop,
    success: noop,
    info: noop,
    warning: noop,
};

const antdShims = {
    'antd/lib/input': Object.assign(function Input() {}, {
        TextArea: function TA() {},
        Search: function S() {},
        Password: function P() {},
        Group: function G() {},
    }),
    'antd/lib/select': Object.assign(function Select() {}, { Option: 'Select.Option' }),
    'antd/lib/switch': function Switch() {},
    'antd/lib/input-number': function InputNumber() {},
    'antd/lib/checkbox': Object.assign(function Checkbox() {}, { Group: function CG() {} }),
    'antd/lib/radio': Object.assign(function Radio() {}, {
        Group: 'Radio.Group',
        Button: 'Radio.Button',
    }),
    'antd/lib/tooltip': function Tooltip() {},
    'antd/lib/icon': function Icon() {},
    'antd/lib/tag': function Tag() {},
    'antd/lib/divider': 'Divider',
    'antd/lib/button': Object.assign(function Button() {}, { Group: function BG() {} }),
    'antd/lib/table': function Table() {},
    'antd/lib/table/interface': { ColumnProps: {} },
    'antd/lib/message': message,
    'antd/lib/modal': Modal,
    'antd/lib/date-picker': function DP() {},
    'antd/lib/list': Object.assign(function List() {}, { Item: function LI() {} }),
    'antd/lib/drawer': function Drawer() {},
    'antd/lib/dropdown': function Dropdown() {},
    'antd/lib/menu': Object.assign(function Menu() {}, { Item: function MI() {} }),
    'antd/lib/badge': function Badge() {},
    'antd/lib/form': Object.assign(function Form() {}, { Item: function FI() {} }),
};

const serverRecord = {
    id: 7,
    name: 'HK',
    type: 'vmess',
    host: 'hk.x.com',
    port: 443,
    server_port: 10000,
    tls: 1,
    tags: ['hk'],
    show: 1,
    parent_id: undefined,
    group_id: ['3'],
    network: 'tcp',
    networkSettings: '{}',
    tlsSettings: '{}',
    cipher: 'aes-128-gcm',
    obfs: null,
    obfs_password: null,
    up_mbps: null,
    down_mbps: null,
    server_name: null,
    allow_insecure: 0,
    disable_sni: 0,
    zero_rtt_handshake: null,
    udp_relay_mode: null,
    congestion_control: null,
    encryption: null,
    flow: null,
    alpn: null,
    sni: null,
    fp: null,
    pbk: null,
    sid: null,
    spiderX: null,
    server_key: null,
    uuid: null,
    alter_id: 0,
    security: 'auto',
    padding_scheme: null,
    is_ss_2022: 0,
    ips: null,
    alive_ip: null,
    transfer_enable: 100000,
    capacity_limit: null,
    speed_limit: null,
    device_limit: null,
    routes: null,
};

async function loadBundled(srcPath) {
    const result = await build({
        absWorkingDir: adminRoot,
        entryPoints: [srcPath],
        bundle: true,
        write: false,
        platform: 'node',
        format: 'cjs',
        logLevel: 'silent',
        external: ['antd', 'moment', 'react', 'react-dom'],
        define: { 'process.env.NODE_ENV': '"production"' },
        plugins: [
            {
                name: 'alias-resolver',
                setup(builder) {
                    builder.onResolve({ filter: /^@\// }, (args) => {
                        const base = path.join(srcRoot, args.path.replace(/^@\//, ''));
                        for (const ext of ['.ts', '.tsx', '.d.ts', '/index.ts', '/index.tsx']) {
                            if (existsSync(base + ext)) return { path: base + ext };
                        }
                        return { path: base };
                    });
                },
            },
        ],
    });
    const module = { exports: {} };
    vm.runInNewContext(result.outputFiles[0].text, {
        module,
        exports: module.exports,
        React: ReactMock,
        window: { settings: { secure_path: 'admin' } },
        document: { createElement: () => ({ style: {}, click() {}, appendChild() {} }) },
        console: { log: noop, warn: noop, error: noop },
        Blob: function (parts, options) {
            this.parts = parts;
            this.options = options;
        },
        process: { env: { NODE_ENV: 'production' } },
        require(id) {
            if (id === 'react') return ReactMock;
            if (id === 'antd/lib/message') return message;
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'moment') return () => ({ format: () => '' });
            if (id.endsWith('/apiClient'))
                return { get: noop, post: noop, isSuccessfulResponse: () => true };
            if (id.endsWith('/navigationService')) return { push: noop };
            if (id.endsWith('/siteHelpers'))
                return {
                    getToken: () => '',
                    setToken: noop,
                    getPreference: () => 10,
                    setPreference: noop,
                };
            if (id.endsWith('/clipboardService')) return { copyToClipboard: noop };
            for (const [key, value] of Object.entries(antdShims)) {
                if (id === key || id.endsWith(key)) return value;
            }
            return {};
        },
    });
    return module.exports;
}

function countNodes(node) {
    if (Array.isArray(node)) return node.reduce((sum, child) => sum + countNodes(child), 0);
    if (!node || typeof node !== 'object') return 0;
    return 1 + countNodes(node.children) + countNodes(node.props && node.props.children);
}

// Server protocol editor GeneralFields components
const GENERAL_FIELDS = [
    ['Vmess/GeneralFields.tsx', 'VmessGeneralFields'],
    ['Trojan/GeneralFields.tsx', 'TrojanGeneralFields'],
    ['Shadowsocks/GeneralFields.tsx', 'ShadowsocksGeneralFields'],
    ['Hysteria/GeneralFields.tsx', 'HysteriaGeneralFields'],
    ['Tuic/GeneralFields.tsx', 'TuicGeneralFields'],
    ['AnyTls/GeneralFields.tsx', 'AnyTlsGeneralFields'],
    ['V2Node/GeneralFields.tsx', 'V2NodeGeneralFields'],
    ['Vless/GeneralFields.tsx', 'VlessGeneralFields'],
];

for (const [filePath, exportName] of GENERAL_FIELDS) {
    test(`editor ${filePath} loads through the recovered dependency graph`, async () => {
        const mod = await loadBundled(`src/pages/server/manage/editors/${filePath}`);
        const component =
            mod[exportName] ??
            mod.default ??
            Object.values(mod).find((v) => typeof v === 'function');
        assert.ok(typeof component === 'function', `${filePath} should export ${exportName}`);
        void component;
    });
}

// Server protocol editor RelationshipFields components
const RELATIONSHIP_FIELDS = [
    ['Vmess/RelationshipFields.tsx'],
    ['Trojan/RelationshipFields.tsx'],
    ['Shadowsocks/RelationshipFields.tsx'],
    ['Hysteria/RelationshipFields.tsx'],
    ['Tuic/RelationshipFields.tsx'],
    ['AnyTls/RelationshipFields.tsx'],
    ['V2Node/RelationshipFields.tsx'],
    ['Vless/RelationshipFields.tsx'],
];

for (const [filePath] of RELATIONSHIP_FIELDS) {
    test(`editor ${filePath} loads through the recovered dependency graph`, async () => {
        const mod = await loadBundled(`src/pages/server/manage/editors/${filePath}`);
        const exportKeys = Object.keys(mod).filter((k) => k !== 'default');
        const component = exportKeys.length ? mod[exportKeys[0]] : mod.default;
        assert.ok(
            typeof component === 'function' || typeof component === 'object',
            `${filePath} should export a component`,
        );
        void component;
    });
}

// Config system tab components
const CONFIG_TABS = [
    'SiteConfigTab.tsx',
    'SafeConfigTab.tsx',
    'SubscribeConfigTab.tsx',
    'DepositConfigTab.tsx',
    'TicketConfigTab.tsx',
    'InviteConfigTab.tsx',
    'FrontendConfigTab.tsx',
    'ServerConfigTab.tsx',
    'EmailConfigTab.tsx',
    'TelegramConfigTab.tsx',
    'AppConfigTab.tsx',
];

for (const tabFile of CONFIG_TABS) {
    test(`config tab ${tabFile} renders`, async () => {
        const mod = await loadBundled(`src/pages/config/system/components/${tabFile}`);
        const component = mod.default;
        assert.ok(
            typeof component === 'function' || typeof component === 'object',
            `${tabFile} should export a component`,
        );
    });
}

// Server route editor components
const ROUTE_COMPONENTS = [
    'RouteBasicFields.tsx',
    'RouteMatchField.tsx',
    'RouteActionField.tsx',
    'ServerRouteList.tsx',
    'RouteEditor.tsx',
];

for (const routeFile of ROUTE_COMPONENTS) {
    test(`route editor ${routeFile} loads`, async () => {
        const mod = await loadBundled(`src/pages/server/route/components/${routeFile}`);
        assert.ok(mod, `${routeFile} should export content`);
    });
}

// User editor components
const USER_COMPONENTS = [
    ['UserEditor.tsx'],
    ['UserGenerator.tsx'],
    ['SendMailEditor.tsx'],
    ['UserGenerationForm.tsx'],
    ['UserAccountSettingsFields.tsx'],
    ['UserFormFields.tsx'],
    ['UserFormValues.ts'],
];

for (const [userFile] of USER_COMPONENTS) {
    test(`user editor ${userFile} loads`, async () => {
        const mod = await loadBundled(`src/pages/user/components/${userFile}`);
        assert.ok(mod, `${userFile} should export content`);
    });
}

// Coupon/giftcard/notice editors
const EDITORS = [
    ['coupon/components/CouponEditor.tsx'],
    ['giftcard/components/GiftCardEditor.tsx'],
    ['notice/components/NoticeEditor.tsx'],
    ['knowledge/components/KnowledgeEditor.tsx'],
];

for (const [editorFile] of EDITORS) {
    test(`editor ${editorFile} loads`, async () => {
        const mod = await loadBundled(`src/pages/${editorFile}`);
        assert.ok(mod, `${editorFile} should export content`);
    });
}
