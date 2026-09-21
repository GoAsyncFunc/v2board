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
                const next = typeof update === 'function' ? update(this.state, this.props) : update;
                this.state = { ...this.state, ...next };
                if (callback) callback();
            }

            forceUpdate() {}
        },
        Fragment: 'Fragment',
        cloneElement: (element, props) => ({
            ...element,
            props: { ...element.props, ...props },
        }),
        createElement: (type, props, ...children) => ({
            type,
            props: props || {},
            children,
        }),
    };
}

const Menu = Object.assign('Menu', { Item: 'Menu.Item' });
const Button = Object.assign('Button', { Group: 'Button.Group' });
const React = createReact();

async function loadModule(relativePath, localModules = {}, responses = []) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const requests = [];
    const routes = [];
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window: { settings: { secure_path: 'admin' } },
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === 'antd/lib/button') return Button;
            if (id === 'antd/lib/menu') return Menu;
            if (id.includes('app/navigation')) {
                return { __esModule: true, default: { push: (route) => routes.push(route) } };
            }
            if (id.includes('services/request')) {
                return {
                    post: async (endpoint, data) => {
                        requests.push({ method: 'post', endpoint, data });
                        return responses.shift();
                    },
                    get: async (endpoint, data) => {
                        requests.push({ method: 'get', endpoint, data });
                        return responses.shift();
                    },
                };
            }
            if (id.includes('types/api')) return { isSuccessfulResponse: (response) => response.code === 200 };
            if (id.includes('adminSettings')) {
                return {
                    settings: {
                        periodText: { month_price: '月付' },
                        orderStatusText: ['未支付', '已支付', '已取消', '已完成', '已折抵'],
                        commissionStatusText: ['待确认', '有效', '已发放', '无效'],
                    },
                };
            }
            if (id === './_List' || id.endsWith('/_List')) return localModules.list;
            if (id === './_Drawer/filter' || id.endsWith('/_Drawer/filter')) {
                return localModules.filter;
            }
            if (id === '../_Modal/detail' || id.endsWith('/_Modal/detail')) {
                return localModules.detail;
            }
            if (id === './columns' || id.endsWith('/_List/columns')) {
                return localModules.columns;
            }
            if (id.includes('FilterDrawer')) return 'FilterDrawer';
            if (id.includes('OrderDetailBody')) return localModules.detailBody;
            if (id.includes('OrderDisplayColumns')) return localModules.columns;
            if (id.includes('AssignOrderEditor')) return 'AssignOrderEditor';
            if (id.includes('LoadingContainer')) return 'LoadingContainer';
            if (id.includes('MainLayout')) return 'MainLayout';
            if (id.startsWith('antd/')) return id;
            return { __esModule: true, default: id };
        },
    });
    return { ...module.exports, requests, routes };
}

async function loadPage() {
    return loadModule('../src/pages/order/index.tsx', {
        list: { __esModule: true, OrderList: 'OrderList' },
        filter: { __esModule: true, default: 'OrderFilterDrawer' },
        detail: {
            __esModule: true,
            OrderDetailModal: 'OrderDetailModal',
            ConnectedOrderDetailModal: 'ConnectedOrderDetailModal',
        },
    });
}

async function loadList() {
    return loadModule('../src/pages/order/_List/index.tsx', {
        detail: { __esModule: true, ConnectedOrderDetailModal: 'ConnectedOrderDetailModal' },
        columns: {
            createReadonlyOrderColumns: () => ({
                type: { key: 'type' },
                period: { key: 'period' },
                total_amount: { key: 'total_amount' },
                commission_balance: { key: 'commission_balance' },
                created_at: { key: 'created_at' },
            }),
        },
    });
}

async function loadDetail(responses = []) {
    return loadModule(
        '../src/pages/order/_Modal/detail.tsx',
        { detailBody: 'OrderDetailBody' },
        responses,
    );
}

test('Order detail loads order, user and inviter in sequence and supports user filtering', async () => {
    const runtime = await loadDetail([
        { code: 200, data: { id: 7, user_id: 3, invite_user_id: 4, trade_no: 'ABC123' } },
        { code: 200, data: { email: 'buyer@example.com' } },
        { code: 200, data: { email: 'inviter@example.com' } },
    ]);
    const actions = [];
    const modal = new runtime.OrderDetailModal({
        dispatch: (action) => actions.push(action),
        orderId: 7,
        plan: { plans: [] },
        children: null,
    });
    await modal.getOrderInfo();
    assert.deepEqual(normalize(runtime.requests), [
        { method: 'post', endpoint: '/admin/order/detail', data: { id: 7 } },
        { method: 'get', endpoint: '/admin/user/getUserInfoById', data: { id: 3 } },
        { method: 'get', endpoint: '/admin/user/getUserInfoById', data: { id: 4 } },
    ]);
    assert.equal(modal.state.user.email, 'buyer@example.com');
    assert.equal(modal.state.inviteUser.email, 'inviter@example.com');
    modal.jumpUserFilter('email', '模糊', 'buyer@example.com');
    assert.deepEqual(normalize(actions), [
        { type: 'user/addFilter', key: 'email', condition: '模糊', value: 'buyer@example.com' },
    ]);
    assert.deepEqual(runtime.routes, ['/user']);
});

test('Order detail stops requesting when the order lookup fails', async () => {
    const runtime = await loadDetail([{ code: 422, data: null }]);
    const modal = new runtime.OrderDetailModal({
        dispatch() {},
        orderId: 9,
        plan: { plans: [] },
        children: null,
    });
    await modal.getOrderInfo();
    assert.equal(runtime.requests.length, 1);
    assert.equal(modal.state.visible, true);
    assert.equal(modal.state.user.email, '');
});

test('Order page preserves lifecycle, filter and nested list composition', async () => {
    const runtime = await loadPage();
    const actions = [];
    const order = {
        orders: [],
        fetchLoading: false,
        assignLoading: false,
        pagination: { current: 1, pageSize: 10 },
        filter: [],
    };
    const page = new runtime.OrderPage({
        dispatch: (action) => actions.push(action),
        order,
    });
    page.componentDidMount();
    const tree = page.render();
    const list = findNode(tree, (node) => node.type === 'OrderList');
    const filter = findNode(tree, (node) => node.type === 'OrderFilterDrawer');
    filter.props.onOk([{ key: 'trade_no', condition: '模糊', value: 'ABC' }]);
    page.componentWillUnmount();
    assert.equal(list.props.order, order);
    assert.deepEqual(normalize(actions), [
        { type: 'order/fetch' },
        { type: 'plan/fetch' },
        {
            type: 'order/filter',
            filter: [{ key: 'trade_no', condition: '模糊', value: 'ABC' }],
        },
        { type: 'order/empty' },
        { type: 'order/setState', payload: { filter: [] } },
    ]);
});

test('Order list preserves status, commission and pagination actions', async () => {
    const runtime = await loadList();
    const actions = [];
    const orders = [{
        id: 7,
        trade_no: 'TRADE',
        status: 0,
        commission_status: 0,
        commission_balance: 100,
    }];
    const list = new runtime.OrderList({
        dispatch: (action) => actions.push(action),
        order: {
            orders,
            fetchLoading: false,
            assignLoading: false,
            pagination: { current: 1, pageSize: 10 },
            filter: [],
        },
    });
    list.update('TRADE', 'commission_status', '1');
    const statusTree = list.renderOrderStatus(0, orders[0]);
    statusTree.props.overlay.children[0].props.onClick();
    statusTree.props.overlay.children[1].props.onClick();
    const commissionTree = list.renderCommissionStatus(0, { ...orders[0], status: 1 });
    commissionTree.props.overlay.children[0][1].props.onClick({ key: '1' });
    const table = findNode(list.render(), (node) => node.type === 'antd/lib/table');
    table.props.onChange({ current: 2, pageSize: 20 });
    assert.deepEqual(normalize(actions), [
        { type: 'order/update', tradeNo: 'TRADE', key: 'commission_status', value: '1' },
        { type: 'order/paid', tradeNo: 'TRADE' },
        { type: 'order/cancel', tradeNo: 'TRADE' },
        { type: 'order/update', tradeNo: 'TRADE', key: 'commission_status', value: '1' },
        { type: 'order/changeTable', pagination: { current: 2, pageSize: 20 } },
    ]);
});

function findNode(tree, predicate) {
    if (Array.isArray(tree)) return tree.map((node) => findNode(node, predicate)).find(Boolean);
    if (!tree || typeof tree !== 'object') return undefined;
    if (predicate(tree)) return tree;
    return findNode(tree.children, predicate) || findNode(tree.props?.children, predicate);
}
