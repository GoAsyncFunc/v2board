import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const Button = Object.assign(function Button() {}, { Group: function ButtonGroup() {} });
const Dropdown = function Dropdown() {};
const Icon = function Icon() {};
const Input = Object.assign(function Input() {}, { TextArea: function TextArea() {} });
const InputNumber = function InputNumber() {};
const Switch = function Switch() {};
const Divider = 'Divider';
const Table = function Table() {};
const Modal = { confirm: () => {} };
const Tooltip = function Tooltip() {};
const Tag = function Tag() {};
const Badge = function Badge() {};
const Select = Object.assign(function Select() {}, { Option: 'Select.Option' });
const ContextMenuTable = function ContextMenuTable() {};
const PermissionGroupEditor = function PermissionGroupEditor() {};

const SHIMS = {
    'antd/lib/button': Button,
    'antd/lib/dropdown': Dropdown,
    'antd/lib/icon': Icon,
    'antd/lib/input': Input,
    'antd/lib/input-number': InputNumber,
    'antd/lib/switch': Switch,
    'antd/lib/divider': Divider,
    'antd/lib/table': Table,
    'antd/lib/table/interface': { ColumnProps: {} },
    'antd/lib/modal': Modal,
    'antd/lib/tooltip': Tooltip,
    'antd/lib/tag': Tag,
    'antd/lib/badge': Badge,
    'antd/lib/select': Select,
    'antd/lib/message-x': undefined,
};

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
            if (id === 'react-redux') return { connect: () => (component) => component };
            if (id === 'antd/lib/message')
                return { loading() {}, success() {}, error() {}, destroy() {} };
            if (id.endsWith('/SortableTable'))
                return {
                    __esModule: true,
                    default: ContextMenuTable,
                    TableDragHandle: function T() {},
                };
            if (id.endsWith('/clipboardService')) return { copyToClipboard: () => {} };
            if (id.endsWith('/ServerEditorRegistry'))
                return {
                    createNewServerMenu: () => ({ type: 'new-server-menu', props: {} }),
                    serverEditorRegistry: [],
                    SERVER_TYPE_FILTERS: [],
                };
            for (const [key, value] of Object.entries(SHIMS)) {
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

test('server group list renders rows with edit and delete actions', async () => {
    const { default: ServerGroupList } = await load(
        '../src/pages/server/group/components/ServerGroupList.tsx',
        {
            './ServerGroupColumns': {
                __esModule: true,
                createServerGroupColumns: () => ({
                    id: { key: 'id' },
                    name: { key: 'name' },
                    user_count: { key: 'user_count' },
                    server_count: { key: 'server_count' },
                }),
                ServerGroupRecord: {},
            },
            '@/components/common/PermissionGroupEditor': {
                __esModule: true,
                default: PermissionGroupEditor,
            },
        },
    );
    const deletions = [];
    const groups = [{ id: 3, name: 'VIP' }];
    const tree = ServerGroupList({ groups, onDelete: (id) => deletions.push(id) });
    const table = findNodes(tree, Table)[0];
    assert.deepEqual(plain(table.props.dataSource), groups);
    assert.equal(table.props.pagination, false);
    assert.deepEqual(plain(table.props.columns.map((column) => column.key)), [
        'id',
        'name',
        'user_count',
        'server_count',
        'action',
    ]);
    const links = findNodes(table.props.columns[4].render(undefined, groups[0]), 'a');
    assert.deepEqual(plain(links.map((link) => link.children[0])), ['编辑', '删除']);
    assert.equal(links[0].props.href, 'javascript:void(0);');
    links[1].props.onClick();
    assert.deepEqual(deletions, [3]);
    const editor = findNodes(
        table.props.columns[4].render(undefined, groups[0]),
        PermissionGroupEditor,
    )[0];
    assert.equal(editor.props.record, groups[0]);
});

test('server manage toolbar renders the search and sort toggle', async () => {
    const { ServerManageToolbar } = await load(
        '../src/pages/server/manage/components/ServerManageToolbar.tsx',
        {
            '@/pages/server/manage/editors/ServerEditorRegistry': {
                createNewServerMenu: () => ({ type: 'menu', props: {} }),
            },
        },
    );
    const calls = [];
    const tree = ServerManageToolbar({
        sortMode: false,
        onSearch: (value) => calls.push(['search', value]),
        onToggleSort: () => calls.push(['toggle']),
    });
    const dropdown = findNodes(tree, Dropdown)[0];
    assert.equal(dropdown.props.overlay.type, 'new-server-menu');
    const input = findNodes(tree, Input)[0];
    input.props.onChange({ target: { value: 'hk' } });
    const buttons = findNodes(tree, Button);
    assert.equal(buttons[1].children[0], '编辑排序');
    buttons[1].props.onClick();
    assert.deepEqual(plain(calls), [['search', 'hk'], ['toggle']]);

    const saving = ServerManageToolbar({
        sortMode: true,
        showSortControls: false,
        onSearch: () => {},
        onToggleSort: () => {},
    });
    assert.equal(findNodes(saving, Button).length, 1, 'sort controls hidden while saving');
});

test('server manage columns build group filters and the enable toggle', async () => {
    const { createServerManageColumns, SERVER_STATUS_BADGES } = await load(
        '../src/pages/server/manage/components/ServerManageColumns.tsx',
        {
            './ServerRateColumn': { createServerRateColumn: () => ({ key: 'rate' }) },
            './ServerNameColumn': { createServerNameColumn: () => ({ key: 'name' }) },
            './ServerTypeTag': { createServerTypeTag: () => ({ key: 'type' }) },
        },
    );
    assert.deepEqual(plain(SERVER_STATUS_BADGES), { 0: 'error', 1: 'warning', 2: 'processing' });

    const updates = [];
    const groups = [{ id: 3, name: 'VIP' }];
    const columns = createServerManageColumns({
        groups,
        renderActions: (server) => ({ type: 'actions', props: { id: server.id } }),
        updateServer: (server, key, value) => updates.push([server.id, key, value]),
    });
    assert.deepEqual(plain(columns.map((column) => column.dataIndex || column.key)), [
        'id',
        'show',
        'name',
        'host',
        'online',
        'rate',
        'group_id',
        'action',
    ]);
    const show = columns.find((column) => column.dataIndex === 'show');
    const server = { id: 9, show: 0 };
    const cell = show.render(server.show, server);
    const switchNode = findNodes(cell, Switch)[0];
    assert.equal(switchNode.props.checked, false);
    // The bundle toggles via onClick, flipping the parsed current value.
    switchNode.props.onClick();
    assert.deepEqual(plain(updates), [[9, 'show', 1]]);
});

test('server sort columns expose sortable metadata only', async () => {
    const { createServerSortColumns } = await load(
        '../src/pages/server/manage/components/ServerManageColumns.tsx',
        {
            './ServerRateColumn': { createServerRateColumn: () => ({ key: 'rate' }) },
            './ServerNameColumn': { createServerNameColumn: () => ({ key: 'name' }) },
            './ServerTypeTag': { createServerTypeTag: () => ({ key: 'type' }) },
        },
    );
    const columns = createServerSortColumns();
    assert.deepEqual(plain(columns.map((column) => [column.dataIndex, column.title])), [
        ['sort', '排序'],
        ['id', '节点ID'],
        ['name', '节点'],
    ]);
});
