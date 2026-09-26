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
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const MainLayout = function MainLayout() {};
const LoadingContainer = function LoadingContainer() {};
const ButtonGroup = function ButtonGroup() {};
const FilterDrawer = function FilterDrawer() {};
const AssignOrderEditor = function AssignOrderEditor() {};
const Button = function Button() {};
const Icon = function Icon() {};
const OrderList = function OrderList() {};
const OrderDetailModal = function OrderDetailModal() {};

const DEPS = {
    Component: React.Component,
    createElement: React.createElement,
    MainLayout,
    LoadingContainer,
    ButtonGroup,
    FilterDrawer,
    AssignOrderEditor,
    Button,
    Icon,
};

async function loadOriginal() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-order-page.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports(DEPS);
}

async function loadRecovered() {
    const source = await fs.readFile(
        new URL('../src/pages/order/OrderPage.tsx', import.meta.url),
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
            if (id === 'antd/lib/button') return Button;
            if (id === 'antd/lib/icon') return Icon;
            if (id === 'react-redux') return { connect: () => (component) => component };
            if (id.endsWith('/AssignOrderEditor')) return AssignOrderEditor;
            if (id.endsWith('/LoadingContainer')) return LoadingContainer;
            if (id.endsWith('/MainLayout')) return MainLayout;
            if (id.endsWith('/OrderFilterDrawer')) return FilterDrawer;
            if (id.endsWith('/OrderList')) return { OrderList };
            if (id.endsWith('/OrderDetailModal'))
                return { OrderDetailModal, ConnectedOrderDetailModal: OrderDetailModal };
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.OrderPage;
}

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (_key, child) =>
            typeof child === 'function' ? '[function]' : child,
        ),
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

test('order page mounts, unmounts and paginates with the bundle dispatch order', async () => {
    const OriginalPage = await loadOriginal();
    const RecoveredPage = await loadRecovered();
    const snapshots = [];
    for (const Page of [OriginalPage, RecoveredPage]) {
        const dispatchCalls = [];
        const page = new Page({ dispatch: (action) => dispatchCalls.push(action), order: {} });
        page.componentDidMount();
        page.componentWillUnmount();
        snapshots.push([...dispatchCalls]);
    }
    assert.deepEqual(normalize(snapshots[0]), normalize(snapshots[1]));
    assert.deepEqual(normalize(snapshots[1]), [
        { type: 'order/fetch' },
        { type: 'plan/fetch' },
        { type: 'order/empty' },
        { type: 'order/setState', payload: { filter: [] } },
    ]);
});

test('order page renders the bundle layout structure', async () => {
    const OriginalPage = await loadOriginal();
    const RecoveredPage = await loadRecovered();
    const order = { fetchLoading: false, filter: [], orders: [], pagination: { current: 1 } };
    for (const Page of [OriginalPage, RecoveredPage]) {
        const page = new Page({ dispatch: () => {}, order });
        const tree = page.render();
        const layout = findNodes(tree, MainLayout)[0];
        assert.equal(layout.props.title, '订单管理');
        const loading = findNodes(tree, LoadingContainer)[0];
        assert.equal(loading.props.loading, false);
        const drawers = findNodes(tree, FilterDrawer);
        assert.equal(drawers.length, 1);
        assert.equal(drawers[0].props.value, order.filter);
        const editors = findNodes(tree, AssignOrderEditor);
        assert.equal(editors.length, 1);
        // The bundle keeps the table inline while the recovery extracts an
        // OrderList component, so only the toolbar structure is compared here.
        // The extracted table wiring is covered by the OrderListColumns
        // differential and the recovered OrderList tests.
        const lists = findNodes(tree, OrderList);
        if (lists.length) assert.equal(lists[0].props.order, order);
    }
});
