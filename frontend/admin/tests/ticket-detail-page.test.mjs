import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

function createReact() {
  return {
    Component: class {
      constructor(props) {
        this.props = props;
      }
      setState(update) {
        const next = typeof update === 'function' ? update(this.state, this.props) : update;
        this.state = { ...this.state, ...next };
      }
    },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/ticket/[id].tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const timers = [];
  const clearedTimers = [];
  const messages = [];
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    setTimeout(callback, delay) {
      const id = timers.length + 1;
      timers.push({ id, callback, delay });
      return id;
    },
    clearTimeout(id) {
      clearedTimers.push(id);
    },
    require(id) {
      if (id === 'react') return createReact();
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/divider') return 'Divider';
      if (id === 'antd/lib/icon') return 'Icon';
      if (id === 'antd/lib/tooltip') return 'Tooltip';
      if (id === 'antd/lib/message')
        return {
          __esModule: true,
          default: {
            loading: value => messages.push(['loading', value]),
            destroy: () => messages.push(['destroy']),
          },
        };
      if (id.includes('styles/ticketDetail'))
        return {
          ticketDetailClassNames: {
            tag: 'tag',
            controls: 'ctrl',
            content: 'content',
            input: 'input',
          },
        };
      if (id.includes('UserEditor') || id.includes('/components/UserEditor')) return 'UserEditor';
      if (id.includes('TrafficPanel')) return 'TrafficPanel';
      if (id.includes('TicketMessageList')) return { __esModule: true, default: 'TicketMessageList' };
      if (id.includes('utils/dateTime')) return { formatDateTime: value => `date:${value}` };
      if (id.includes('iconStyles')) return {};
      throw new Error(id);
    },
  });
  return { ...module.exports, timers, clearedTimers, messages };
}

async function loadMessageList() {
  const source = await fs.readFile(
    new URL('../src/pages/ticket/components/TicketMessageList.tsx', import.meta.url),
    'utf8',
  );
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const React = createReact();
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    React,
    require(id) {
      if (id === 'react') return React;
      if (id.includes('styles/ticketDetail')) return { ticketDetailClassNames: { content: 'content' } };
      if (id.includes('utils/dateTime')) return { formatDateTime: value => `date:${value}` };
      throw new Error(id);
    },
  });
  return module.exports;
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [
    ...(predicate(tree) ? [tree] : []),
    ...nodes(tree.children, predicate),
    ...nodes(tree.props?.children, predicate),
  ];
}

const normalize = value => JSON.parse(JSON.stringify(value));

test('Ticket detail fetches, refreshes, replies and clears its timer', async () => {
  const runtime = await loadPage();
  const actions = [];
  const page = new runtime.TicketDetailPage({
    dispatch: action => actions.push(action),
    match: { params: { ticket_id: '42' } },
    ticket: { ticket: { id: 42, message: [] }, replyLoading: false },
  });

  page.componentDidMount();
  assert.deepEqual(normalize(actions.slice(0, 2)), [{ type: 'ticket/fetchById', id: '42' }, { type: 'plan/fetch' }]);
  assert.equal(runtime.timers[0].delay, 5000);

  runtime.timers[0].callback();
  assert.deepEqual(normalize(actions[2]), { type: 'ticket/fetchById', id: '42' });
  assert.equal(runtime.timers[1].delay, 5000);

  page.setState({ message: 'Reply text' });
  const clearMessage = () => {};
  page.reply(clearMessage);
  assert.equal(actions[3].type, 'ticket/reply');
  assert.equal(actions[3].id, '42');
  assert.equal(actions[3].msg, 'Reply text');
  assert.equal(actions[3].callback, clearMessage);
  actions[3].start();
  actions[3].finish();
  assert.deepEqual(runtime.messages, [['loading', '发送中'], ['destroy']]);

  page.componentWillUnmount();
  assert.deepEqual(runtime.clearedTimers, [2]);
});

test('Ticket message list scrolls, formats messages, and chat reply input clears after Enter', async () => {
  const runtime = await loadPage();
  const messageListRuntime = await loadMessageList();
  const keyDownCalls = [];
  const chat = new runtime.TicketDetailChat({
    ticket: {
      id: 42,
      subject: 'Support',
      user_id: 9,
      message: [{ id: 1, is_me: true, created_at: 1700000000, message: 'Hello' }],
    },
    onChange: () => {},
    onKeyDown: (event, clearMessage) => keyDownCalls.push({ event, clearMessage }),
  });
  chat.messageRef.current = { value: 'Reply' };

  const tree = chat.render();
  assert.equal(nodes(tree, node => node.type === 'UserEditor')[0].props.userId, 9);
  assert.equal(nodes(tree, node => node.type === 'TrafficPanel')[0].props.userId, 9);
  const messageList = new messageListRuntime.TicketMessageList(
    nodes(tree, node => node.type === 'TicketMessageList')[0].props,
  );
  const scrollCalls = [];
  messageList.chatRef.current = { scrollHeight: 360, scrollTo: (...args) => scrollCalls.push(args) };
  messageList.componentDidMount();
  assert.deepEqual(scrollCalls, [[0, 360]]);
  assert.ok(
    nodes(messageList.render(), node => node.type === 'div' && node.children.includes('date:1700000000')).length > 0,
  );

  const input = nodes(tree, node => node.type === 'input')[0];
  const event = { keyCode: 13 };
  input.props.onKeyDown(event);
  assert.equal(keyDownCalls[0].event, event);
  keyDownCalls[0].clearMessage();
  assert.equal(chat.messageRef.current.value, '');

  messageList.props = {
    messages: [...messageList.props.messages, { id: 2, created_at: 1700000001, message: 'Next' }],
  };
  messageList.componentDidUpdate();
  assert.deepEqual(scrollCalls.at(-1), [0, 360]);
});
