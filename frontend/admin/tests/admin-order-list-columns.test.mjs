import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    // Like the real React, nested array children are flattened one level.
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
};
const Tag = function Tag() {};
const Tooltip = function Tooltip() {};
const Icon = function Icon() {};
const Badge = function Badge() {};
const Dropdown = function Dropdown() {};
const Menu = Object.assign(function Menu() {}, { Item: function MenuItem() {} });
const Table = function Table() {};
const Button = function Button() {};
const OrderDetailModal = function OrderDetailModal() {};
const settings = {
    periodText: {
        month: '月付',
        quarter: '季付',
        year: '年付',
        onetime: '一次性',
        reset: '重置包',
    },
    orderStatusText: ['未支付', '已支付', '已取消', '已完成', '已折抵'],
    commissionStatusText: ['待确认', '发放中', '已发放', '无效'],
};
const moment = (value) => ({ format: () => `MOMENT(${value})` });

const DEPS = { settings, moment, Tag, Tooltip, Icon, Badge, Dropdown, Menu, OrderDetailModal };

async function loadOriginal() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-order-list-columns.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports;
}

async function loadModule(relativePath) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require: orderModuleRequire,
    });
    return module.exports;
}

let orderColumnsModule;
function orderModuleRequire(id) {
    if (id === 'react') return React;
    const components = {
        'antd/lib/badge': Badge,
        'antd/lib/dropdown': Dropdown,
        'antd/lib/icon': Icon,
        'antd/lib/menu': Menu,
        'antd/lib/table/interface': { ColumnProps: {} },
        'antd/lib/tooltip': Tooltip,
    };
    if (id === 'antd/lib/tag') return Tag;
    if (id === 'moment') return moment;
    if (id in components) return components[id];
    if (id.endsWith('/adminSettings')) return { settings };
    if (id.endsWith('/OrderDetailModal')) return { ConnectedOrderDetailModal: OrderDetailModal };
    if (id.endsWith('/OrderColumns')) return orderColumnsModule;
    throw new Error(`Unexpected dependency: ${id}`);
}

async function loadRecovered(relativePath = '../src/pages/order/components/OrderListColumns.tsx') {
    // Load the real OrderColumns module so the composition is compared end to
    // end; only its own dependencies are mocked.
    orderColumnsModule = await loadModule('../src/pages/order/components/OrderColumns.tsx');
    return loadModule(relativePath);
}

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (_key, child) =>
            typeof child === 'function' ? '[function]' : child,
        ),
    );
}

const SAMPLE_ORDER = {
    id: 42,
    trade_no: '2024050112345678',
    period: 'month',
    status: 0,
    commission_status: 0,
    commission_balance: 1200,
};

test('order list columns match the bundle-rendered column set', async () => {
    const dispatchCalls = [];
    const dispatch = (action) => dispatchCalls.push(action);
    const [original, recovered] = [
        (await loadOriginal())(React, DEPS, dispatch),
        (await loadRecovered()).createOrderListColumns(dispatch),
    ];
    assert.equal(original.length, recovered.length);
    for (const [index, pair] of original.entries()) {
        const [a, b] = [pair, recovered[index]];
        assert.deepEqual(
            { title: normalize(b.title), dataIndex: b.dataIndex, key: b.key, align: b.align },
            { title: normalize(a.title), dataIndex: a.dataIndex, key: a.key, align: a.align },
            `column ${index} (${a.key}) metadata differs`,
        );
    }
});

test('order list column renders match the bundle behavior', async () => {
    const [original, recovered] = [
        (await loadOriginal())(React, DEPS, () => {}),
        (await loadRecovered()).createOrderListColumns(() => {}),
    ];
    const pick = (columns, key) => columns.find((column) => column.key === key);

    assert.equal(
        normalize(pick(original, 'type').render(1, SAMPLE_ORDER)),
        normalize(pick(recovered, 'type').render(1, SAMPLE_ORDER)),
    );
    assert.deepEqual(
        normalize(pick(original, 'period').render(undefined, SAMPLE_ORDER)),
        normalize(pick(recovered, 'period').render(undefined, SAMPLE_ORDER)),
    );
    assert.equal(
        pick(original, 'total_amount').render(1200, SAMPLE_ORDER),
        pick(recovered, 'total_amount').render(1200, SAMPLE_ORDER),
    );
    assert.equal(
        pick(original, 'commission_balance').render(1200, SAMPLE_ORDER),
        pick(recovered, 'commission_balance').render(1200, SAMPLE_ORDER),
    );
    assert.equal(
        pick(original, 'created_at').render(1714521600, SAMPLE_ORDER),
        pick(recovered, 'created_at').render(1714521600, SAMPLE_ORDER),
    );

    const originalTrade = pick(original, 'trade_no').render(SAMPLE_ORDER.trade_no, SAMPLE_ORDER);
    const recoveredTrade = pick(recovered, 'trade_no').render(SAMPLE_ORDER.trade_no, SAMPLE_ORDER);
    assert.deepEqual(normalize(recoveredTrade), normalize(originalTrade));

    for (const [label, order] of [
        ['unpaid', SAMPLE_ORDER],
        ['paid-hide-commission', { ...SAMPLE_ORDER, status: 1, commission_balance: 0 }],
        ['cancelled', { ...SAMPLE_ORDER, status: 2 }],
        ['issued', { ...SAMPLE_ORDER, status: 1, commission_status: 2 }],
    ]) {
        assert.deepEqual(
            normalize(pick(recovered, 'status').render(order.status, order)),
            normalize(pick(original, 'status').render(order.status, order)),
            `status render differs for ${label}`,
        );
        assert.deepEqual(
            normalize(pick(recovered, 'commission_status').render(order.commission_status, order)),
            normalize(pick(original, 'commission_status').render(order.commission_status, order)),
            `commission_status render differs for ${label}`,
        );
    }
});

test('order status and commission menus dispatch the bundle actions', async () => {
    const paidCalls = [];
    const original = (await loadOriginal())(React, DEPS, (action) => paidCalls.push(action));
    const recovered = (await loadRecovered()).createOrderListColumns((action) =>
        paidCalls.push(action),
    );
    const pick = (columns, key) => columns.find((column) => column.key === key);

    for (const columns of [original, recovered]) {
        const statusNode = pick(columns, 'status').render(0, SAMPLE_ORDER);
        const dropdown = findNode(statusNode, Dropdown);
        const menu = dropdown.props.overlay;
        menu.children[0].props.onClick();
        menu.children[1].props.onClick();
    }
    // Actions originate in two different vm realms; compare as plain JSON.
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(paidCalls), [
        { type: 'order/paid', tradeNo: SAMPLE_ORDER.trade_no },
        { type: 'order/cancel', tradeNo: SAMPLE_ORDER.trade_no },
        { type: 'order/paid', tradeNo: SAMPLE_ORDER.trade_no },
        { type: 'order/cancel', tradeNo: SAMPLE_ORDER.trade_no },
    ]);

    const activeOrder = { ...SAMPLE_ORDER, status: 1, commission_status: 0 };
    for (const columns of [original, recovered]) {
        const commissionNode = pick(columns, 'commission_status').render(0, activeOrder);
        const dropdown = findNode(commissionNode, Dropdown);
        dropdown.props.overlay.children[1].props.onClick({ key: '1' });
    }
    // The bundle routes commission updates through the same dispatch; filter by type.
    assert.deepEqual(plain(paidCalls.filter((action) => action.type === 'order/update')), [
        {
            type: 'order/update',
            tradeNo: SAMPLE_ORDER.trade_no,
            key: 'commission_status',
            value: '1',
        },
        {
            type: 'order/update',
            tradeNo: SAMPLE_ORDER.trade_no,
            key: 'commission_status',
            value: '1',
        },
    ]);
});

function findNode(tree, type) {
    if (Array.isArray(tree)) {
        for (const child of tree) {
            const found = findNode(child, type);
            if (found) return found;
        }
        return undefined;
    }
    if (!tree || typeof tree !== 'object') return undefined;
    if (tree.type === type) return tree;
    return findNode(tree.children, type) || findNode(tree.props?.children, type);
}
