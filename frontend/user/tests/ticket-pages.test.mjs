import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(name) {
  const source = await fs.readFile(new URL(`../src/pages/support/${name}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { loader: 'tsx', format: 'cjs' });
  const actions = [], opened = [], messages = [], timers = new Map();
  let timerId = 0;
  const window = { location: { origin: 'https://example.test', pathname: '/', href: '' }, navigator: { userAgent: 'desktop' }, open: (...args) => opened.push(args) };
  const React = {
    Component: class { constructor(props) { this.props = props; } },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, window,
    setTimeout: (callback, delay) => { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout: id => timers.delete(id),
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/message') return { __esModule: true, default: {
        loading: value => messages.push(['loading', value]),
        destroy: () => messages.push(['destroy']),
        success: value => messages.push(['success', value]),
      } };
      if (id.includes('/Modal') || id === 'antd/lib/modal') return { __esModule: true, default: 'Modal', Modal: 'Modal' };
      if (id.includes('/ui.js')) return { Table: 'Table', Input: Object.assign(function Input() {}, { TextArea: 'TextArea' }), Select: Object.assign(function Select() {}, { Option: 'Option' }) };
      if (id === 'antd/lib/input') return { __esModule: true, default: Object.assign(function Input() {}, { TextArea: 'TextArea' }) };
      if (id === 'antd/lib/select') return { __esModule: true, default: Object.assign(function Select() {}, { Option: 'Option' }) };
      if (id === 'antd/lib/table') return { __esModule: true, default: 'Table' };
      if (id.includes('/Icon') || id === 'antd/lib/icon') return { __esModule: true, default: 'Icon', Icon: 'Icon' };
      if (id.includes('MainLayout')) return 'Layout';
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
      if (id.includes('TicketReadonlyColumns')) return { createReadonlyTicketColumns: () => [] };
      if (id.includes('DateTimeDisplay')) return { formatDateTime: value => `date:${value}` };
      if (id.includes('/content.js')) return { ticketDetailStyles: { tag: 'tag', content: 'content', input: 'input' } };
      if (id.includes('styles/ticketDetailStyles')) return { ticketDetailStyles: { tag: 'tag', content: 'content', input: 'input', bubble: 'bubble', time: 'time' } };
      if (id.includes('iconStyles')) return {};
      throw Error(id);
    },
  });
  return { ...module.exports, actions, opened, messages, timers, window, dispatch: action => actions.push(action) };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Ticket creation retains draft fields and blocks duplicate submits while saving', async () => {
  const runtime = await load('Ticket');
  const page = new runtime.TicketPage({
    dispatch: runtime.dispatch,
    ticket: { tickets: [], saveData: { subject: 'Help', level: 1 }, saveLoading: false },
  });
  page.componentDidMount();
  assert.equal(runtime.actions[0].type, 'ticket/fetch');
  nodes(page.render(), node => node.props.id === 'ticket-message')[0].props.onChange({ target: { value: 'Details' } });
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.actions.at(-1))), {
    type: 'ticket/setState', payload: { saveData: { subject: 'Help', level: 1, message: 'Details' } },
  });
  const modal = nodes(page.render(), node => node.type === 'Modal')[0];
  modal.props.onOk();
  assert.equal(runtime.actions.at(-1).type, 'ticket/save');
  page.props.ticket.saveLoading = true;
  const count = runtime.actions.length;
  nodes(page.render(), node => node.type === 'Modal')[0].props.onOk();
  assert.equal(runtime.actions.length, count);
  modal.props.onCancel();
  assert.equal(runtime.actions.at(-1).payload.newTicketModalVisible, false);
  page.close(7);
  assert.equal(runtime.actions.at(-1).id, 7);
  assert.equal(runtime.actions.at(-1).type, 'ticket/close');
  page.componentWillUnmount();
  assert.equal(runtime.actions.at(-1).type, 'ticket/empty');
});

test('Ticket chat opens a desktop window and navigates directly on mobile and iPad', async () => {
  const runtime = await load('Ticket');
  const page = new runtime.TicketPage({});
  page.toChat(7);
  assert.equal(runtime.opened[0][0], 'https://example.test/#/ticket/7');
  assert.equal(runtime.opened[0][1], 'newwindow');
  for (const userAgent of ['Mobile', 'iPad']) {
    runtime.window.navigator.userAgent = userAgent;
    page.toChat(8);
    assert.equal(runtime.window.location.href, 'https://example.test/#/ticket/8');
  }
  assert.equal(runtime.opened.length, 1);
});

test('Ticket details refresh every five seconds and clear the timer on unmount', async () => {
  const runtime = await load('TicketDetail');
  const page = new runtime.TicketDetailPage({ dispatch: runtime.dispatch, match: { params: { ticket_id: '12' } } });
  page.componentDidMount();
  assert.equal(runtime.actions[0].type, 'ticket/fetchById');
  assert.equal(runtime.actions[0].id, '12');
  const [id, timer] = [...runtime.timers.entries()][0];
  assert.equal(timer.delay, 5000);
  runtime.timers.delete(id);
  timer.callback();
  assert.equal(runtime.actions.length, 2);
  assert.equal(runtime.timers.size, 1);
  page.componentWillUnmount();
  assert.equal(runtime.timers.size, 0);
});

test('Ticket replies wait for Enter and completion before clearing the input', async () => {
  const runtime = await load('TicketDetail');
  const page = new runtime.TicketDetailPage({
    dispatch: runtime.dispatch, match: { params: { ticket_id: '12' } },
    ticket: { ticket: { message: [] }, replyData: {}, replyLoading: false },
  });
  let cleared = false;
  const body = page.render();
  body.props.onChange({ target: { value: 'Reply' } });
  assert.equal(runtime.actions.at(-1).payload.replyData.message, 'Reply');
  body.props.onKeyDown({ keyCode: 12 }, () => { cleared = true; });
  assert.equal(runtime.actions.length, 1);
  body.props.onKeyDown({ keyCode: 13 }, () => { cleared = true; });
  assert.equal(runtime.actions.at(-1).type, 'ticket/reply');
  assert.equal(cleared, false);
  runtime.actions.at(-1).start();
  runtime.actions.at(-1).finish();
  runtime.actions.at(-1).succeed();
  runtime.actions.at(-1).complete();
  assert.equal(cleared, true);
  assert.deepEqual(runtime.messages, [['loading', '发送中'], ['destroy'], ['success', '发送成功']]);
  page.props.ticket.replyLoading = true;
  page.render().props.onKeyDown({ keyCode: 13 }, () => {});
  assert.equal(runtime.actions.length, 2);
});

test('Ticket messages preserve sender layout and scroll only when the message count changes', async () => {
  const runtime = await load('TicketDetail');
  const scrolls = [];
  const body = new runtime.TicketDetailBody({ ticket: { subject: 'Question', message: [] }, onChange() {}, onKeyDown() {} });
  body.chatRef.current = { scrollHeight: 100, scrollTo: (...args) => scrolls.push(args) };
  body.componentDidMount();
  body.componentDidUpdate();
  assert.equal(scrolls.length, 1);
  body.props.ticket.message.push({ id: 1, created_at: 100, is_me: true, message: 'Mine' });
  body.componentDidUpdate();
  assert.deepEqual(scrolls, [[0, 100], [0, 100]]);
  assert.match(JSON.stringify(body.render()), /text-right/);
  assert.match(JSON.stringify(body.renderMessage({ id: 2, created_at: 200, is_me: false, message: 'Staff' })), /bg-success-lighter/);
});
