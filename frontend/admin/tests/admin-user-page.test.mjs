import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const normalize = (value) => JSON.parse(JSON.stringify(value));

function createReact() {
    return {
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update, callback) {
                this.state = {
                    ...this.state,
                    ...(typeof update === 'function' ? update(this.state, this.props) : update),
                };
                callback?.();
            }
            forceUpdate() {}
        },
        Fragment: 'Fragment',
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
}

async function loadSource(path, extra = {}) {
    const source = await fs.readFile(new URL(path, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = createReact();
    const confirmations = [];
    const routes = [];
    const preferences = [];
    const messages = [];
    const Menu = Object.assign('Menu', { Item: 'Menu.Item' });
    const Button = Object.assign('Button', { Group: 'Button.Group' });
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        Date,
        setTimeout,
        clearTimeout,
        window: {},
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === 'antd/lib/button') return Button;
            if (id === 'antd/lib/menu') return Menu;
            if (id === 'antd/lib/modal')
                return Object.assign('Modal', {
                    confirm: (options) => confirmations.push(options),
                });
            if (id === 'antd/lib/message')
                return {
                    __esModule: true,
                    default: {
                        loading: (value) => messages.push(['loading', value]),
                        destroy: () => messages.push(['destroy']),
                        success: (value) => messages.push(['success', value]),
                    },
                };
            if (id === 'antd/lib/input')
                return Object.assign('Input', { TextArea: 'Input.TextArea' });
            if (id === 'antd/lib/select')
                return Object.assign('Select', { Option: 'Select.Option' });
            if (id.startsWith('antd/')) return id;
            if (id === 'moment') return (value) => ({ format: (pattern) => `${pattern}:${value}` });
            if (id.includes('routerHistory') || id.includes('app/navigationService'))
                return { __esModule: true, default: { push: (path) => routes.push(path) } };
            if (id.includes('siteHelpers'))
                return {
                    copyToClipboard() {
                        return true;
                    },
                    setPreference: (key, value) => preferences.push({ key, value }),
                };
            if (id.includes('UserDisplayColumns'))
                return { createReadonlyUserEmailColumn: () => ({ key: 'email' }) };
            if (id.includes('/components/UserFilterDrawer'))
                return {
                    __esModule: true,
                    createUserFilterFields: (plans) =>
                        Array.from({ length: 13 }, (_, index) => ({
                            key: `${index}:${plans.length}`,
                        })),
                };
            return extra[id] || { __esModule: true, default: id };
        },
    });
    return { ...module.exports, confirmations, routes, preferences, messages };
}

test('User page preserves lifecycle, sorting, filters, navigation and confirmations', async () => {
    const runtime = await loadSource('../src/pages/user/UserPage.tsx');
    const actions = [];
    const page = new runtime.UserPage({
        dispatch: (action) => actions.push(action),
        user: {
            users: [],
            user: {},
            fetchLoading: false,
            pagination: { current: 1, pageSize: 10 },
            filter: [],
        },
        serverGroup: { groups: [] },
        plan: { plans: [{ id: 1, name: 'Basic' }] },
    });
    page.componentDidMount();
    page.tableOnChange({ current: 2, pageSize: 50 }, { order: 'ascend', columnKey: 'email' });
    page.userFilter('id', '=', 7, true);
    page.orderFilter('user_id', '=', 7);
    page.dumpCsv();
    actions.at(-1).start();
    actions.at(-1).finish();
    page.resetSecret({ id: 7, email: 'user@example.com' });
    runtime.confirmations[0].onOk();
    actions.at(-1).complete();
    page.deleteUser({ id: 7, email: 'user@example.com' });
    runtime.confirmations[1].onOk();
    actions.at(-1).complete();
    page.componentWillUnmount();
    assert.equal(page.filterFields().length, 13);
    assert.deepEqual(runtime.preferences, [{ key: 'user_manage_page_size', value: 50 }]);
    assert.deepEqual(runtime.routes, ['/order']);
    assert.deepEqual(normalize(actions), [
        { type: 'plan/fetch' },
        { type: 'user/fetch' },
        { type: 'serverGroup/fetch' },
        {
            type: 'user/changeTable',
            pagination: { current: 2, pageSize: 50 },
            sort: { sort_type: 'ASC', sort: 'email' },
        },
        { type: 'user/addFilter', key: 'id', condition: '=', value: 7, clear: true },
        { type: 'order/addFilter', key: 'user_id', condition: '=', value: 7 },
        { type: 'user/dumpCSV' },
        { type: 'user/resetSecret', id: 7 },
        { type: 'user/delUser', id: 7 },
        { type: 'user/empty' },
        { type: 'user/setState', payload: { filter: [] } },
    ]);
    assert.deepEqual(runtime.messages, [
        ['loading', '导出中'],
        ['destroy'],
        ['success', '重置成功'],
        ['success', '删除成功'],
    ]);
});

test('User search keeps the recovered 400ms debounce contract', async () => {
    const runtime = await loadSource('../src/pages/user/UserPage.tsx');
    const actions = [];
    const page = new runtime.UserPage({
        dispatch: (action) => actions.push(action),
        user: { users: [], user: {}, fetchLoading: false, pagination: {}, filter: [] },
        serverGroup: { groups: [] },
        plan: { plans: [] },
    });
    page.searchOnChange('first@example.com');
    page.searchOnChange('final@example.com');
    await new Promise((resolve) => setTimeout(resolve, 450));
    assert.deepEqual(normalize(actions), [
        { type: 'user/filter', filter: { email: 'final@example.com' }, pagination: { current: 1 } },
    ]);
});

test('User editor fetches, updates, submits and clears its record on close', async () => {
    const runtime = await loadSource('../src/pages/user/components/UserEditor.tsx');
    const actions = [];
    const editor = new runtime.UserEditor({
        userId: 7,
        children: { props: {} },
        dispatch: (action) => actions.push(action),
        user: {
            users: [],
            user: { id: 7, email: 'user@example.com' },
            fetchLoading: false,
            pagination: {},
            filter: [],
            updateLoading: false,
        },
        plan: { plans: [] },
    });
    editor.show();
    editor.formChange('remarks', 'maintained');
    editor.submit();
    actions[2].callback();
    assert.deepEqual(normalize(actions), [
        { type: 'user/getUserInfoById', id: 7 },
        {
            type: 'user/setState',
            payload: { user: { id: 7, email: 'user@example.com', remarks: 'maintained' } },
        },
        { type: 'user/update', params: { id: 7, email: 'user@example.com' } },
        { type: 'user/setState', payload: { user: {} } },
    ]);
    assert.equal(editor.state.visible, false);
});
