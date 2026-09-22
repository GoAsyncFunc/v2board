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
            if (callback) callback();
        }
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

async function load(relativePath, requireModule) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            return requireModule(id);
        },
    });
    return module.exports;
}

const normalize = (value) => JSON.parse(JSON.stringify(value));

test('FilterDrawer preserves validation and field reset behavior', async () => {
    const errors = [];
    const component = await load('../src/components/common/FilterDrawer.tsx', (id) => {
        if (id === 'antd/lib/button') return 'Button';
        if (id === 'antd/lib/date-picker') return 'DatePicker';
        if (id === 'antd/lib/divider') return 'Divider';
        if (id === 'antd/lib/drawer') return 'Drawer';
        if (id === 'antd/lib/icon') return 'Icon';
        if (id === 'antd/lib/input') return 'Input';
        if (id === 'antd/lib/notification') return { error: (config) => errors.push(config) };
        if (id === 'antd/lib/select') return Object.assign('Select', { Option: 'Option' });
        if (id === 'moment') return () => ({ format: () => '0' });
        if (id.includes('iconStyles')) return {};
        throw new Error(id);
    });
    const accepted = [];
    const fields = [
        { key: 'email', title: '邮箱', condition: ['模糊'] },
        {
            key: 'status',
            title: '状态',
            condition: ['='],
            type: 'select',
            options: [{ key: '正常', value: 1 }],
        },
    ];
    const drawer = new component.FilterDrawer({
        children: { type: 'button', props: {} },
        keys: fields,
        onOk: (value) => accepted.push(normalize(value)),
    });
    drawer.add();
    assert.deepEqual(normalize(drawer.state.filter), [
        { key: 'email', condition: '模糊', value: '' },
    ]);
    drawer.changeFilter(0, 'key', 'status');
    assert.deepEqual(normalize(drawer.state.filter), [
        { key: 'status', condition: '=', value: '' },
    ]);
    drawer.state.visible = true;
    drawer.apply();
    assert.equal(errors.length, 1);
    assert.equal(accepted.length, 0);
    assert.equal(drawer.state.visible, true);
    drawer.changeFilter(0, 'value', 1);
    drawer.apply();
    assert.deepEqual(accepted, [[{ key: 'status', condition: '=', value: 1 }]]);
    assert.equal(drawer.state.visible, false);
});

test('TLS and encryption settings retain defaults and emit complete updates', async () => {
    const securityModule = (id) => {
        if (id === 'antd/lib/input') return 'Input';
        if (id === 'antd/lib/select') return Object.assign('Select', { Option: 'Option' });
        if (id === 'antd/lib/switch') return 'Switch';
        if (id === './TlsAdvancedSettings') return { TlsAdvancedSettings: 'TlsAdvancedSettings' };
        throw new Error(id);
    };
    const tlsComponent = await load(
        '../src/pages/server/manage/_Editors/Security/TlsSettings.tsx',
        securityModule,
    );
    const encryptionComponent = await load(
        '../src/pages/server/manage/_Editors/Security/EncryptionSettings.tsx',
        securityModule,
    );
    const tlsUpdates = [];
    const tls = new tlsComponent.TlsSettings({
        settings: null,
        tls: '1',
        certApply: true,
        onChange: (value) => tlsUpdates.push(normalize(value)),
    });
    assert.deepEqual(normalize(tls.state.settings), {
        server_name: '',
        cert_mode: 'self',
        provider: '',
        dns_env: '',
        reject_unknown_sni: '0',
        allow_insecure: '0',
    });
    tls.change('allow_insecure', '1');
    assert.equal(tls.state.settings.allow_insecure, '1');
    assert.equal(tlsUpdates[0].allow_insecure, '1');

    const encryptionUpdates = [];
    const encryption = new encryptionComponent.EncryptionSettings({
        settings: {},
        onChange: (value) => encryptionUpdates.push(normalize(value)),
    });
    assert.deepEqual(encryptionUpdates[0], {
        mode: 'native',
        rtt: '0rtt',
        ticket: '600s',
        server_padding: null,
        client_padding: null,
        private_key: null,
        password: null,
    });
    encryption.change('mode', 'random');
    assert.equal(encryption.state.settings.mode, 'random');
    assert.equal(encryptionUpdates[1].mode, 'random');
});
