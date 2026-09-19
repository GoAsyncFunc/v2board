import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
  Component: class {
    constructor(props) { this.props = props; }
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
const Modal = Object.assign('Modal', { confirm: () => undefined });
const message = { success: () => undefined };
const readonlyColumn = key => ({ title: key, dataIndex: key, key });

async function loadPage(pageName) {
  const source = await fs.readFile(new URL(`../src/pages/${pageName}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/button') return 'Button';
      if (id === 'antd/lib/date-picker') return DatePicker;
      if (id === 'antd/lib/divider') return 'Divider';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/input') return 'Input';
      if (id === 'antd/lib/message') return message;
      if (id === 'antd/lib/modal') return Modal;
      if (id === 'antd/lib/select') return Select;
      if (id === 'antd/lib/switch') return 'Switch';
      if (id === 'antd/lib/table') return 'Table';
      if (id === 'antd/lib/tag') return 'Tag';
      if (id === 'copy-to-clipboard') return () => true;
      if (id === 'moment') return value => ({ value, format: () => String(value) });
      if (id.includes('CouponDisplayColumns')) {
        return { createReadonlyCouponColumns: () => Object.fromEntries(['id', 'name', 'type', 'limit_use', 'started_at'].map(key => [key, readonlyColumn(key)])) };
      }
      if (id.includes('GiftcardDisplayColumns')) {
        return { createReadonlyGiftcardColumns: () => Object.fromEntries(['id', 'name', 'type', 'value', 'plan_id', 'limit_use', 'started_at'].map(key => [key, readonlyColumn(key)])) };
      }
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('MainLayout')) return 'MainLayout';
      if (id.includes('adminSettings')) return { settings: { periodText: { month_price: '月付' } } };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });
  return module.exports;
}

const normalize = value => JSON.parse(JSON.stringify(value));

test('CouponPage preserves fetch, form, generate, sort, and drop behavior', async () => {
  const { CouponPage } = await loadPage('Coupon');
  const actions = [];
  const page = new CouponPage({
    dispatch: action => actions.push(action),
    coupon: { coupons: [], fetchLoading: false, saveLoading: false, pagination: {} },
    plan: { plans: [] },
  });

  page.componentDidMount();
  assert.deepEqual(actions.slice(0, 2).map(action => action.type), ['coupon/fetch', 'plan/fetch']);

  page.updateSubmit({ name: 'Renewal', type: 2, value: '15' });
  page.generate();
  assert.deepEqual(normalize(actions[2].params), { type: 2, name: 'Renewal', value: '15' });
  actions[2].callback();
  assert.deepEqual(normalize(page.state), { visible: true, submit: { type: 2, name: 'Renewal', value: '15' } });
  page.toggleModal();
  assert.deepEqual(normalize(page.state), { visible: false, submit: { type: 1 } });

  page.tableOnChange({ current: 3 }, { order: 'ascend', columnKey: 'id' });
  page.drop({ id: 18 });
  assert.deepEqual(normalize(actions[3]), {
    type: 'coupon/changeTable', pagination: { current: 3 }, sort: { sort_type: 'ASC', sort: 'id' },
  });
  assert.deepEqual(normalize(actions[4]), { type: 'coupon/drop', id: 18 });
});

test('GiftcardPage preserves fetch, form, generate, sort, and drop behavior', async () => {
  const { GiftcardPage } = await loadPage('Giftcard');
  const actions = [];
  const page = new GiftcardPage({
    dispatch: action => actions.push(action),
    giftcard: { giftcards: [], fetchLoading: false, saveLoading: false, pagination: {} },
    plan: { plans: [{ id: 6, name: 'Pro' }] },
  });

  page.componentDidMount();
  assert.deepEqual(actions.slice(0, 2).map(action => action.type), ['giftcard/fetch', 'plan/fetch']);

  page.updateSubmit({ name: 'Annual card', type: 5, plan_id: '6', value: '365' });
  page.generate();
  assert.deepEqual(normalize(actions[2].params), { type: 5, name: 'Annual card', plan_id: '6', value: '365' });
  actions[2].callback();
  assert.equal(page.state.visible, true);
  page.toggleModal();
  assert.deepEqual(normalize(page.state), { visible: false, submit: { type: 1 } });

  page.tableOnChange({ current: 2 }, { order: 'descend', columnKey: 'created_at' });
  page.drop({ id: 22 });
  assert.deepEqual(normalize(actions[3]), {
    type: 'giftcard/changeTable', pagination: { current: 2 }, sort: { sort_type: 'DESC', sort: 'created_at' },
  });
  assert.deepEqual(normalize(actions[4]), { type: 'giftcard/drop', id: 22 });
});
