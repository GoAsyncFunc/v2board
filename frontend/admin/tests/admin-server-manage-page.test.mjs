import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const normalize = (value) => JSON.parse(JSON.stringify(value));

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(predicate(tree) ? [tree] : []),
        ...nodes(tree.children, predicate),
        ...nodes(tree.props?.children, predicate),
    ];
}

function createReact() {
    return {
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update, callback) {
                this.state = { ...this.state, ...update };
                callback?.();
            }
            forceUpdate() {}
        },
        Fragment: 'Fragment',
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
}

async function loadPage() {
    const source = await fs.readFile(
        new URL('../src/pages/server/manage/ServerManagePage.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = createReact();
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        window: { confirm: () => true },
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id.includes('utils/clipboard')) return { copyText: () => true };
            if (id === 'react-router-dom') return { Prompt: 'Prompt' };
            if (id === 'antd/lib/list')
                return Object.assign('List', {
                    Item: Object.assign('List.Item', { Meta: 'List.Item.Meta' }),
                });
            if (id === 'antd/lib/menu') return Object.assign('Menu', { Item: 'Menu.Item' });
            if (id === 'antd/lib/message') return { success() {} };
            if (id.startsWith('antd/')) return id;
            if (id.includes('siteHelpers'))
                return { getPreference: () => 50, isMobile: () => false, setPreference() {} };
            if (id.includes('ServerEditorRegistry'))
                return {
                    createNewServerMenu: () => 'NewServerMenu',
                    renderServerEditor: (_server, trigger) => trigger,
                    serverModelNamespace: (type) =>
                        `server${type[0].toUpperCase()}${type.slice(1)}`,
                };
            if (id.includes('ServerManageColumns'))
                return {
                    createServerManageColumns: () => [{ key: 'manage' }],
                    createServerSortColumns: () => [{ key: 'sort' }],
                };
            if (id.includes('ServerManageActions'))
                return {
                    createServerContextMenu: () => ({ type: 'ContextMenu' }),
                    ServerActionDropdown: 'ServerActionDropdown',
                };
            if (id.includes('ServerManageToolbar'))
                return {
                    ServerManageToolbar: ({ showSortControls }) => ({
                        type: 'ServerManageToolbar',
                        props: { showSortControls },
                    }),
                };
            if (id.includes('ServerTypeTag'))
                return { renderServerTypeTag: (_type, label) => label };
            if (id.includes('ServerNameColumn'))
                return { createServerNameColumn: () => ({ key: 'name' }) };
            if (id.includes('ServerRateColumn'))
                return { createServerRateColumn: () => ({ key: 'rate' }) };
            return { __esModule: true, default: id };
        },
    });
    return module.exports;
}

async function loadEditorRegistry() {
    const source = await fs.readFile(
        new URL('../src/pages/server/manage/editors/ServerEditorRegistry.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = createReact();
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/menu') return Object.assign('Menu', { Item: 'Menu.Item' });
            if (id.includes('ServerTypeTag'))
                return { renderServerTypeTag: (_type, label) => label };
            return { __esModule: true, default: id.split('/').at(-1) };
        },
    });
    return module.exports;
}

async function loadWorkspace() {
    const source = await fs.readFile(
        new URL('../src/pages/server/manage/components/ServerManageWorkspace.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = createReact();
    const contextMenus = [];
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id.includes('SortableTable')) return 'SortableTable';
            if (id.includes('ContextMenuTable')) return 'ContextMenuTable';
            if (id.includes('ServerManageColumns'))
                return {
                    createServerManageColumns: () => [{ key: 'manage' }],
                    createServerSortColumns: () => [{ key: 'sort' }],
                };
            if (id.includes('ServerManageMobileList')) return 'ServerManageMobileList';
            if (id.includes('ServerManageActions'))
                return {
                    createServerContextMenu: (server, actions) => {
                        contextMenus.push({ server, actions });
                        return { type: 'ServerContextMenu' };
                    },
                    ServerActionDropdown: 'ServerActionDropdown',
                };
            if (id.includes('ServerManageToolbar')) return { ServerManageToolbar: 'Toolbar' };
            throw new Error(id);
        },
    });
    return { ServerManageWorkspace: module.exports.default, contextMenus };
}

function props(dispatch, servers = []) {
    return {
        dispatch,
        serverManage: { servers, fetchLoading: false, sortMode: false },
        serverGroup: { groups: [{ id: 1, name: '默认组' }] },
    };
}

test('Server management initializes dependencies and filters node records', async () => {
    const runtime = await loadPage();
    const actions = [];
    const servers = [
        {
            id: 1,
            type: 'vmess',
            name: 'Tokyo',
            host: 'jp.example.com',
            port: 443,
            online: 2,
            available_status: 2,
            group_id: ['1'],
        },
        {
            id: 2,
            type: 'trojan',
            name: 'Paris',
            host: 'fr.example.com',
            port: 443,
            online: 0,
            available_status: 0,
            group_id: [],
        },
    ];
    const page = new runtime.ServerManagePage(props((action) => actions.push(action), servers));
    page.componentDidMount();
    assert.deepEqual(normalize(actions), [
        { type: 'serverManage/getNodes' },
        { type: 'serverGroup/fetch' },
        { type: 'serverRoute/fetch' },
    ]);
    assert.equal(page.state.pageSize, 50);
    page.setState({ searchKey: 'Tokyo' });
    assert.deepEqual(normalize(page.filteredServers()), [servers[0]]);
});

test('Server management dispatches node actions and workspace preserves sorting and context actions', async () => {
    const runtime = await loadPage();
    const actions = [];
    const server = {
        id: 7,
        type: 'vless',
        name: 'Node',
        host: 'node.example.com',
        port: 443,
        show: 1,
        online: 3,
        available_status: 2,
        group_id: ['1'],
    };
    const page = new runtime.ServerManagePage(props((action) => actions.push(action), [server]));
    page.copy(server);
    page.drop(server);
    page.update(server, 'show', 0);
    assert.deepEqual(normalize(actions), [
        { type: 'serverVless/copy', id: 7 },
        { type: 'serverVless/drop', id: 7 },
        { type: 'serverVless/update', id: 7, key: 'show', value: 0 },
    ]);
    const workspaceRuntime = await loadWorkspace();
    const pageSizes = [];
    const workspace = new workspaceRuntime.ServerManageWorkspace({
        groups: page.props.serverGroup.groups,
        servers: [server],
        sortMode: false,
        pageSize: 50,
        mobile: false,
        showSortControls: true,
        onSearch() {},
        onToggleSort() {},
        onCopy: (record) => page.copy(record),
        onDrop: (record) => page.drop(record),
        onUpdate: (record, key, value) => page.update(record, key, value),
        onPageSizeChange: (pageSize) => pageSizes.push(pageSize),
        onSort: (fromIndex, toIndex) =>
            actions.push({ type: 'serverManage/sort', fromIndex, toIndex }),
    });
    const tree = workspace.render();
    const sortableTable = nodes(tree, (node) => node.type === 'SortableTable')[0];
    sortableTable.props.onSortEnd(1, 3);
    const contextTable = nodes(tree, (node) => node.type === 'ContextMenuTable')[0];
    contextTable.props.onContextMenu(server);
    workspace.renderContextMenu();
    contextTable.props.pagination.onShowSizeChange(1, 100);
    assert.equal(workspaceRuntime.contextMenus.at(-1).server, server);
    assert.deepEqual(pageSizes, [100]);
    assert.deepEqual(normalize(actions.at(-1)), {
        type: 'serverManage/sort',
        fromIndex: 1,
        toIndex: 3,
    });
});

test('Server editor registry owns protocol model and editor selection', async () => {
    const registry = await loadEditorRegistry();
    const expectedDefinitions = {
        anytls: ['serverAnyTLS', 'AnyTlsEditor'],
        hysteria: ['serverHysteria', 'HysteriaEditor'],
        shadowsocks: ['serverShadowsocks', 'ShadowsocksEditor'],
        trojan: ['serverTrojan', 'TrojanEditor'],
        tuic: ['serverTuic', 'TuicEditor'],
        v2node: ['serverV2node', 'V2NodeEditor'],
        vless: ['serverVless', 'VlessEditor'],
        vmess: ['serverVmess', 'VmessEditor'],
    };
    for (const [type, [namespace, editorName]] of Object.entries(expectedDefinitions)) {
        assert.equal(registry.serverModelNamespace(type), namespace);
        const editor = registry.renderServerEditor({ id: 3, type }, { type: 'Trigger' });
        assert.equal(editor.type, editorName);
        assert.equal(editor.props.record.id, 3);
    }
    assert.equal(registry.serverModelNamespace(undefined), undefined);
    assert.equal(registry.renderServerEditor({ id: 4 }, { type: 'Trigger' }), null);
    assert.equal(registry.SERVER_TYPE_FILTERS.length, 8);
});
