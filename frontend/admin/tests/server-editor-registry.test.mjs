import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const Menu = Object.assign(function Menu() {}, { Item: function MenuItem() {} });
const NullableSelectOption = function NullableSelectOption() {};
const Select = Object.assign(function Select() {}, { Option: NullableSelectOption });

const EDITOR_TYPES = [
    'v2node',
    'shadowsocks',
    'vmess',
    'trojan',
    'hysteria',
    'tuic',
    'vless',
    'anytls',
];

async function load(relativePath) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/menu') return Menu;
            if (id.endsWith('/ServerTypeTag'))
                return {
                    renderServerTypeTag: (type, label) => ({
                        type: 'TypeTag',
                        props: { type, label },
                    }),
                };
            if (id.endsWith('AnyTlsEditor'))
                return { __esModule: true, default: function AnyTlsEditor() {} };
            if (id.endsWith('HysteriaEditor'))
                return { __esModule: true, default: function HysteriaEditor() {} };
            if (id.endsWith('ShadowsocksEditor'))
                return { __esModule: true, default: function ShadowsocksEditor() {} };
            if (id.endsWith('TrojanEditor'))
                return { __esModule: true, default: function TrojanEditor() {} };
            if (id.endsWith('TuicEditor'))
                return { __esModule: true, default: function TuicEditor() {} };
            if (id.endsWith('V2NodeEditor'))
                return { __esModule: true, default: function V2NodeEditor() {} };
            if (id.endsWith('VlessEditor'))
                return { __esModule: true, default: function VlessEditor() {} };
            if (id.endsWith('VmessEditor'))
                return { __esModule: true, default: function VmessEditor() {} };
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

const plain = (value) => JSON.parse(JSON.stringify(value));

function findNodes(tree, type) {
    if (Array.isArray(tree)) return tree.flatMap((child) => findNodes(child, type));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(tree.type === type ? [tree] : []),
        ...findNodes(tree.children, type),
        ...findNodes(tree.props?.children, type),
    ];
}

test('server editor registry maps all eight protocol editors', async () => {
    const registry = await load('../src/pages/server/manage/editors/ServerEditorRegistry.tsx');
    assert.deepEqual(plain(registry.SERVER_TYPE_FILTERS), [
        { text: 'V2node', value: 'V2node' },
        { text: 'Shadowsocks', value: 'Shadowsocks' },
        { text: 'Vmess', value: 'Vmess' },
        { text: 'Trojan', value: 'Trojan' },
        { text: 'Hysteria', value: 'Hysteria' },
        { text: 'Tuic', value: 'Tuic' },
        { text: 'Vless', value: 'Vless' },
        { text: 'AnyTLS', value: 'AnyTLS' },
    ]);
});

test('serverModelNamespace resolves each protocol to its dva model', async () => {
    const { serverModelNamespace } = await load(
        '../src/pages/server/manage/editors/ServerEditorRegistry.tsx',
    );
    assert.equal(serverModelNamespace('v2node'), 'serverV2node');
    assert.equal(serverModelNamespace('vmess'), 'serverVmess');
    assert.equal(serverModelNamespace('anytls'), 'serverAnyTLS');
    assert.equal(serverModelNamespace('unknown-protocol'), undefined);
    assert.equal(serverModelNamespace(undefined), undefined);
});

test('renderServerEditor wraps the editor only for known types', async () => {
    const { renderServerEditor } = await load(
        '../src/pages/server/manage/editors/ServerEditorRegistry.tsx',
    );
    assert.equal(renderServerEditor(undefined, { type: 't', props: {} }), null);
    assert.equal(renderServerEditor({ id: 1, type: 'unknown' }, { type: 't', props: {} }), null);

    const rendered = renderServerEditor({ id: 9, type: 'vmess' }, { type: 'trigger', props: {} });
    assert.match(String(rendered.type.name), /VmessEditor/);
    assert.equal(rendered.props.record.id, 9);
    assert.equal(rendered.props.key, 9);
    assert.equal(rendered.children[0].type, 'trigger');

    // New servers fall back to the 'new' key.
    const created = renderServerEditor({ type: 'tuic' }, { type: 'trigger', props: {} });
    assert.match(String(created.type.name), /TuicEditor/);
    assert.equal(created.props.key, 'new');
});

test('createNewServerMenu lists one editor entry per protocol', async () => {
    const { createNewServerMenu } = await load(
        '../src/pages/server/manage/editors/ServerEditorRegistry.tsx',
    );
    const menu = createNewServerMenu();
    const items = findNodes(menu, Menu.Item);
    assert.equal(items.length, EDITOR_TYPES.length);
    assert.deepEqual(
        items.map((item) => item.props.key),
        EDITOR_TYPES,
    );
    for (const item of items) {
        const editor = item.children[0];
        assert.ok(typeof editor.type === 'function', 'each entry renders its editor');
        assert.equal(editor.children[0].type, 'a');
        assert.equal(editor.children[0].children[0].type, 'TypeTag');
    }
});

test('nullable select option is the antd option retyped to accept null', async () => {
    const module = { exports: {} };
    const source = await fs.readFile(
        new URL('../src/components/common/NullableSelectOption.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/select') return Select;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    // The runtime contract is the antd Option itself; only the type system
    // widens `value` to accept null (the reset-traffic null option relies on it).
    assert.equal(module.exports.default, NullableSelectOption);
    assert.equal(module.exports.default.name, 'NullableSelectOption');
});

test('server editor types compile to type-only declarations', async () => {
    const source = await fs.readFile(
        new URL('../src/pages/server/manage/editors/serverEditorTypes.ts', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    assert.match(code, /"use strict"|var __/);
    assert.doesNotMatch(
        source.replace(/^import type .*$/gm, '').replace(/^export type [\s\S]*?;$\n?/gm, ''),
        /export (const|let|var|function|class)/,
        'the module must not emit runtime declarations',
    );
});
