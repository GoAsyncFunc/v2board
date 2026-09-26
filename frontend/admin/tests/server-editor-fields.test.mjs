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
const Input = Object.assign(function Input() {}, { TextArea: function TextArea() {} });
const Button = Object.assign(function Button() {}, { Group: function ButtonGroup() {} });
const Select = Object.assign(function Select() {}, { Option: 'Select.Option' });
const InputNumber = function InputNumber() {};
const Checkbox = function Checkbox() {};
const Table = function Table() {};

async function load(relativePath, extra = {}) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            for (const [key, value] of Object.entries({
                'antd/lib/input': Input,
                'antd/lib/button': Button,
                'antd/lib/select': Select,
                'antd/lib/input-number': InputNumber,
                'antd/lib/checkbox': Checkbox,
                'antd/lib/table': Table,
            })) {
                if (id === key || id.endsWith(key)) return value;
            }
            for (const [key, value] of Object.entries(extra)) {
                if (id.endsWith(key)) return value;
            }
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
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

test('json editor and server editor drawer forward all props', async () => {
    const { default: JsonEditor } = await load(
        '../src/pages/server/manage/editors/JsonEditor.tsx',
        {
            'react-ace': 'AceEditor',
            'brace/mode/json': {},
            'brace/theme/github': {},
        },
    );
    const jsonProps = { mode: 'json', value: '{}' };
    const jsonTree = JsonEditor(jsonProps);
    assert.equal(jsonTree.type, 'AceEditor');
    assert.deepEqual(plain(jsonTree.props), plain(jsonProps));

    const { default: ServerEditorDrawer } = await load(
        '../src/pages/server/manage/editors/ServerEditorDrawer.tsx',
        { 'antd/lib/drawer': 'Drawer' },
    );
    const drawerProps = { title: '编辑节点', visible: true, width: '80%', id: 7 };
    const drawerTree = ServerEditorDrawer(drawerProps);
    assert.equal(drawerTree.type, 'Drawer');
    assert.deepEqual(plain(drawerTree.props), plain(drawerProps));
});

test('route basic and match fields round-trip remarks and multi-line matches', async () => {
    const { RouteBasicFields } = await load(
        '../src/pages/server/route/components/RouteBasicFields.tsx',
    );
    const changes = [];
    const basic = RouteBasicFields({
        route: { remarks: 'Netflix' },
        onChange: (patch) => changes.push(patch),
    });
    const input = findNodes(basic, Input)[0];
    assert.equal(input.props.value, 'Netflix');
    input.props.onChange({ target: { value: 'AI' } });
    assert.deepEqual(plain(changes), [{ remarks: 'AI' }]);

    const { RouteMatchField, getRouteMatchPlaceholder } = await load(
        '../src/pages/server/route/components/RouteMatchField.tsx',
    );
    assert.equal(getRouteMatchPlaceholder('protocol'), 'http\ntls\nquic\nbittorrent');
    assert.equal(getRouteMatchPlaceholder('block_port'), '53\n443\n1000-2000');
    assert.equal(
        getRouteMatchPlaceholder('route_ip'),
        '127.0.0.1(单一匹配)\n10.0.0.0/8(范围匹配)\ngeoip:cn(预定义列表匹配)',
    );
    assert.match(getRouteMatchPlaceholder(undefined), /example.com\(关键字匹配\)/);

    const matchChanges = [];
    const match = RouteMatchField({
        route: { action: 'block_port', match: ['53', '443'] },
        onChange: (patch) => matchChanges.push(patch),
    });
    const textarea = findNodes(match, Input.TextArea)[0];
    assert.equal(textarea.props.rows, 5);
    assert.equal(textarea.props.placeholder, '53\n443\n1000-2000');
    assert.equal(textarea.props.value, '53\n443');
    textarea.props.onChange({ target: { value: '53\n443\n8080' } });
    assert.deepEqual(plain(matchChanges), [{ match: ['53', '443', '8080'] }]);

    const csv = RouteMatchField({
        route: { action: 'protocol', match: 'tls,quic' },
        onChange: (patch) => matchChanges.push(patch),
    });
    assert.equal(findNodes(csv, Input.TextArea)[0].props.value, 'tls\nquic');
});

test('route action field reveals dns and outbound inputs per action', async () => {
    const settings = {
        routeActionText: {
            block: '拦截',
            block_ip: '拦截IP',
            block_port: '拦截端口',
            protocol: '协议',
            dns: 'DNS',
            route: '路由',
            route_ip: '路由IP',
            default_out: '默认出站',
        },
    };
    const { RouteActionField, ROUTE_ACTIONS } = await load(
        '../src/pages/server/route/components/RouteActionField.tsx',
        { '@/config/adminSettings': { settings }, './RouteEditor': {} },
    );
    const changes = [];
    assert.deepEqual(Array.from(ROUTE_ACTIONS), [
        'block',
        'block_ip',
        'block_port',
        'protocol',
        'dns',
        'route',
        'route_ip',
        'default_out',
    ]);

    const tree = RouteActionField({
        route: { action: undefined, action_value: '' },
        onChange: (patch) => changes.push(patch),
    });
    const select = findNodes(tree, Select)[0];
    assert.deepEqual(
        plain(select.children.map((option) => option.props.value)),
        Array.from(ROUTE_ACTIONS),
    );
    assert.equal(select.children[0].children[0], '拦截');
    assert.equal(findNodes(tree, 'Input').length, 0, 'no value input before an action is chosen');
    assert.equal(findNodes(tree, Input).length, 0);
    select.props.onChange('block');
    assert.deepEqual(plain(changes), [{ action: 'block' }]);

    const dns = RouteActionField({
        route: { action: 'dns', action_value: '8.8.8.8' },
        onChange: (patch) => changes.push(patch),
    });
    const dnsInput = findNodes(dns, Input)[0];
    assert.equal(dnsInput.props.id, 'route-dns');
    dnsInput.props.onChange({ target: { value: '1.1.1.1' } });
    assert.deepEqual(plain(changes).at(-1), { action_value: '1.1.1.1' });

    const outbound = RouteActionField({
        route: { action: 'route', action_value: '{}' },
        onChange: (patch) => changes.push(patch),
    });
    const textarea = findNodes(outbound, Input.TextArea)[0];
    assert.equal(textarea.props.rows, 8);
    assert.match(textarea.props.placeholder, /ss_out/);
    textarea.props.onChange({ target: { value: '{"tag":"x"}' } });
    assert.deepEqual(plain(changes).at(-1), { action_value: '{"tag":"x"}' });

    const blocked = RouteActionField({
        route: { action: 'block', action_value: '' },
        onChange: (patch) => changes.push(patch),
    });
    assert.equal(findNodes(blocked, 'Input').length, 0);
    assert.equal(findNodes(blocked, Input).length, 0);
});

test('vless fields wire the encryption and flow selects with settings editing', async () => {
    const { VlessFields } = await load(
        '../src/pages/server/manage/editors/V2Node/ProtocolSpecific/VlessFields.tsx',
    );
    const changes = [];
    const opens = [];
    const withEncryption = VlessFields({
        server: { encryption: 'mlkem768x25519plus', flow: '' },
        onChange: (field, value) => changes.push([field, value]),
        onOpenSettings: (title, panel) => opens.push([title, panel]),
    });
    const link = findNodes(withEncryption, 'a')[0];
    link.props.onClick();
    assert.deepEqual(opens, [['编辑加密配置', 'encryption_settings']]);

    const selects = findNodes(withEncryption, Select);
    assert.equal(selects[0].props.value, 'mlkem768x25519plus');
    assert.deepEqual(
        selects[0].children.map((option) => [option.props.value, option.children[0]]),
        [
            ['', '无'],
            ['mlkem768x25519plus', 'MLKEM768X25519PLUS'],
        ],
    );
    selects[0].props.onChange('');
    selects[1].props.onChange('xtls-rprx-vision');
    assert.deepEqual(plain(changes), [
        ['encryption', null],
        ['flow', 'xtls-rprx-vision'],
    ]);

    // Without encryption configured the settings link is not rendered.
    const bare = VlessFields({
        server: { encryption: null, flow: null },
        onChange: () => {},
        onOpenSettings: () => {},
    });
    assert.equal(findNodes(bare, 'a').length, 0);
});

test('shadowsocks fields default the cipher and map the cipher list', async () => {
    const { ShadowsocksFields } = await load(
        '../src/pages/server/manage/editors/V2Node/ProtocolSpecific/ShadowsocksFields.tsx',
    );
    const changes = [];
    const tree = ShadowsocksFields({ server: {}, onChange: (f, v) => changes.push([f, v]) });
    const select = findNodes(tree, Select)[0];
    assert.equal(select.props.value, 'aes-128-gcm');
    assert.equal(select.children.length, 6);
    select.props.onChange('chacha20-ietf-poly1305');
    assert.deepEqual(plain(changes), [['cipher', 'chacha20-ietf-poly1305']]);
});

test('hysteria2 fields reveal the obfs password only for salamander', async () => {
    const { Hysteria2Fields } = await load(
        '../src/pages/server/manage/editors/V2Node/ProtocolSpecific/Hysteria2Fields.tsx',
    );
    const changes = [];
    const plain2 = Hysteria2Fields({
        server: { obfs: null, up_mbps: 100, down_mbps: 200 },
        onChange: (field, value) => changes.push([field, value]),
    });
    assert.equal(findNodes(plain2, Input).length, 2, 'only the bandwidth inputs');
    const selects = findNodes(plain2, Select);
    assert.deepEqual(
        selects[0].children.map((option) => option.props.value),
        ['', 'salamander'],
    );
    selects[0].props.onChange('salamander');
    assert.deepEqual(plain(changes), [['obfs', 'salamander']]);

    const salamander = Hysteria2Fields({
        server: { obfs: 'salamander', obfs_password: null, up_mbps: null, down_mbps: null },
        onChange: (field, value) => changes.push([field, value]),
    });
    const inputs = findNodes(salamander, Input);
    assert.equal(inputs.length, 3);
    inputs[0].props.onChange({ target: { value: 'secret' } });
    inputs[1].props.onChange({ target: { value: '500' } });
    assert.deepEqual(plain(changes).slice(-2), [
        ['obfs_password', 'secret'],
        ['up_mbps', '500'],
    ]);
});

test('tuic fields expose yes/no selects for the numeric flags', async () => {
    const { TuicFields } = await load(
        '../src/pages/server/manage/editors/V2Node/ProtocolSpecific/TuicFields.tsx',
    );
    const changes = [];
    const tree = TuicFields({
        server: { disable_sni: 0, zero_rtt_handshake: 1 },
        onChange: (field, value) => changes.push([field, value]),
    });
    const selects = findNodes(tree, Select);
    // udp relay mode and congestion control are direct selects...
    assert.deepEqual(
        selects.map((select) => select.props.value),
        ['native', 'cubic'],
    );
    // ...the yes/no flags are rendered by the internal YesNoSelect component;
    // expand those elements to reach their selects.
    function findByProps(tree2, predicate) {
        if (Array.isArray(tree2)) return tree2.flatMap((child) => findByProps(child, predicate));
        if (!tree2 || typeof tree2 !== 'object') return [];
        const here = predicate(tree2) ? [tree2] : [];
        return [
            ...here,
            ...findByProps(tree2.children, predicate),
            ...findByProps(tree2.props?.children, predicate),
        ];
    }
    const yesNo = findByProps(tree, (node) => node?.props?.field !== undefined);
    assert.deepEqual(
        yesNo.map((element) => [element.props.field, element.props.value]),
        [
            ['disable_sni', 0],
            ['zero_rtt_handshake', 1],
        ],
    );
    // Rendering the YesNoSelect element yields the inner antd Select.
    const innerSelects = yesNo.map((element) => element.type(element.props));
    innerSelects[0].props.onChange(1);
    innerSelects[1].props.onChange(0);
    selects[0].props.onChange('quic');
    selects[1].props.onChange('bbr');
    assert.deepEqual(plain(changes), [
        ['disable_sni', 1],
        ['zero_rtt_handshake', 0],
        ['udp_relay_mode', 'quic'],
        ['congestion_control', 'bbr'],
    ]);
});
