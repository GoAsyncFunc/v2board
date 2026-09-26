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
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const Modal = function Modal() {};
const Body = function OrderDetailBody() {};
const history = {
    push(url) {
        history.calls.push(url);
    },
};
history.calls = [];

const responses = {};
const settings = { secure_path: 'admin' };
const sandboxWindow = { settings };
const apiCalls = [];
const post = (url, params) => {
    apiCalls.push(['post', url, params]);
    return Promise.resolve(responses[url] ?? {});
};
const get = (url, params) => {
    apiCalls.push(['get', url, params]);
    return Promise.resolve(responses[`${url}:${params.id}`] ?? {});
};

const DEPS = {
    Component: React.Component,
    Modal,
    Body,
    post,
    get,
    history,
    createElement: React.createElement,
    window: sandboxWindow,
};

async function loadOriginal() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-order-detail-modal.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports(DEPS);
}

async function loadRecovered() {
    const source = await fs.readFile(
        new URL('../src/pages/order/components/OrderDetailModal.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        window: sandboxWindow,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'react-redux') return { connect: () => (component) => component };
            if (id.endsWith('/navigationService')) return history;
            if (id.endsWith('/apiClient')) return { get, post };
            if (id.endsWith('/apiContracts'))
                return { isSuccessfulResponse: (r) => r.code === 200 };
            if (id.endsWith('/OrderDetailBody')) return Body;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.OrderDetailModal;
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

async function loadBoth() {
    const [OriginalModal, RecoveredModal] = [await loadOriginal(), await loadRecovered()];
    const make = (ModalClass) => {
        const dispatchCalls = [];
        history.calls.length = 0;
        apiCalls.length = 0;
        const instance = new ModalClass({
            children: { type: 'trigger', props: {} },
            dispatch: (action) => dispatchCalls.push(action),
            orderId: 42,
            plan: { plans: [{ id: 1, name: 'Starter' }] },
        });
        return { instance, dispatchCalls };
    };
    return { make, OriginalModal, RecoveredModal };
}

test('order detail modal fetches order, user and invite user in the bundle order', async () => {
    const { make, OriginalModal, RecoveredModal } = await loadBoth();
    responses['/admin/order/detail'] = {
        code: 200,
        data: { user_id: 7, invite_user_id: 9, trade_no: 'T1' },
    };
    responses['/admin/user/getUserInfoById:7'] = { code: 200, data: { email: 'u@x.com' } };
    responses['/admin/user/getUserInfoById:9'] = { code: 200, data: { email: 'inv@x.com' } };

    const snapshots = [];
    for (const ModalClass of [OriginalModal, RecoveredModal]) {
        const { instance, dispatchCalls } = make(ModalClass);
        await instance.getOrderInfo();
        assert.equal(instance.state.visible, true);
        assert.equal(instance.state.user.email, 'u@x.com');
        snapshots.push({
            calls: [...apiCalls],
            dispatch: dispatchCalls,
            order: instance.state.order,
            invite: instance.state.inviteUser ?? instance.state.invite_user,
            tree: instance.render(),
        });
    }
    const [original, recovered] = snapshots;
    // Each module runs in its own vm realm; compare as plain JSON data.
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(recovered.calls), plain(original.calls));
    assert.deepEqual(plain(recovered.order), plain(original.order));
    assert.deepEqual(plain(recovered.invite), plain(original.invite));

    for (const tree of [original.tree, recovered.tree]) {
        const modal = findNodes(tree, Modal)[0];
        assert.equal(modal.props.title, '订单信息');
        assert.equal(modal.props.footer, false);
        const body = findNodes(tree, Body)[0];
        assert.equal(body.props.user.email, 'u@x.com');
        body.props.onUserFilter('email', '模糊', 'u@x.com');
    }
    assert.deepEqual(history.calls, ['/user', '/user']);
});

test('order detail modal keeps a previous invite user when the order has none', async () => {
    const { make, OriginalModal, RecoveredModal } = await loadBoth();
    for (const ModalClass of [OriginalModal, RecoveredModal]) {
        const { instance } = make(ModalClass);
        responses['/admin/order/detail'] = {
            code: 200,
            data: { user_id: 7, invite_user_id: 9, trade_no: 'T2' },
        };
        responses['/admin/user/getUserInfoById:7'] = { code: 200, data: { email: 'a@x.com' } };
        responses['/admin/user/getUserInfoById:9'] = { code: 200, data: { email: 'old@x.com' } };
        await instance.getOrderInfo();
        assert.equal((instance.state.inviteUser ?? instance.state.invite_user).email, 'old@x.com');

        responses['/admin/order/detail'] = {
            code: 200,
            data: { user_id: 7, trade_no: 'T3' },
        };
        responses['/admin/user/getUserInfoById:7'] = { code: 200, data: { email: 'b@x.com' } };
        await instance.getOrderInfo();
        // The original never resets invite_user; the recovered modal now matches.
        assert.equal((instance.state.inviteUser ?? instance.state.invite_user).email, 'old@x.com');
        assert.equal(instance.state.order.trade_no, 'T3');
    }
});

test('order detail modal guards failed responses and toggles visibility', async () => {
    const { make, OriginalModal, RecoveredModal } = await loadBoth();
    responses['/admin/order/detail'] = { code: 500, data: null };
    for (const ModalClass of [OriginalModal, RecoveredModal]) {
        const { instance } = make(ModalClass);
        const orderBefore = instance.state.order;
        await instance.getOrderInfo();
        assert.equal(instance.state.visible, true);
        assert.equal(instance.state.order, orderBefore); // failed response changes nothing
        const modal = findNodes(instance.render(), Modal)[0];
        modal.props.onCancel();
        assert.equal(instance.state.visible, false);
        modal.props.onCancel();
        assert.equal(instance.state.visible, true);
    }
});
