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
  Fragment: 'Fragment',
  cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
  createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Input = Object.assign('Input', { Group: 'Input.Group', TextArea: 'Input.TextArea' });
const Select = Object.assign('Select', { Option: 'Select.Option' });

async function load(componentName) {
  const source = await fs.readFile(new URL(`../src/components/${componentName}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/date-picker') return 'DatePicker';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/input') return Input;
      if (id === 'antd/lib/modal') return 'Modal';
      if (id === 'antd/lib/select') return Select;
      if (id === 'moment') return { default: { unix: value => ({ value }) } };
      if (id.includes('adminSettings')) return { settings: { periodText: { month_price: '月付' } } };
      throw new Error(id);
    },
  });
  return module.exports;
}

const normalize = value => JSON.parse(JSON.stringify(value));
const child = { type: 'button', props: {} };

test('SendMailEditor updates fields and dispatches the current message', async () => {
  const component = await load('SendMailEditor');
  const actions = [];
  const editor = new component.SendMailEditor({
    children: child,
    dispatch: action => actions.push(action),
    user: { sendMailLoading: false, filter: [] },
  });
  editor.show();
  editor.update('subject', 'Service notice');
  editor.update('content', 'Maintenance completed');
  editor.send();
  assert.equal(editor.state.visible, true);
  assert.deepEqual(normalize(actions[0].params), { subject: 'Service notice', content: 'Maintenance completed' });
  actions[0].callback();
  assert.equal(editor.state.visible, false);
});

test('PermissionGroupEditor retains record data and disables save while loading', async () => {
  const component = await load('PermissionGroupEditor');
  const actions = [];
  const editor = new component.PermissionGroupEditor({
    children: child,
    record: { id: 12, name: 'Customers' },
    dispatch: action => actions.push(action),
    serverGroup: { fetchLoading: false },
  });
  editor.updateName({ target: { value: 'Premium customers' } });
  editor.save();
  assert.deepEqual(normalize(actions[0].params), { id: 12, name: 'Premium customers' });
  editor.props.serverGroup.fetchLoading = true;
  const modal = editor.render().children[1];
  assert.equal(modal.props.onOk, undefined);
});

test('UserGenerator resets generated user data when the modal closes', async () => {
  const component = await load('UserGenerator');
  const actions = [];
  const generator = new component.UserGenerator({
    children: child,
    dispatch: action => actions.push(action),
    user: { generateLoading: false },
    plan: { plans: [{ id: 3, name: 'Standard' }] },
  });
  generator.show();
  generator.update('email_suffix', 'example.com');
  generator.update('generate_count', 10);
  generator.submit();
  assert.deepEqual(normalize(actions[0].params), { email_suffix: 'example.com', generate_count: 10 });
  actions[0].callback();
  assert.deepEqual(normalize(generator.state), { visible: false, submit: {} });
});

test('AssignOrderEditor restores its email after close and dispatches order fields', async () => {
  const component = await load('AssignOrderEditor');
  const actions = [];
  const editor = new component.AssignOrderEditor({
    children: child,
    email: 'admin@demo.com',
    dispatch: action => actions.push(action),
    plan: { plans: [{ id: 2, name: 'Business' }] },
    order: { assignLoading: false },
  });
  editor.toggle();
  editor.setSubmit('plan_id', 2);
  editor.setSubmit('period', 'month_price');
  editor.setSubmit('total_amount', '9.99');
  editor.submit();
  assert.deepEqual(normalize(actions[0].params), {
    email: 'admin@demo.com', plan_id: 2, period: 'month_price', total_amount: '9.99',
  });
  actions[0].callback();
  assert.deepEqual(normalize(editor.state.submit), { email: 'admin@demo.com' });
});
