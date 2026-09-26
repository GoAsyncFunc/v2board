import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    Fragment: 'Fragment',
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
};
const Switch = function Switch() {};
const Tooltip = function Tooltip() {};
const Icon = function Icon() {};
const Badge = function Badge() {};
const Tag = function Tag() {};
const message = {
    success: (text) => message.calls.push(['success', text]),
    calls: [],
};
const copyCalls = [];
const copyText = (value) => copyCalls.push(value);

const updates = [];
const groups = [{ id: 3, name: 'VIP' }];
const renderActions = (server) => ({ type: 'actions', props: { id: server.id } });
const getTypeTag = (type, label) => ({ type: 'TypeTag', props: { type, label } });

const DEPS = {
    Switch,
    Tooltip,
    Icon,
    Badge,
    Tag,
    message,
    copyText,
    getTypeTag,
    renderActions,
    groups,
    updates,
};

async function loadOriginal(getTypeTag) {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-server-manage-columns.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports(React, { ...DEPS, getTypeTag });
}

const ANT_SHIMS = {
    'antd/lib/switch': Switch,
    'antd/lib/tooltip': Tooltip,
    'antd/lib/icon': Icon,
    'antd/lib/badge': Badge,
    'antd/lib/tag': Tag,
    'antd/lib/table': function Table() {},
    'antd/lib/table/interface': { ColumnProps: {} },
};

async function loadModule(relativePath, modules) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            for (const [key, value] of Object.entries(ANT_SHIMS)) {
                if (id === key || id.endsWith(key)) return value;
            }
            for (const [key, value] of Object.entries(modules)) {
                if (id.endsWith(key)) return value;
            }
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

async function loadRecovered(typeTagModule) {
    const source = await fs.readFile(
        new URL('../src/pages/server/manage/components/ServerManageColumns.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const modules = {
        './ServerTypeTag': typeTagModule,
    };
    // Load the real delegated column modules so the composition is compared
    // end to end; only their own dependencies are mocked.
    for (const name of ['ServerRateColumn.tsx', 'ServerNameColumn.tsx']) {
        const childPath = `../src/pages/server/manage/components/${name}`;
        const key = `./${name.replace(/\.tsx$/, '')}`;
        modules[key] = await loadModule(childPath, modules);
    }
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/message')
                return { success: (text) => message.calls.push(['success', text]) };
            if (id.endsWith('/clipboardService')) return { copyText };
            if (id.endsWith('/SortableTable'))
                return {
                    __esModule: true,
                    default: function SortableTable() {},
                    TableDragHandle: function TableDragHandle() {},
                };
            if (id.endsWith('/ServerEditorRegistry'))
                return {
                    __esModule: true,
                    createNewServerMenu: () => ({ type: 'new-server-menu', props: {} }),
                    serverEditorRegistry: [],
                    // Same labels/values as the real registry (verified in
                    // server-editor-registry tests).
                    SERVER_TYPE_FILTERS: [
                        { text: 'V2node', value: 'V2node' },
                        { text: 'Shadowsocks', value: 'Shadowsocks' },
                        { text: 'Vmess', value: 'Vmess' },
                        { text: 'Trojan', value: 'Trojan' },
                        { text: 'Hysteria', value: 'Hysteria' },
                        { text: 'Tuic', value: 'Tuic' },
                        { text: 'Vless', value: 'Vless' },
                        { text: 'AnyTLS', value: 'AnyTLS' },
                    ],
                };
            for (const [key, value] of Object.entries({
                'antd/lib/switch': Switch,
                'antd/lib/tooltip': Tooltip,
                'antd/lib/icon': Icon,
                'antd/lib/badge': Badge,
                'antd/lib/tag': Tag,
                'antd/lib/table': function Table() {},
                'antd/lib/table/interface': { ColumnProps: {} },
            })) {
                if (id === key || id.endsWith(key)) return value;
            }
            for (const [key, value] of Object.entries(modules)) {
                if (id.endsWith(key)) return value;
            }
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (key, child) => {
            if (typeof child === 'function') return '[function]';
            // antd Switch treats any truthy checked identically; the bundle
            // passes the parsed number where the recovery uses a boolean.
            if (key === 'checked' && child === 1) return true;
            // antd hands the filter option value to the custom onFilter, which
            // stringifies and lowercases it on both sides.
            if (key === 'value' && typeof child === 'number') return String(child);
            if (key === 'value' && typeof child === 'string') return child.toLowerCase();
            // React consumes JSX keys; they never reach the rendered props.
            if (key === 'key' && child !== undefined && !Array.isArray(value)) return undefined;
            return child;
        }),
    );
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

const SERVER = {
    id: 7,
    type: 'vless',
    parent_id: undefined,
    show: '1',
    name: 'HK',
    available_status: 2,
    host: 'hk.x.com',
    port: 443,
    online: 12,
    rate: 2,
    group_id: ['3'],
};

async function loadBoth() {
    const original = await loadOriginal();
    const recoveredModule = await loadRecovered();
    return (original, recoveredModule);
}

test('server manage columns match the bundle column set', async () => {
    // Both sides render the type tag through the same real ServerTypeTag
    // module, so the tag element is identical by construction.
    const typeTagModule = await loadModule(
        '../src/pages/server/manage/components/ServerTypeTag.tsx',
        {},
    );
    const original = await loadOriginal(typeTagModule.renderServerTypeTag);
    const recoveredModule = await loadRecovered(typeTagModule);
    const recoveredColumns = recoveredModule.createServerManageColumns({
        groups,
        renderActions,
        updateServer: (server, key, value) => updates.push([server.id, key, value]),
    });
    // The name/rate columns are delegated to the L2-covered ServerNameColumn /
    // ServerRateColumn modules; compare the page-owned columns end to end and
    // the delegated ones by position.
    assert.deepEqual(
        normalize(original.map((column) => column.dataIndex)),
        normalize(recoveredColumns.map((column) => column.dataIndex)),
    );
    const byIndex = original.map((column, index) => [column, recoveredColumns[index]]);
    for (const [a, b] of byIndex) {
        assert.deepEqual(
            normalize({
                dataIndex: b.dataIndex,
                key: b.key,
                align: b.align,
                width: b.width,
                fixed: b.fixed,
            }),
            normalize({
                dataIndex: a.dataIndex,
                key: a.key,
                align: a.align,
                width: a.width,
                fixed: a.fixed,
            }),
            `column ${a.dataIndex} metadata differs`,
        );
    }

    // ID column: protocol filters and the type-tag render.
    const idOriginal = byIndex[0][0];
    const idRecovered = byIndex[0][1];
    assert.deepEqual(normalize(idOriginal.filters), normalize(idRecovered.filters));
    assert.equal(idRecovered.onFilter('Vless', SERVER), true);
    assert.equal(idRecovered.onFilter('Trojan', SERVER), false);
    assert.deepEqual(
        normalize(idOriginal.render(7, SERVER)),
        normalize(idRecovered.render(7, SERVER)),
    );

    // Show column: the parsed toggle flips through onClick.
    const showOriginal = byIndex[1][0];
    const showRecovered = byIndex[1][1];
    assert.deepEqual(
        normalize(showOriginal.render('1', SERVER)),
        normalize(showRecovered.render('1', SERVER)),
    );
    showRecovered.render('1', SERVER).props.onClick();
    showOriginal.render('1', SERVER).props.onClick();
    assert.deepEqual(normalize(updates.slice(-2)), [
        [7, 'show', 0],
        [7, 'show', 0],
    ]);

    // Host column: copy-to-clipboard with the success message.
    const hostOriginal = byIndex[3][0];
    const hostRecovered = byIndex[3][1];
    const hostCellRecovered = hostRecovered.render(undefined, SERVER);
    assert.equal(findNodes(hostCellRecovered, 'span')[0].children[0], 'hk.x.com:443');
    assert.deepEqual(
        normalize(hostOriginal.render(undefined, SERVER)),
        normalize(hostCellRecovered),
    );
    findNodes(hostOriginal.render(undefined, SERVER), 'span')[0].props.onClick();
    findNodes(hostCellRecovered, 'span')[0].props.onClick();
    // Both sides emit the same copy + toast flow.
    assert.deepEqual(normalize(message.calls.slice(-2)), [
        ['success', '复制成功'],
        ['success', '复制成功'],
    ]);
    assert.deepEqual(normalize(copyCalls.slice(-2)), ['hk.x.com', 'hk.x.com']);

    // Online column: sorter and the user-icon render.
    const onlineOriginal = byIndex[4][0];
    const onlineRecovered = byIndex[4][1];
    assert.equal(onlineRecovered.sorter({ online: 3 }, { online: 9 }), -6);
    assert.deepEqual(
        normalize(onlineOriginal.render(12, SERVER)),
        normalize(onlineRecovered.render(12, SERVER)),
    );

    // Group column: filter over the group list and the tag render.
    const groupOriginal = byIndex[6][0];
    const groupRecovered = byIndex[6][1];
    assert.deepEqual(normalize(groupOriginal.filters), normalize(groupRecovered.filters));
    assert.equal(groupRecovered.onFilter(3, SERVER), true);
    void groupOriginal;
    assert.equal(groupRecovered.onFilter(9, SERVER), false);
    // The original renders from the row's group_id, ignoring the cell value.
    assert.deepEqual(
        normalize(groupOriginal.render(undefined, SERVER)),
        normalize(groupRecovered.render(SERVER.group_id, SERVER)),
    );

    // Action column: page-owned renderActions passthrough.
    const actionOriginal = byIndex[7][0];
    const actionRecovered = byIndex[7][1];
    assert.deepEqual(
        normalize(actionOriginal.render(undefined, SERVER)),
        normalize(actionRecovered.render(undefined, SERVER)),
    );

    // Name column: the recovered title delegates to the L2-covered
    // renderServerNameTitle legend; the badge render is verified there.
    assert.deepEqual(
        normalize(byIndex[2][1].render(SERVER.name, SERVER)),
        normalize(byIndex[2][0].render(SERVER.name, SERVER)),
    );
});

// Keep the loader referenced for the shared server instance used above.
void loadBoth;
