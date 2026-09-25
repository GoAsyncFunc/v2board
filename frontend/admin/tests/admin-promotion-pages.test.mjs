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
        setState(update, callback) {
            const next = typeof update === 'function' ? update(this.state, this.props) : update;
            this.state = { ...this.state, ...next };
            if (callback) callback();
        }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Select = Object.assign('Select', { Option: 'Select.Option' });
const DatePicker = Object.assign('DatePicker', { RangePicker: 'DatePicker.RangePicker' });
const Modal = Object.assign('Modal', { confirm: (options) => options });
const readonlyColumn = (key) => ({ title: key, dataIndex: key, key });
const readonlyCouponColumns = Object.fromEntries(
    ['id', 'name', 'type', 'limit_use', 'started_at'].map((key) => [key, readonlyColumn(key)]),
);
const readonlyGiftCardColumns = Object.fromEntries(
    ['id', 'name', 'type', 'value', 'plan_id', 'limit_use', 'started_at'].map((key) => [
        key,
        readonlyColumn(key),
    ]),
);

async function loadModule(relativePath, localModules = {}) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === './components/CouponEditor' || id === './components/GiftCardEditor')
                return localModules.modal;
            if (id === './CouponBasicFields') return { CouponBasicFields: 'CouponBasicFields' };
            if (id === './CouponValueFields') return { CouponValueFields: 'CouponValueFields' };
            if (id === './CouponUsageFields') return { CouponUsageFields: 'CouponUsageFields' };
            if (id === './CouponRestrictionsFields')
                return { CouponRestrictionsFields: 'CouponRestrictionsFields' };
            if (id === './CouponGenerationField')
                return { CouponGenerationField: 'CouponGenerationField' };
            if (id === './GiftCardBasicFields')
                return { GiftCardBasicFields: 'GiftCardBasicFields' };
            if (id === './GiftCardValueFields')
                return { GiftCardValueFields: 'GiftCardValueFields' };
            if (id === './GiftCardPlanField') return { GiftCardPlanField: 'GiftCardPlanField' };
            if (id === './GiftCardUsageFields')
                return { GiftCardUsageFields: 'GiftCardUsageFields' };
            if (id === './GiftCardGenerationField')
                return { GiftCardGenerationField: 'GiftCardGenerationField' };
            if (id === './components/CouponList' || id === './components/GiftCardList')
                return localModules.list;
            if (id === './CouponColumns' || id === './GiftCardColumns')
                return localModules.columns;
            if (id === 'antd/lib/button') return 'Button';
            if (id === 'antd/lib/date-picker') return DatePicker;
            if (id === 'antd/lib/divider') return 'Divider';
            if (id === 'antd/lib/icon') return 'Icon';
            if (id === 'antd/lib/input') return 'Input';
            if (id === 'antd/lib/message') return { success: () => undefined };
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'antd/lib/select') return Select;
            if (id === 'antd/lib/switch') return 'Switch';
            if (id === 'antd/lib/table') return 'Table';
            if (id === 'antd/lib/tag') return 'Tag';
            if (id.includes('utils/clipboardService')) return { copyText: () => true };
            if (id === 'moment') return (value) => ({ value, format: () => String(value) });
            if (id.includes('adminSettings'))
                return { settings: { periodText: { month_price: '月付' } } };
            if (id.includes('LoadingContainer')) return 'LoadingContainer';
            if (id.includes('MainLayout')) return 'MainLayout';
            throw new Error(id);
        },
    });
    return module.exports;
}

async function loadPage(pageName) {
    const pagePath =
        pageName === 'Coupon'
            ? '../src/pages/coupon/CouponPage.tsx'
            : '../src/pages/giftcard/GiftCardPage.tsx';
    return loadModule(pagePath, {
        modal: {
            __esModule: true,
            default: `${pageName}Editor`,
            [`${pageName}Editor`]: `${pageName}Editor`,
        },
        list: {
            __esModule: true,
            default: `${pageName}List`,
            [`${pageName}List`]: `${pageName}List`,
        },
    });
}

async function loadList(pageName) {
    const relativePath =
        pageName === 'Coupon'
            ? '../src/pages/coupon/components/CouponList.tsx'
            : '../src/pages/giftcard/components/GiftCardList.tsx';
    return loadModule(relativePath, {
        columns: {
            __esModule: true,
            createCouponColumns: () => readonlyCouponColumns,
            createGiftCardColumns: () => readonlyGiftCardColumns,
        },
    });
}

async function loadEditor(pageName) {
    const relativePath =
        pageName === 'Coupon'
            ? '../src/pages/coupon/components/CouponEditor.tsx'
            : '../src/pages/giftcard/components/GiftCardEditor.tsx';
    return loadModule(relativePath);
}

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(predicate(tree) ? [tree] : []),
        ...nodes(tree.children, predicate),
        ...nodes(tree.props?.children, predicate),
    ];
}

const normalize = (value) => JSON.parse(JSON.stringify(value));

test('Coupon page composes the typed list and editor modules', async () => {
    const { CouponPage } = await loadPage('Coupon');
    const actions = [];
    const coupons = [{ id: 1, name: 'Renewal' }];
    const page = new CouponPage({
        dispatch: (action) => actions.push(action),
        coupon: { coupons, fetchLoading: false, saveLoading: false, pagination: {} },
    });

    page.componentDidMount();
    assert.deepEqual(normalize(actions), [{ type: 'coupon/fetch' }, { type: 'plan/fetch' }]);
    const tree = page.render();
    const list = nodes(tree, (node) => node.type === 'CouponList')[0];
    const editor = nodes(tree, (node) => node.type === 'CouponEditor')[0];
    assert.equal(list.props.coupon, page.props.coupon);
    assert.equal(editor.props.visible, false);

    list.props.onEdit(coupons[0]);
    assert.equal(page.state.editorVisible, true);
    assert.equal(page.state.editingCoupon, coupons[0]);
    page.closeEditor();
    assert.equal(page.state.editorVisible, false);
    assert.equal(page.state.editingCoupon, undefined);
});

test('Coupon list preserves enable, edit, delete, sort, and copy behavior', async () => {
    const { CouponList } = await loadList('Coupon');
    const actions = [];
    const edited = [];
    const coupons = [{ id: 18, name: 'Renewal', show: true, code: 'SAVE18' }];
    const list = new CouponList({
        dispatch: (action) => actions.push(action),
        coupon: { coupons, fetchLoading: false, saveLoading: false, pagination: {} },
        onEdit: (record) => edited.push(record),
    });

    const table = nodes(list.render(), (node) => node.type === 'Table')[0];
    table.props.columns[1].render(true, coupons[0]).props.onChange();
    const actionCell = table.props.columns[7].render(null, coupons[0]);
    const links = nodes(actionCell, (node) => node.type === 'a');
    links[0].props.onClick();
    const confirmation = links[1].props.onClick();
    confirmation.onOk();
    table.props.onChange({ current: 3 }, null, { order: 'ascend', columnKey: 'id' });

    assert.deepEqual(normalize(actions), [
        { type: 'coupon/show', id: 18 },
        { type: 'coupon/drop', id: 18 },
        {
            type: 'coupon/changeTable',
            pagination: { current: 3 },
            sort: { sort_type: 'ASC', sort: 'id' },
        },
    ]);
    assert.deepEqual(edited, [coupons[0]]);
    assert.equal(table.props.dataSource, coupons);
});

test('Coupon editor preserves field updates, generate payload, and close callback', async () => {
    const { CouponEditor } = await loadEditor('Coupon');
    const actions = [];
    let closed = 0;
    const editor = new CouponEditor({
        dispatch: (action) => actions.push(action),
        coupon: { coupons: [], fetchLoading: false, saveLoading: false, pagination: {} },
        plan: { plans: [] },
        visible: true,
        onClose: () => {
            closed += 1;
        },
    });

    editor.updateSubmit({ name: 'Renewal', type: 2, value: '15' });
    editor.generate();
    assert.equal(actions[0].type, 'coupon/generate');
    assert.deepEqual(normalize(actions[0].params), { type: 2, name: 'Renewal', value: '15' });
    actions[0].callback();
    assert.equal(closed, 1);
});

test('GiftCard page composes the typed list and editor modules', async () => {
    const { GiftCardPage } = await loadPage('GiftCard');
    const actions = [];
    const giftcards = [{ id: 22, name: 'Annual card' }];
    const page = new GiftCardPage({
        dispatch: (action) => actions.push(action),
        giftcard: { giftcards, fetchLoading: false, saveLoading: false, pagination: {} },
        plan: { plans: [{ id: 6, name: 'Pro' }] },
    });

    page.componentDidMount();
    assert.deepEqual(normalize(actions), [{ type: 'giftcard/fetch' }, { type: 'plan/fetch' }]);
    const tree = page.render();
    const list = nodes(tree, (node) => node.type === 'GiftCardList')[0];
    const editor = nodes(tree, (node) => node.type === 'GiftCardEditor')[0];
    assert.equal(list.props.giftcard, page.props.giftcard);
    assert.equal(editor.props.visible, false);

    list.props.onEdit(giftcards[0]);
    assert.equal(page.state.editorVisible, true);
    assert.equal(page.state.editingGiftCard, giftcards[0]);
    page.closeEditor();
    assert.equal(page.state.editorVisible, false);
});

test('GiftCard list preserves edit, delete, sort, and copy behavior', async () => {
    const { GiftCardList } = await loadList('GiftCard');
    const actions = [];
    const edited = [];
    const giftcards = [{ id: 22, name: 'Annual card', code: 'CARD22' }];
    const list = new GiftCardList({
        dispatch: (action) => actions.push(action),
        giftcard: { giftcards, fetchLoading: false, saveLoading: false, pagination: {} },
        plan: { plans: [] },
        onEdit: (record) => edited.push(record),
    });

    const table = nodes(list.render(), (node) => node.type === 'Table')[0];
    const actionCell = table.props.columns[8].render(null, giftcards[0]);
    const links = nodes(actionCell, (node) => node.type === 'a');
    links[0].props.onClick();
    const confirmation = links[1].props.onClick();
    confirmation.onOk();
    table.props.onChange({ current: 2 }, null, { order: 'descend', columnKey: 'created_at' });

    assert.deepEqual(normalize(actions), [
        { type: 'giftcard/drop', id: 22 },
        {
            type: 'giftcard/changeTable',
            pagination: { current: 2 },
            sort: { sort_type: 'DESC', sort: 'created_at' },
        },
    ]);
    assert.deepEqual(edited, [giftcards[0]]);
    assert.equal(table.props.dataSource, giftcards);
});

test('GiftCard editor preserves type updates, generate payload, and close callback', async () => {
    const { GiftCardEditor } = await loadEditor('GiftCard');
    const actions = [];
    let closed = 0;
    const editor = new GiftCardEditor({
        dispatch: (action) => actions.push(action),
        giftcard: { giftcards: [], fetchLoading: false, saveLoading: false, pagination: {} },
        plan: { plans: [] },
        visible: true,
        onClose: () => {
            closed += 1;
        },
    });

    editor.updateSubmit({ name: 'Annual card', type: 5, plan_id: '6', value: '365' });
    editor.generate();
    assert.equal(actions[0].type, 'giftcard/generate');
    assert.deepEqual(normalize(actions[0].params), {
        type: 5,
        name: 'Annual card',
        plan_id: '6',
        value: '365',
    });
    actions[0].callback();
    assert.equal(closed, 1);
});
