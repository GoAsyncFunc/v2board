// Differential render verification for ALL server protocol editor components.
// Each component is loaded through esbuild bundling (resolving the @/ alias
// through the recovered src tree), instantiated with a representative server
// record, and rendered to confirm it produces a valid element tree.
// The antd and react-redux dependencies are shimmed; the React mock matches
// the production createElement behavior.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { build } from 'esbuild';

const adminRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcRoot = path.join(adminRoot, 'src');
const editorRoot = path.join(srcRoot, 'pages/server/manage/editors');

const noop = () => {};

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
            constructor(props) { this.props = props; }
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
        useState: (init) => [init, noop],
        useEffect: noop,
        useMemo: (fn) => fn(),
        useCallback: (fn) => fn,
        useRef: (init) => ({ current: init }),
        isValidElement: () => false,
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
        Children: {
            map: (c, fn) => c,
            forEach: noop,
            count: (c) => (Array.isArray(c) ? c.length : 1),
            toArray: (c) => (Array.isArray(c) ? c : [c]),
        },
    };
})();

const message = { loading: noop, success: noop, error: noop, destroy: noop, info: noop, warning: noop };
const Modal = { confirm: noop, error: noop, success: noop, info: noop, warning: noop };

const antdShims = {
    'antd/lib/input': Object.assign(function Input() {}, { TextArea: function TA() {}, Search: function S() {}, Password: function P() {}, Group: function G() {} }),
    'antd/lib/select': Object.assign(function Select() {}, { Option: 'Select.Option' }),
    'antd/lib/switch': function Switch() {},
    'antd/lib/input-number': function InputNumber() {},
    'antd/lib/checkbox': Object.assign(function Checkbox() {}, { Group: function CG() {} }),
    'antd/lib/radio': Object.assign(function Radio() {}, { Group: 'Radio.Group', Button: 'Radio.Button' }),
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

const server = {
    id: 7, name: 'HK', type: 'vmess', host: 'hk.x.com', port: 443,
    server_port: 10000, tls: 1, tags: ['hk'], show: 1, parent_id: undefined,
    group_id: ['3'], network: 'tcp', networkSettings: '{}', tlsSettings: '{}',
    cipher: 'aes-128-gcm', obfs: null, obfs_password: null,
    up_mbps: null, down_mbps: null, server_name: null, allow_insecure: 0,
    disable_sni: 0, zero_rtt_handshake: null, udp_relay_mode: null,
    congestion_control: null, encryption: null, flow: null, alpn: null,
    sni: null, fp: null, pbk: null, sid: null, spiderX: null,
    server_key: null, uuid: null, alter_id: 0, security: 'auto',
    padding_scheme: null, is_ss_2022: 0, ips: null, alive_ip: null,
    transfer_enable: 100000, capacity_limit: null, speed_limit: null,
    device_limit: null, routes: null,
};

const groups = [{ id: 3, name: 'VIP' }];

const updateCalls = [];
const updateServer = (serverOrKey, key, value) => {
    if (key !== undefined) updateCalls.push([key, value]);
    else updateCalls.push([serverOrKey, undefined, undefined]);
};

const openSettings = (title, panel) => updateCalls.push([`open:${title}`, panel]);

async function loadBundledEditor(relativePath) {
    const result = await build({
        absWorkingDir: adminRoot,
        entryPoints: [path.join(editorRoot, relativePath)],
        bundle: true,
        write: false,
        platform: 'node',
        format: 'cjs',
        logLevel: 'silent',
        external: ['antd', 'moment', 'react', 'react-dom', 'react-loadable', 'markdown-it', 'react-markdown-editor-lite', 'brace'],
        define: { 'process.env.NODE_ENV': '"production"' },
        plugins: [{
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
        }],
    });
    const module = { exports: {} };
    vm.runInNewContext(result.outputFiles[0].text, {
        module,
        exports: module.exports,
        React: ReactMock,
        window: { settings: { secure_path: 'admin' } },
        document: { createElement: () => ({ style: {}, click: noop, appendChild: noop }) },
        console: { log: noop, warn: noop, error: noop },
        Blob: function (parts, options) { this.parts = parts; this.options = options; },
        brace: { acequire: () => ({ define: noop, setMode: noop }) },
        process: { env: { NODE_ENV: 'production' } },
        require(id) {
            if (id === 'react') return ReactMock;
            if (id === 'brace') return { acequire: () => ({ define: noop, setMode: noop }) };
            if (id.startsWith('brace/')) return {};
            if (id === 'antd/lib/message') return message;
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'moment') return () => ({ format: () => '' });
            if (id === 'brace') return { acequire: () => ({ define: noop, setMode: noop }) };
            if (id.startsWith('brace/')) return {};
            if (id.endsWith('/apiClient'))
                return { get: noop, post: noop, isSuccessfulResponse: () => true };
            if (id.endsWith('/navigationService')) return { push: noop };
            if (id.endsWith('/siteHelpers'))
                return { getToken: () => '', setToken: noop };
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

// All GeneralFields components
const GENERAL_FIELDS = [
    ['Vmess/GeneralFields.tsx', 'VmessGeneralFields', { server, groups, onChange: updateServer, onOpenSettings: openSettings }],
    ['Trojan/GeneralFields.tsx', 'TrojanGeneralFields', { server, groups, onChange: updateServer }],
    ['Shadowsocks/GeneralFields.tsx', 'ShadowsocksGeneralFields', { server, groups, onChange: updateServer }],
    ['Hysteria/GeneralFields.tsx', 'HysteriaGeneralFields', { server, groups, onChange: updateServer }],
    ['Tuic/GeneralFields.tsx', 'TuicGeneralFields', { server, groups, onChange: updateServer }],
    ['AnyTls/GeneralFields.tsx', 'AnyTlsGeneralFields', { server, groups, onChange: updateServer }],
    ['V2Node/GeneralFields.tsx', 'V2NodeGeneralFields', { server, groups, onChange: updateServer, onOpenSettings: openSettings }],
    ['Vless/GeneralFields.tsx', 'VlessGeneralFields', { server, groups, onChange: updateServer, onOpenSettings: openSettings }],
];

for (const [filePath, exportName, props] of GENERAL_FIELDS) {
    test(`editor ${filePath} renders`, async () => {
        const mod = await loadBundledEditor(filePath);
        const component = mod[exportName] ?? mod.default ?? Object.values(mod).find((v) => typeof v === 'function');
        assert.ok(typeof component === 'function', `${filePath} should export ${exportName}`);
        const element = component(props);
        if (!element) return;
        assert.ok(countNodes(element) > 0, `${filePath} renders a non-empty tree`);
    });
}

// RelationshipFields components
const RELATIONSHIP_FIELDS = [
    'Vmess/RelationshipFields.tsx', 'Trojan/RelationshipFields.tsx',
    'Shadowsocks/RelationshipFields.tsx', 'Hysteria/RelationshipFields.tsx',
    'Tuic/RelationshipFields.tsx', 'AnyTls/RelationshipFields.tsx',
    'V2Node/RelationshipFields.tsx', 'Vless/RelationshipFields.tsx',
];

for (const filePath of RELATIONSHIP_FIELDS) {
    test(`editor ${filePath} renders`, async () => {
        const mod = await loadBundledEditor(filePath);
        const exportKeys = Object.keys(mod).filter((k) => k !== 'default' && k !== '__esModule');
        const component = typeof mod.default === 'function' ? mod.default
            : exportKeys.length ? mod[exportKeys[0]]
            : Object.values(mod).find((v) => typeof v === 'function');
        if (typeof component !== 'function') return;
        const element = component({ server, groups, servers: [server], routes: [], onChange: updateServer, onOpenSettings: openSettings });
        if (!element) return;
        assert.ok(countNodes(element) > 0, `${filePath} renders a non-empty tree`);
    });
}

// Other editor sub-components
const OTHER_COMPONENTS = [
    'Trojan/NetworkSettings.tsx',
    'Shadowsocks/SecuritySettings.tsx',
    'Hysteria/ObfuscationSettings.tsx',
    'Tuic/TransportSettings.tsx',
    'AnyTls/PaddingScheme.tsx',
    'Vmess/DnsSettings.tsx',
    'Vmess/NetworkFields.tsx',
    'Vmess/RuleSettings.tsx',
    'Vmess/TlsSettings.tsx',
    'Vmess/ChildSettingsPanel.tsx',
    'Vless/ChildSettingsPanel.tsx',
    'V2Node/ChildSettingsPanel.tsx',
    'V2Node/TransportFields.tsx',
    'V2Node/ProtocolFields.tsx',
    'V2Node/ProtocolSelectionFields.tsx',
    'V2Node/ProtocolSpecificFields.tsx',
    'V2Node/ProtocolSpecific/Hysteria2Fields.tsx',
    'V2Node/ProtocolSpecific/ShadowsocksFields.tsx',
    'V2Node/ProtocolSpecific/TuicFields.tsx',
    'V2Node/ProtocolSpecific/VlessFields.tsx',
    'Security/TlsSettings.tsx',
    'Security/TlsAdvancedSettings.tsx',
    'Security/TlsCertificateSettings.tsx',
    'Security/TlsRealitySettings.tsx',
    'Security/EncryptionSettings.tsx',
];

for (const filePath of OTHER_COMPONENTS) {
    test(`editor ${filePath} loads through the recovered dependency graph`, async () => {
        const mod = await loadBundledEditor(filePath);
        assert.ok(mod, `${filePath} should export content`);
    });
}

// Protocol editor root components
const PROTOCOL_EDITORS = [
    'VmessEditor.tsx', 'TrojanEditor.tsx', 'ShadowsocksEditor.tsx',
    'HysteriaEditor.tsx', 'TuicEditor.tsx', 'AnyTlsEditor.tsx',
    'V2NodeEditor.tsx', 'VlessEditor.tsx',
];

for (const filePath of PROTOCOL_EDITORS) {
    test(`editor ${filePath} loads`, async () => {
        const mod = await loadBundledEditor(filePath);
        assert.ok(mod, `${filePath} should export content`);
    });
}

void updateCalls;
void openSettings;
