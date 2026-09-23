import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadUserContextMenu() {
    const source = await fs.readFile(
        new URL('../src/pages/user/components/UserListActions.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = {
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/dropdown') return 'Dropdown';
            if (id === 'antd/lib/icon') return 'Icon';
            if (id === 'antd/lib/menu') return Object.assign('Menu', { Item: 'Menu.Item' });
            if (id.includes('AssignOrderEditor')) return 'AssignOrderEditor';
            if (id.includes('TrafficPanel')) return 'TrafficPanel';
            if (id.includes('siteHelpers')) return { copyToClipboard: () => true };
            if (id.endsWith('/UserEditor')) return 'UserEditor';
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.UserContextMenu;
}

test('user context menu forwards an absent user ID without inventing a number or string', async () => {
    const UserContextMenu = await loadUserContextMenu();
    const calls = [];
    const menu = UserContextMenu({
        user: undefined,
        actions: {
            onResetSecret() {},
            onDeleteUser() {},
            onOrderFilter: (...args) => calls.push(['order', ...args]),
            onUserFilter: (...args) => calls.push(['user', ...args]),
        },
    });

    menu.children[4].props.onClick();
    menu.children[5].props.onClick();

    assert.deepEqual(calls, [
        ['order', 'user_id', '=', undefined],
        ['user', 'invite_user_id', '=', undefined, true],
    ]);
});

test('user context menu forwards a selected user ID unchanged', async () => {
    const UserContextMenu = await loadUserContextMenu();
    const calls = [];
    const menu = UserContextMenu({
        user: { id: 42, email: 'member@example.test' },
        actions: {
            onResetSecret() {},
            onDeleteUser() {},
            onOrderFilter: (...args) => calls.push(['order', ...args]),
            onUserFilter: (...args) => calls.push(['user', ...args]),
        },
    });

    menu.children[4].props.onClick();
    menu.children[5].props.onClick();

    assert.deepEqual(calls, [
        ['order', 'user_id', '=', 42],
        ['user', 'invite_user_id', '=', 42, true],
    ]);
});
