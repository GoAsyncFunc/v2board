import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

function createReact() {
  return {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update, callback) {
        const next = typeof update === 'function' ? update(this.state, this.props) : update;
        this.state = { ...this.state, ...next };
        callback?.();
      }
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => {
      if (type?.__testRender) return type({ ...(props || {}), children });
      return { type, props: props || {}, children };
    },
  };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

const normalize = value => JSON.parse(JSON.stringify(value));

async function loadPaymentPage() {
  const source = await fs.readFile(new URL('../src/pages/config/payment/index.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const confirmations = [];
  const Modal = Object.assign('Modal', { confirm: options => { confirmations.push(options); return options; } });
  const Select = Object.assign('Select', { Option: 'Select.Option' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return createReact();
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/button') return 'Button';
      if (id === 'antd/lib/divider') return 'Divider';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/input') return 'Input';
      if (id === 'antd/lib/modal') return Modal;
      if (id === 'antd/lib/select') return Select;
      if (id === 'antd/lib/switch') return 'Switch';
      if (id === 'antd/lib/table') return 'Table';
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('Sortable')) return 'Sortable';
      if (id.includes('MainLayout')) return 'MainLayout';
      if (id === './_List') {
        const PaymentList = ({ dispatch, payment, renderEditor }) => ({
          type: 'Sortable',
          props: {
            onDragEnd: (fromIndex, toIndex) => dispatch({ type: 'payment/sort', fromIndex, toIndex }),
            children: {
              type: 'Table',
              props: {
                dataSource: payment.payments,
                columns: [
                  {},
                  { render: (_value, record) => ({ props: { onChange: () => dispatch({ type: 'payment/show', id: record.id }) } }) },
                  {}, {}, {},
                  { render: (_value, record) => ({ children: [
                    renderEditor(record, record.id),
                    { type: 'a', children: ['删除'], props: { onClick: () => Modal.confirm({ onOk: () => dispatch({ type: 'payment/drop', id: record.id }) }) } },
                  ] }) },
                ],
              },
            },
          },
        });
        PaymentList.__testRender = true;
        return PaymentList;
      }
      if (id.includes('PaymentNotifyColumn') || id.includes('notifyColumn')) return { createPaymentNotifyColumn: () => ({ key: 'notify_url' }) };
      if (id.includes('PaymentDisplayColumns') || id.endsWith('/_List/columns')) return { createReadonlyPaymentColumns: () => ({ name: { key: 'name' }, payment: { key: 'payment' } }) };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });
  return { ...module.exports, confirmations };
}

async function loadThemePage() {
  const source = await fs.readFile(new URL('../src/pages/config/theme/index.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const requests = [];
  const successMessages = [];
  const Select = Object.assign('Select', { Option: 'Select.Option' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    window: {
      settings: { secure_path: 'admin' },
      btoa: value => `base64:${value}`,
    },
    encodeURIComponent: value => value,
    unescape: value => value,
    require(id) {
      if (id === 'react') return createReact();
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/input') return Object.assign('Input', { TextArea: 'Input.TextArea' });
      if (id === 'antd/lib/message') return { success: value => successMessages.push(value) };
      if (id === 'antd/lib/modal') return 'Modal';
      if (id === 'antd/lib/select') return Select;
      if (id.includes('MainLayout')) return 'MainLayout';
      if (id.includes('services/request')) return {
        post: async (endpoint, data) => { requests.push({ endpoint, data }); return { code: 200 }; },
      };
      if (id.includes('types/api')) return { isSuccessfulResponse: response => response.code === 200 };
      throw new Error(id);
    },
  });
  return { ...module.exports, requests, successMessages };
}

test('Payment editor loads methods and form, updates values and saves the selected gateway', async () => {
  const { PaymentEditor } = await loadPaymentPage();
  const actions = [];
  const editor = new PaymentEditor({
    children: { type: 'button', props: {} },
    dispatch: action => actions.push(action),
    payment: { payments: [], fetchLoading: false },
    record: { id: 7, name: 'Card', payment: 'Stripe', config: { key: 'old' } },
  });

  editor.show();
  assert.equal(actions[0].type, 'payment/getPaymentMethods');
  actions[0].complete(['Stripe', 'Paytaro']);
  assert.equal(editor.state.visible, true);
  assert.equal(editor.state.selectedPaymentMethod, 'Stripe');
  assert.equal(actions[1].type, 'payment/getPaymentForm');
  actions[1].complete({ key: { label: 'Key', type: 'input', value: '' } });

  editor.updateSubmit('name', 'Updated');
  editor.updateConfig('key', 'secret');
  editor.save();
  assert.equal(actions[2].type, 'payment/save');
  assert.deepEqual(normalize(actions[2].params), {
    id: 7, name: 'Updated', payment: 'Stripe', config: { key: 'secret' },
  });
  actions[2].complete();
  assert.equal(editor.state.visible, false);
});

test('Payment page preserves fetch, enable, delete and sort actions', async () => {
  const runtime = await loadPaymentPage();
  const actions = [];
  const records = [{ id: 3, name: 'Card', payment: 'Stripe', enable: 1 }];
  const page = new runtime.PaymentPage({
    dispatch: action => actions.push(action),
    payment: { payments: records, fetchLoading: false },
  });
  page.componentDidMount();
  const tree = page.render();
  const table = nodes(tree, node => node.type === 'Table')[0];
  const sortable = nodes(tree, node => node.type === 'Sortable')[0];
  assert.equal(table.props.dataSource, records);

  table.props.columns[1].render(1, records[0]).props.onChange();
  const actionCell = table.props.columns[5].render(null, records[0]);
  nodes(actionCell, node => node.type === 'a' && node.children.includes('删除'))[0].props.onClick();
  runtime.confirmations[0].onOk();
  sortable.props.onDragEnd(0, 2);

  assert.deepEqual(normalize(actions), [
    { type: 'payment/fetch' },
    { type: 'payment/show', id: 3 },
    { type: 'payment/drop', id: 3 },
    { type: 'payment/sort', fromIndex: 0, toIndex: 2 },
  ]);
});

test('Theme editor loads semantic fields and submits the encoded configuration', async () => {
  const runtime = await loadThemePage();
  const actions = [];
  const editor = new runtime.ThemeConfigEditor({
    children: { type: 'button', props: {} },
    configs: [],
    dispatch: action => actions.push(action),
    theme: { themes: {}, saveThemeConfigLoading: false },
    themeKey: 'default',
    themeName: 'Default',
  });

  editor.show();
  actions[0].complete({ color: 'blue' });
  assert.deepEqual(normalize(editor.state.params), { color: 'blue' });
  assert.equal(editor.state.visible, true);
  editor.setParam('color', 'red');
  editor.save();
  assert.equal(actions[1].type, 'theme/saveThemeConfig');
  assert.equal(actions[1].name, 'default');
  assert.equal(actions[1].config, 'base64:{"color":"red"}');
  actions[1].complete();
  assert.equal(runtime.successMessages.at(-1), '保存成功');
});

test('Theme page fetches and activates the selected theme through the existing API', async () => {
  const runtime = await loadThemePage();
  const actions = [];
  const page = new runtime.ThemePage({
    dispatch: action => actions.push(action),
    theme: {
      active: 'default',
      themes: { default: { name: 'Default', description: 'Built in', configs: [] } },
    },
  });
  page.componentDidMount();
  const tree = page.render();
  assert.ok(nodes(tree, node => node.type === 'button' && node.children.includes('当前主题')).length > 0);

  await page.activateTheme('modern');
  assert.deepEqual(normalize(runtime.requests), [{ endpoint: '/admin/config/save', data: { frontend_theme: 'modern' } }]);
  assert.deepEqual(normalize(actions), [{ type: 'theme/getThemes' }, { type: 'theme/getThemes' }]);
});
