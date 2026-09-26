import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const Dropdown = function Dropdown() {};
const Icon = function Icon() {};
const Menu = Object.assign(function Menu() {}, { Item: function MenuItem() {} });
const Badge = function Badge() {};
const Divider = 'Divider';
const ListItem = function ListItem() {};
const ListItemMeta = function ListItemMeta() {};
ListItem.Meta = ListItemMeta;
const List = Object.assign(function List() {}, { Item: ListItem });
const Switch = function Switch() {};
const Tag = function Tag() {};
const Table = function Table() {};

const extra = {
    '@/pages/server/manage/editors/ServerEditorRegistry': {
        __esModule: true,
        renderServerEditor: (server, trigger, key) => ({
            type: 'RenderedServerEditor',
            props: { id: server.id, trigger, key },
        }),
    },
    './ServerManageColumns': {
        SERVER_STATUS_BADGES: { 0: 'error', 1: 'warning', 2: 'processing' },
    },
    './ServerTypeTag': {
        renderServerTypeTag: (type, label) => ({ type: 'TypeTag', props: { type, label } }),
    },
    './RouteActionColumn': { createRouteActionColumn: () => ({ key: 'action' }) },
    './ServerRouteColumns': {
        createServerRouteColumns: () => ({
            id: { key: 'id' },
            remarks: { key: 'remarks' },
            match: { key: 'match' },
        }),
    },
    './RouteEditor': {},
};

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
            for (const [key, value] of Object.entries({
                'antd/lib/dropdown': Dropdown,
                'antd/lib/icon': Icon,
                'antd/lib/menu': Menu,
                'antd/lib/badge': Badge,
                'antd/lib/divider': Divider,
                'antd/lib/list': List,
                'antd/lib/switch': Switch,
                'antd/lib/tag': Tag,
                'antd/lib/table': Table,
                'antd/lib/table/interface': { ColumnProps: {} },
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

test('server action menu renders editor, copy and delete entries', async () => {
    const { createServerActionMenu, ServerActionDropdown, createServerContextMenu } = await load(
        '../src/pages/server/manage/components/ServerManageActions.tsx',
    );
    const server = { id: 5, name: 'HK' };
    const calls = [];
    const actions = {
        onCopy: (target) => calls.push(['copy', target.id]),
        onDrop: (target) => calls.push(['drop', target.id]),
    };

    const menu = createServerActionMenu(server, actions);
    const items = findNodes(menu, Menu.Item);
    assert.equal(items.length, 3);
    items[1].props.onClick();
    items[2].props.onClick();
    assert.deepEqual(plain(calls), [
        ['copy', 5],
        ['drop', 5],
    ]);
    const editor = findNodes(items[0], 'RenderedServerEditor')[0];
    assert.equal(editor.props.id, 5);
    assert.equal(plain(editor.props.trigger.type), 'a');

    const dropdown = ServerActionDropdown({ server, actions });
    assert.equal(findNodes(dropdown, Dropdown).length, 1);
    assert.deepEqual(plain(dropdown.props.trigger), ['click']);
    const defaultTrigger = findNodes(dropdown, 'a')[0];
    assert.match(plain(defaultTrigger.children[0]), /操作/);
    const custom = ServerActionDropdown({
        server,
        actions,
        trigger: { type: 'custom', props: {} },
    });
    assert.equal(findNodes(custom, 'a').length, 0, 'custom trigger replaces the default link');

    const context = createServerContextMenu(server, actions);
    const items2 = findNodes(context, 'li');
    assert.equal(items2.length, 3);
    const contextEditor = findNodes(items2[0], 'RenderedServerEditor')[0];
    assert.equal(contextEditor.props.key, 'context-5');
    items2[1].props.onClick();
    items2[2].props.onClick();
    assert.deepEqual(plain(calls).slice(-2), [
        ['copy', 5],
        ['drop', 5],
    ]);

    const empty = createServerContextMenu(null, actions);
    assert.equal(findNodes(empty, 'RenderedServerEditor').length, 0);
});

test('server manage mobile list renders per-server rows with toggle and actions', async () => {
    const { default: ServerManageMobileList } = await load(
        '../src/pages/server/manage/components/ServerManageMobileList.tsx',
    );
    const updates = [];
    const servers = [
        {
            id: 1,
            name: 'HK',
            host: 'hk.x.com',
            port: 443,
            show: 1,
            online: 8,
            rate: 2,
            available_status: 1,
            type: 'vless',
            parent_id: undefined,
        },
        {
            id: 2,
            name: 'Child',
            host: 'c.x.com',
            port: 443,
            show: 0,
            online: null,
            rate: 1,
            available_status: 0,
            type: 'vmess',
            parent_id: 1,
        },
    ];
    const tree = ServerManageMobileList({
        servers,
        renderActions: (server) => ({ type: 'actions', props: { id: server.id } }),
        updateServer: (server, key, value) => updates.push([server.id, key, value]),
    });
    const list = findNodes(tree, List)[0];
    assert.equal(list.props.dataSource, servers);
    const rendered = list.props.renderItem(servers[0]);
    const item = findNodes(rendered, List.Item)[0];
    assert.match(item.props.className, /v2board_node_mobile/);
    assert.doesNotMatch(item.props.className, /child_node/);
    const switchNode = findNodes(item.props.extra, Switch)[0];
    assert.equal(switchNode.props.checked, true);
    switchNode.props.onClick();
    assert.deepEqual(plain(updates), [[1, 'show', 0]]);

    const childRendered = list.props.renderItem(servers[1]);
    const childItem = findNodes(childRendered, List.Item)[0];
    assert.match(childItem.props.className, /child_node/);
    const meta = findNodes(childRendered, List.Item.Meta)[0];
    assert.equal(meta.props.description, 'c.x.com:443');
    const childSwitch = findNodes(childItem.props.extra, Switch)[0];
    assert.equal(childSwitch.props.checked, false);
    childSwitch.props.onClick();
    assert.deepEqual(plain(updates), [
        [1, 'show', 0],
        [2, 'show', 1],
    ]);
});

test('server route list composes columns with edit and delete actions', async () => {
    const { default: ServerRouteList } = await load(
        '../src/pages/server/route/components/ServerRouteList.tsx',
    );
    const deletions = [];
    const editors = [];
    const routes = [{ id: 4, remarks: 'AI', match: ['geosite:netflix'], action: 'protocol' }];
    const tree = ServerRouteList({
        routes,
        routeActionText: { protocol: '协议' },
        renderEditor: (record, key) => {
            editors.push([record.id, key]);
            return { type: 'editor', props: { key } };
        },
        onDelete: (id) => deletions.push(id),
    });
    const table = findNodes(tree, Table)[0];
    assert.deepEqual(plain(table.props.dataSource), routes);
    assert.deepEqual(plain(table.props.columns.map((column) => column.key)), [
        'id',
        'remarks',
        'match',
        'action',
        'action2',
    ]);
    const actionCell = table.props.columns[4].render(undefined, routes[0]);
    assert.deepEqual(plain(editors), [[4, 4]]);
    findNodes(actionCell, 'a')[0].props.onClick();
    assert.deepEqual(deletions, [4]);
});
