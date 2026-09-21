import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    Component: class {
        constructor(props) {
            this.props = props;
        }
        setState(update, callback) {
            const next = typeof update === 'function' ? update(this.state, this.props) : update;
            this.state = { ...this.state, ...next };
            callback?.();
        }
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Input = Object.assign('Input', { TextArea: 'Input.TextArea' });
const Select = Object.assign('Select', { Option: 'Select.Option' });

async function loadComponent(componentName) {
    const source = await fs.readFile(
        new URL(`../src/pages/server/manage/_Editors/${componentName}.tsx`, import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === 'antd/lib/input') return Input;
            if (id === 'antd/lib/select') return Select;
            if (id === 'antd/lib/notification') return { error() {} };
            if (id.startsWith('antd/')) return id;
            if (id === './ServerSecuritySettings')
                return { TlsSettings: 'TlsSettings', EncryptionSettings: 'EncryptionSettings' };
            if (id.endsWith('.js')) return {};
            return { __esModule: true, default: id };
        },
    });
    return module.exports;
}

const baseProps = {
    children: { type: 'button', props: {} },
    serverGroup: { groups: [] },
    serverManage: { servers: [], fetchLoading: false, sortMode: false },
    serverRoute: { routes: [] },
};
const normalize = (value) => JSON.parse(JSON.stringify(value));

test('V2NodeEditor enables TLS for required protocols and normalizes its save payload', async () => {
    const { V2NodeEditor } = await loadComponent('V2NodeEditor');
    const actions = [];
    const editor = new V2NodeEditor({
        ...baseProps,
        dispatch: (action) => actions.push(action),
        record: {
            id: 3,
            protocol: 'vmess',
            network_settings: '{"path":"/ws"}',
            install_command: 'temporary',
        },
        serverV2node: { saveLoading: false },
    });
    editor.updateServer('protocol', 'trojan');
    assert.equal(editor.state.server.tls, 1);
    editor.save();
    assert.equal(actions[0].type, 'serverV2node/save');
    assert.deepEqual(normalize(actions[0].params.network_settings), { path: '/ws' });
    assert.equal('install_command' in actions[0].params, false);
});

test('VlessEditor parses transport settings before dispatch', async () => {
    const { VlessEditor } = await loadComponent('VlessEditor');
    const actions = [];
    const editor = new VlessEditor({
        ...baseProps,
        dispatch: (action) => actions.push(action),
        record: { id: 4, network_settings: '{"serviceName":"GunService"}' },
        serverVless: { saveLoading: false },
    });
    editor.save();
    assert.equal(actions[0].type, 'serverVless/save');
    assert.deepEqual(normalize(actions[0].params.network_settings), { serviceName: 'GunService' });
});

test('VmessEditor parses transport settings and drops empty DNS settings', async () => {
    const { VmessEditor } = await loadComponent('VmessEditor');
    const actions = [];
    const editor = new VmessEditor({
        ...baseProps,
        dispatch: (action) => actions.push(action),
        record: { id: 5, networkSettings: '{"path":"/"}', dnsSettings: { servers: [], hosts: {} } },
        serverVmess: { saveLoading: false },
    });
    editor.save();
    assert.equal(actions[0].type, 'serverVmess/save');
    assert.deepEqual(normalize(actions[0].params.networkSettings), { path: '/' });
    assert.equal(actions[0].params.dnsSettings, null);
});

test('DnsSettings keeps typed server fields while editing and deleting rows', async () => {
    const { DnsSettings } = await loadComponent('Vmess/DnsSettings');
    const changes = [];
    const settings = new DnsSettings({ onChange: (value) => changes.push(normalize(value)) });
    settings.addServer();
    settings.changeServer(0, 'address', '1.1.1.1');
    settings.changeServer(0, 'port', '853');
    settings.changeServer(0, 'domains', 'example.com\nexample.org');
    assert.deepEqual(normalize(settings.state.settings.servers[0]), {
        address: '1.1.1.1',
        port: 853,
        domains: ['example.com', 'example.org'],
        expectIPs: [],
    });
    settings.dropServer(0);
    assert.equal(changes.at(-1).servers.length, 0);
});
