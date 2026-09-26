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
const Input = 'Input';
const Select = Object.assign(function Select() {}, { Option: 'Select.Option' });
const Divider = 'Divider';
const Modal = { confirm: () => {} };
const Switch = function Switch() {};
const Table = function Table() {};
const SortableTable = function SortableTable() {};
const TableDragHandle = function TableDragHandle() {};
const NotifyColumn = function NotifyColumn() {};

const SHIM = {
    'antd/lib/input': Input,
    'antd/lib/select': Select,
    'antd/lib/divider': Divider,
    'antd/lib/modal': Modal,
    'antd/lib/switch': Switch,
    'antd/lib/table': Table,
    'antd/lib/table/interface': { ColumnProps: {} },
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
            if (id.endsWith('/SortableTable'))
                return { __esModule: true, default: SortableTable, TableDragHandle };
            if (id.endsWith('/PaymentNotifyColumn'))
                return {
                    createPaymentNotifyColumn: () => ({
                        title: NotifyColumn,
                        dataIndex: 'notify',
                        key: 'notify',
                    }),
                };
            for (const [key, value] of Object.entries(SHIM)) {
                if (id === key || id.endsWith(key)) return value;
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

test('payment basic fields forward values and convert the fixed fee to cents', async () => {
    const { PaymentBasicFields } = await load(
        '../src/pages/config/payment/components/PaymentBasicFields.tsx',
    );
    const changes = [];
    const methods = ['EPay', 'Stripe'];
    const tree = PaymentBasicFields({
        submit: {
            name: 'EPay',
            icon: undefined,
            notify_domain: undefined,
            handling_fee_fixed: 150,
        },
        paymentMethods: methods,
        selectedPaymentMethod: 'EPay',
        onSubmitChange: (field, value) => changes.push(['submit', field, value]),
        onPaymentMethodChange: (payment) => changes.push(['method', payment]),
    });
    const inputs = findNodes(tree, Input);
    assert.equal(inputs.length, 5);
    assert.deepEqual(
        inputs.map((input) => input.props.defaultValue),
        ['EPay', undefined, undefined, undefined, 1.5],
    );
    inputs[0].props.onChange({ target: { value: 'Renamed' } });
    inputs[3].props.onChange({ target: { value: '1' } });
    inputs[4].props.onChange({ target: { value: '2' } });
    const select = findNodes(tree, Select)[0];
    assert.equal(select.props.value, 'EPay');
    assert.deepEqual(
        select.children.map((option) => [option.props.value, option.children[0]]),
        [
            ['EPay', 'EPay'],
            ['Stripe', 'Stripe'],
        ],
    );
    select.props.onChange('Stripe');
    assert.deepEqual(plain(changes), [
        ['submit', 'name', 'Renamed'],
        ['submit', 'handling_fee_percent', '1'],
        ['submit', 'handling_fee_fixed', 200],
        ['method', 'Stripe'],
    ]);
});

test('payment config fields render only textual inputs with fallback values', async () => {
    const { PaymentConfigFields } = await load(
        '../src/pages/config/payment/components/PaymentConfigFields.tsx',
    );
    const changes = [];
    const form = {
        epay_url: { label: '易支付地址', type: 'input', description: 'd1' },
        epay_key: { label: '密钥', description: 'd2' },
        flag: { label: '开关', type: 'bool', description: 'd3' },
    };
    const config = { epay_url: null, epay_key: 'secret', flag: true };
    const tree = PaymentConfigFields({
        form,
        config,
        onChange: (field, value) => changes.push([field, value]),
    });
    const inputs = findNodes(tree, Input);
    // The boolean field intentionally renders no input; fallbacks fill empty config.
    assert.equal(inputs.length, 2);
    assert.deepEqual(
        inputs.map((input) => [input.props.id, input.props.defaultValue]),
        [
            ['payment-config-epay_url', undefined],
            ['payment-config-epay_key', 'secret'],
        ],
    );
    inputs[0].props.onChange({ target: { value: 'https://pay.x.com' } });
    assert.deepEqual(plain(changes), [['epay_url', 'https://pay.x.com']]);
});

test('payment list wires enable toggles, drag sorting and delete confirmation', async () => {
    const { default: PaymentList } = await load(
        '../src/pages/config/payment/components/PaymentList.tsx',
    );
    const dispatchCalls = [];
    const editors = [];
    const payments = [
        { id: 7, name: 'EPay', payment: 'EPay', enable: 1 },
        { id: 8, name: 'Stripe', payment: 'Stripe', enable: 0 },
    ];
    const renderEditor = (record) => {
        editors.push(record.id);
        return { type: 'editor', props: { id: record.id } };
    };
    const tree = PaymentList({
        dispatch: (action) => dispatchCalls.push(action),
        payment: { payments },
        renderEditor,
    });
    const sortable = findNodes(tree, SortableTable)[0];
    assert.deepEqual(sortable.props.records, payments);
    sortable.props.onSortEnd(1, 0);
    assert.deepEqual(plain(dispatchCalls.at(-1)), {
        type: 'payment/sort',
        fromIndex: 1,
        toIndex: 0,
    });

    const table = findNodes(tree, Table)[0];
    assert.deepEqual(plain(table.props.dataSource), payments);
    assert.deepEqual(
        plain(
            table.props.columns.map((column) =>
                column.title === NotifyColumn ? 'notify' : column.title,
            ),
        ),
        ['ID', '启用', '名称', '支付方式', 'notify', '操作'],
    );

    const enableCell = table.props.columns[1].render(0, payments[1]);
    findNodes(enableCell, Switch)[0].props.onChange(true);
    assert.deepEqual(plain(dispatchCalls.at(-1)), { type: 'payment/show', id: 8 });

    const actionCell = table.props.columns[5].render(undefined, payments[0]);
    assert.deepEqual(plain(editors), [7]);
    const deleteLink = findNodes(actionCell, 'a')[0];
    const confirmations = [];
    const originalConfirm = Modal.confirm;
    Modal.confirm = (options) => confirmations.push(options);
    deleteLink.props.onClick();
    Modal.confirm = originalConfirm;
    assert.deepEqual(
        confirmations.map((options) => options.title),
        ['警告'],
    );
    confirmations[0].onOk();
    assert.deepEqual(plain(dispatchCalls.at(-1)), { type: 'payment/drop', id: 7 });
});

test('paytaro notice renders only for paytaro gateways', async () => {
    const { PaytaroNotice } = await load(
        '../src/pages/config/payment/components/PaytaroNotice.tsx',
    );
    assert.equal(PaytaroNotice({ paymentMethod: 'EPay' }), null);
    assert.equal(PaytaroNotice({}), null);
    const tree = PaytaroNotice({ paymentMethod: 'PaytaroX' });
    const links = findNodes(tree, 'a');
    assert.deepEqual(
        links.map((link) => [link.props.href, link.children[0]]),
        [
            ['https://t.me/paytaro', '@paytaro'],
            ['https://t.me/paytarorobot', '@paytarorobot'],
            ['https://v3.paytaro.com/#/docs', 'https://v3.paytaro.com'],
        ],
    );
});
