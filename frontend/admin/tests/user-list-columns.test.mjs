// Differential evidence for UserListColumns against webpack module 64316361
// (user page class M, render method columns array). The bundle builds the
// columns inline inside the render method of the connected component.
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
const Tag = function Tag() {};
const Tooltip = function Tooltip() {};

// --- Original (reconstructed from bundle module 64316361, class M render) ---
function loadOriginalColumns() {
    // The bundle's columns array is inline in the render method; the key
    // business logic per column is transcribed here unchanged.
    const STATUS_BADGES = ['error', 'warning', 'processing'];
    return [
        { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            render: (email, user) => {
                const online = user.t && Date.now() / 1000 - 600 <= user.t;
                const tooltip = user.t ? `最后在线${'2026-01-02 03:04:05'}` : '从未在线';
                return React.createElement(
                    Tooltip,
                    { placement: 'top', title: tooltip },
                    React.createElement(Badge2, {
                        status: Date.now() / 1000 - 600 > user.t ? 'default' : 'success',
                    }),
                    email,
                );
            },
        },
        {
            title: '状态',
            dataIndex: 'banned',
            key: 'banned',
            sorter: true,
            render: (banned) =>
                React.createElement(
                    Tag,
                    { color: banned ? 'red' : 'green' },
                    banned ? '封禁' : '正常',
                ),
        },
        {
            title: '订阅',
            dataIndex: 'plan_name',
            key: 'plan_id',
            sorter: true,
            render: (name) => name || '-',
        },
        {
            title: '权限组',
            dataIndex: 'group_id',
            key: 'group_id',
            sorter: true,
            render: (groupId) => {
                const groups = [{ id: 3, name: 'VIP' }];
                const group = groups.find((g) => g.id === groupId);
                return group ? group.name : '-';
            },
        },
        {
            title: '已用(G)',
            dataIndex: 'total_used',
            key: 'total_used',
            sorter: true,
            render: (used, user) =>
                React.createElement(
                    Tag,
                    {
                        color:
                            parseFloat(String(used)) > parseFloat(String(user.transfer_enable))
                                ? 'red'
                                : 'green',
                    },
                    used,
                ),
        },
        { title: '流量(G)', dataIndex: 'transfer_enable', key: 'transfer_enable', sorter: true },
        {
            title: '设备数',
            dataIndex: 'device_limit',
            key: 'updated_at',
            sorter: (left, right) => (left.alive_ip || 0) - (right.alive_ip || 0),
            render: (_value, user) => {
                const deviceCount = user.alive_ip !== null ? user.alive_ip : 0;
                const deviceLimit = user.device_limit !== null ? user.device_limit : '∞';
                const text = `${deviceCount} / ${deviceLimit}`;
                return user.ips
                    ? React.createElement(Tooltip, { placement: 'top', title: user.ips }, text)
                    : text;
            },
        },
        {
            title: '到期时间',
            dataIndex: 'expired_at',
            key: 'expired_at',
            sorter: true,
            render: (expiresAt) =>
                React.createElement(
                    Tag,
                    {
                        color:
                            expiresAt !== null &&
                            expiresAt !== undefined &&
                            Number(expiresAt) < Date.now() / 1000
                                ? 'red'
                                : 'green',
                    },
                    expiresAt ? '2026-01-02 03:04:05' : expiresAt === null ? '长期有效' : '-',
                ),
        },
        { title: '余额', dataIndex: 'balance', key: 'balance', sorter: true },
        {
            title: '佣金',
            dataIndex: 'commission_balance',
            key: 'commission_balance',
            sorter: true,
        },
        {
            title: '加入时间',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            render: (createdAt) => '2026-01-02 03:04:05',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            fixed: 'right',
            render: (_value, user) => ({ type: 'actions', props: { user } }),
        },
    ];
}

// Badge2 helper used by the original email column render
function Badge2(props) {
    return { type: 'Badge', props };
}

async function loadRecovered() {
    const source = await fs.readFile(
        new URL('../src/pages/user/components/UserListColumns.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const formatDateTime = () => '2026-01-02 03:04:05';
    const Tag = function Tag() {};
    const Tooltip = function Tooltip() {};
    const UserDisplayColumns = {
        createUserEmailColumn: () => ({
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            render: (email, user) => {
                const online = user.t && Date.now() / 1000 - 600 <= user.t;
                return React.createElement(
                    Tooltip,
                    {
                        placement: 'top',
                        title: user.t ? `最后在线2026-01-02 03:04:05` : '从未在线',
                    },
                    React.createElement(Tag, {
                        color: online ? 'success' : 'default',
                    }),
                    email,
                );
            },
        }),
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/tag') return Tag;
            if (id === 'antd/lib/tooltip') return Tooltip;
            if (id.endsWith('/dateTimeFormatter'))
                return { formatDateTime: () => '2026-01-02 03:04:05' };
            if (id.endsWith('/UserDisplayColumns')) return UserDisplayColumns;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (_key, child) =>
            typeof child === 'function' ? '[function]' : child,
        ),
    );
}

const groups = [{ id: 3, name: 'VIP' }];

test('user list columns have the bundle column set', async () => {
    const original = loadOriginalColumns();
    const recoveredModule = await loadRecovered();
    const recoveredColumns = recoveredModule.createUserListColumns(groups, () => null);
    assert.deepEqual(
        normalize(original.map((column) => column.dataIndex)),
        normalize(recoveredColumns.map((column) => column.dataIndex)),
    );
});

test('user banned column renders red for banned and green for active', async () => {
    const original = loadOriginalColumns();
    const recoveredModule = await loadRecovered();
    const recoveredColumns = recoveredModule.createUserListColumns(groups, () => null);
    const bannedCol = recoveredColumns.find((c) => c.dataIndex === 'banned');
    const bannedOriginal = original.find((c) => c.dataIndex === 'banned');
    assert.deepEqual(normalize(bannedCol.render(1, {})), normalize(bannedOriginal.render(1, {})));
    assert.deepEqual(normalize(bannedCol.render(0, {})), normalize(bannedOriginal.render(0, {})));
});

test('user traffic used column flags over-usage in red', async () => {
    const recoveredModule = await loadRecovered();
    const recoveredColumns = recoveredModule.createUserListColumns(groups, () => null);
    const usedCol = recoveredColumns.find((c) => c.dataIndex === 'total_used');
    const overUser = { total_used: 200, transfer_enable: 100 };
    const withinUser = { total_used: 50, transfer_enable: 100 };
    const overTag = usedCol.render(200, overUser);
    const withinTag = usedCol.render(50, withinUser);
    assert.equal(overTag.props.color, 'red');
    assert.equal(withinTag.props.color, 'green');
});

test('user device column shows alive_ip over device_limit with ips tooltip', async () => {
    const recoveredModule = await loadRecovered();
    const recoveredColumns = recoveredModule.createUserListColumns(groups, () => null);
    const deviceCol = recoveredColumns.find((c) => c.dataIndex === 'device_limit');
    const withIps = { alive_ip: 3, device_limit: 5, ips: '1.2.3.4\n5.6.7.8' };
    const noIps = { alive_ip: 1, device_limit: null };
    const withCell = deviceCol.render(undefined, withIps);
    assert.equal(String(withCell.type).slice(0, 10), 'function T');
    assert.equal(withCell.props.title, '1.2.3.4\n5.6.7.8');
    const noCell = deviceCol.render(undefined, noIps);
    assert.equal(noCell, '1 / ∞');
});

test('user expired column shows red for expired and long-term for null', async () => {
    const recoveredModule = await loadRecovered();
    const recoveredColumns = recoveredModule.createUserListColumns(groups, () => null);
    const expiredCol = recoveredColumns.find((c) => c.dataIndex === 'expired_at');
    const expiredTag = expiredCol.render(Math.floor(Date.now() / 1000) - 86400);
    assert.equal(expiredTag.props.color, 'red');
    const nullTag = expiredCol.render(null);
    assert.equal(nullTag.props.color, 'green');
    assert.equal(nullTag.children[0], '长期有效');
});
