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
        setState(update) {
            const next = typeof update === 'function' ? update(this.state, this.props) : update;
            this.state = { ...this.state, ...next };
        }
        forceUpdate() {}
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const Button = Object.assign(function Button() {}, { Group: function ButtonGroup() {} });
const Dropdown = function Dropdown() {};
const Icon = function Icon() {};
const Menu = Object.assign(function Menu() {}, { Item: function MenuItem() {} });
const Tooltip = function Tooltip() {};
const Input = Object.assign(function Input() {}, { TextArea: function TextArea() {} });
const ContextMenuTable = function ContextMenuTable() {};
const UserFilterDrawer = function UserFilterDrawer() {};
const SendMailEditor = function SendMailEditor() {};
const UserGenerator = function UserGenerator() {};
const UserFormFieldGroup = function UserFormFieldGroup() {};
const UserActionDropdown = function UserActionDropdown() {};
const UserContextMenu = function UserContextMenu() {};
const Table = function Table() {};

const SHIMS = {
    'antd/lib/button': Button,
    'antd/lib/dropdown': Dropdown,
    'antd/lib/icon': Icon,
    'antd/lib/menu': Menu,
    'antd/lib/tooltip': Tooltip,
    'antd/lib/input': Input,
    'antd/lib/table': Table,
    'antd/lib/table/interface': { ColumnProps: {} },
};

function buildRequire(extra = {}) {
    return function require(id) {
        if (id === 'react') return React;
        for (const [key, value] of Object.entries(SHIMS)) {
            if (id === key || id.endsWith(key)) return value;
        }
        for (const [key, value] of Object.entries(extra)) {
            if (id.endsWith(key)) return value;
        }
        throw new Error(`Unexpected dependency: ${id}`);
    };
}

async function load(relativePath, extra = {}) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react-redux') return { connect: () => (component) => component };
            return buildRequire(extra)(id);
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

test('user toolbar composes the filter drawer, action menu and generator', async () => {
    const { default: UserToolbar } = await load('../src/pages/user/components/UserToolbar.tsx', {
        './UserFilterDrawer': { __esModule: true, default: UserFilterDrawer },
        './SendMailEditor': { __esModule: true, default: SendMailEditor },
        './UserGenerator': { __esModule: true, default: UserGenerator },
    });
    const calls = [];
    const filter = [{ key: 'email', condition: '模糊', value: 'a' }];
    const plans = [{ id: 1, name: 'Basic' }];
    const tree = UserToolbar({
        filter,
        plans,
        onFilter: (next) => calls.push(['filter', next]),
        onExport: () => calls.push(['export']),
        onBatchBan: () => calls.push(['ban']),
        onBatchDelete: () => calls.push(['delete']),
    });

    const drawer = findNodes(tree, UserFilterDrawer)[0];
    assert.equal(drawer.props.value, filter);
    assert.equal(drawer.props.key, 1);
    assert.deepEqual(plain(drawer.props.plans), plans);
    assert.equal(drawer.children[0].props.type, 'primary');
    assert.equal(drawer.props.onOk, drawer.props.onOk);

    const dropdown = findNodes(tree, Dropdown)[0];
    const menu = dropdown.props.overlay;
    assert.deepEqual(
        menu.children.map((item) => item.props.disabled ?? false),
        [false, false, false, false],
    );
    const anchors = findNodes(menu, 'a');
    anchors[0].props.onClick();
    anchors[2].props.onClick();
    assert.deepEqual(calls, [['export'], ['ban']]);

    const generator = findNodes(tree, UserGenerator)[0];
    assert.ok(generator, 'the generator wraps the add-user button');
});

test('user money fields bind balance and commission inputs', async () => {
    const { UserMoneyFields } = await load('../src/pages/user/components/UserMoneyFields.tsx');
    const changes = [];
    const tree = UserMoneyFields({
        user: { balance: 1000, commission_balance: null },
        onChange: (field, value) => changes.push([field, value]),
    });
    const inputs = findNodes(tree, Input);
    assert.deepEqual(
        inputs.map((input) => input.props.defaultValue),
        [1000, null],
    );
    assert.deepEqual(
        inputs.map((input) => input.props.addonAfter),
        ['¥', '¥'],
    );
    inputs[0].props.onChange({ target: { value: '2000' } });
    inputs[1].props.onChange({ target: { value: '50' } });
    assert.deepEqual(plain(changes), [
        ['balance', '2000'],
        ['commission_balance', '50'],
    ]);
});

test('user traffic fields reuse the form group and normalize empty defaults', async () => {
    const { UserTrafficFields } = await load('../src/pages/user/components/UserTrafficFields.tsx', {
        './UserFormFieldGroup': { UserFormFieldGroup },
        './UserFormValues': { toInputDefaultValue: (value) => value ?? undefined },
    });
    const changes = [];
    const tree = UserTrafficFields({
        user: { u: 1, d: 2, transfer_enable: null, device_limit: 3 },
        onChange: (field, value) => changes.push([field, value]),
    });
    const inputs = findNodes(tree, Input);
    assert.deepEqual(
        inputs.map((input) => [input.props.addonAfter, input.props.defaultValue]),
        [
            ['GB', 1],
            ['GB', 2],
            ['GB', undefined],
            [undefined, 3],
        ],
    );
    const groups = findNodes(tree, UserFormFieldGroup);
    assert.deepEqual(
        groups.map((group) => group.props.label),
        ['流量', '设备数限制'],
    );
    for (const input of inputs) input.props.onChange({ target: { value: '9' } });
    assert.deepEqual(plain(changes), [
        ['u', '9'],
        ['d', '9'],
        ['transfer_enable', '9'],
        ['device_limit', '9'],
    ]);
});

test('user form field group renders its label around the children', async () => {
    const { UserFormFieldGroup } = await load(
        '../src/pages/user/components/UserFormFieldGroup.tsx',
    );
    const tree = UserFormFieldGroup({ label: '邮箱', children: { type: 'input', props: {} } });
    assert.equal(tree.type, 'div');
    assert.equal(tree.props.className, 'form-group');
    assert.equal(tree.children[0].children[0], '邮箱');
    assert.deepEqual(tree.children[1], { type: 'input', props: {} });
});

test('user filter drawer forwards the keys built from the plan list', async () => {
    const FilterDrawer = function FilterDrawer() {};
    // Rebind the module dependency by loading with an overridden shim map.
    const source = await fs.readFile(
        new URL('../src/pages/user/components/UserFilterDrawer.tsx', import.meta.url),
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
            if (id.endsWith('/FilterDrawer')) return FilterDrawer;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    const plans = [{ id: 1, name: 'Basic' }];
    const keys = plain(module.exports.createUserFilterFields(plans));
    assert.deepEqual(
        keys.map((field) => [field.key, field.condition]),
        [
            ['email', ['模糊']],
            ['id', ['=', '>=', '>', '<', '<=']],
            ['plan_id', ['=']],
            ['transfer_enable', ['>=', '>', '<', '<=']],
            ['d', ['>=', '>', '<', '<=']],
            ['expired_at', ['>=', '>', '<', '<=']],
            ['uuid', ['=']],
            ['token', ['=']],
            ['banned', ['=']],
            ['invite_by_email', ['模糊']],
            ['invite_user_id', ['=']],
            ['remarks', ['模糊']],
            ['is_admin', ['=']],
        ],
    );
    const planField = keys.find((field) => field.key === 'plan_id');
    assert.deepEqual(planField.options, [
        { key: '无订阅', value: 'null' },
        { key: 'Basic', value: 1 },
    ]);
    const banned = keys.find((field) => field.key === 'banned');
    assert.deepEqual(plain(banned.options), [
        { key: '正常', value: 0 },
        { key: '封禁', value: 1 },
    ]);

    const onOk = () => {};
    const value = [];
    const tree = module.exports.default({
        children: { type: 'trigger', props: {} },
        value,
        plans,
        onOk,
    });
    assert.equal(tree.type, FilterDrawer);
    assert.equal(tree.props.value, value);
    assert.equal(tree.props.onOk, onOk);
    assert.deepEqual(plain(tree.props.keys), keys);
});

test('user list wires the context menu, pagination options and table change', async () => {
    const { UserList } = await load('../src/pages/user/components/UserList.tsx', {
        '@/components/common/ContextMenuTable': { __esModule: true, default: ContextMenuTable },
        './UserListColumns': { createUserListColumns: () => [{ key: 'email' }] },
        './UserListActions': {
            UserActionDropdown,
            UserContextMenu,
        },
    });
    const changes = [];
    const users = [{ id: 7, email: 'u@x.com' }];
    const list = new UserList({
        dispatch: () => {},
        user: { users, pagination: { current: 1, pageSize: 10 } },
        serverGroup: { groups: [] },
        onTableChange: (pagination, sorter) => changes.push(['table', pagination, sorter]),
        onResetSecret: () => changes.push(['reset']),
        onDeleteUser: () => changes.push(['delete']),
        onUserFilter: () => changes.push(['userFilter']),
        onOrderFilter: () => changes.push(['orderFilter']),
    });
    const table = findNodes(list.render(), ContextMenuTable)[0];
    assert.deepEqual(plain(table.props.dataSource), users);
    assert.deepEqual(plain(table.props.pagination.pageSizeOptions), ['10', '50', '100', '150']);
    assert.equal(table.props.pagination.size, 'small');
    assert.equal(table.props.scroll.x, 1500);
    table.props.onChange({ current: 2 }, undefined, { columnKey: 'email', order: 'descend' });
    assert.deepEqual(plain(changes[0]), [
        'table',
        { current: 2 },
        { columnKey: 'email', order: 'descend' },
    ]);

    table.props.onContextMenu(users[0]);
    assert.equal(list.contextUser, users[0]);
    const menu = findNodes(list.render(), UserContextMenu)[0];
    assert.equal(menu.props.user, users[0]);
    assert.deepEqual(Object.keys(menu.props.actions), [
        'onResetSecret',
        'onDeleteUser',
        'onUserFilter',
        'onOrderFilter',
    ]);
});
