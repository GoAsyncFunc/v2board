import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage(userAgent = 'desktop') {
  const source = await fs.readFile(new URL('../src/pages/ticket/index.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [];
  const timers = [];
  const opened = [];
  const location = { origin: 'https://admin.example.test', pathname: '/panel/', href: '' };
  const React = {
    Component: class { constructor(props) { this.props = props; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    window: { location, navigator: { userAgent }, open: (...args) => opened.push(args) },
    setTimeout(callback, delay) { timers.push({ callback, delay }); return timers.length; },
    clearTimeout() {},
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Page => Page };
      if (id === 'antd/lib/table') return 'Table';
      if (id === 'antd/lib/input') return 'Input';
      if (id === 'antd/lib/radio') return { Group: 'RadioGroup', Button: 'RadioButton' };
      if (id === 'antd/lib/badge') return 'Badge';
      if (id === 'antd/lib/divider') return 'Divider';
      if (id.includes('MainLayout')) return 'Layout';
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('TicketDisplayColumns')) return {
        createReadonlyTicketColumns: () => ({
          id: { key: 'id' }, subject: { key: 'subject' }, level: { key: 'level' },
          created_at: { key: 'created_at' }, updated_at: { key: 'updated_at' },
        }),
      };
      if (id === './_List') {
        function TicketList() {}
        return { TicketList };
      }
      if (id.includes('dateTime')) return {};
      throw new Error(id);
    },
  });
  return {
    Page: module.exports.TicketPage, actions, timers, opened, location,
    dispatch: action => actions.push(JSON.parse(JSON.stringify(action))),
  };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

test('Ticket page fetches, filters, searches and preserves table actions', async () => {
  const runtime = await loadPage();
  const tickets = [{ id: 4, subject: 'Question', status: 0, reply_status: 1 }];
  const page = new runtime.Page({
    ticket: { tickets, fetchLoading: false, pagination: { current: 1, pageSize: 10, total: 1 }, filter: { status: 0 } },
    dispatch: runtime.dispatch,
  });
  page.componentDidMount();
  assert.deepEqual(runtime.actions, [{ type: 'ticket/fetch' }]);
  const list = nodes(page.render(), node => node.type?.name === 'TicketList')[0];
  assert.deepEqual(JSON.parse(JSON.stringify(list.props.ticket.pagination)), { current: 1, pageSize: 10, total: 1 });
  list.props.onTableChange({ current: 2, pageSize: 20 }, { status: [1] });
  assert.deepEqual(runtime.actions.at(-1), {
    type: 'ticket/filter', pagination: { current: 2, pageSize: 20 }, filter: { status: [1] },
  });
  const group = nodes(page.render(), node => node.type === 'RadioGroup')[0];
  group.props.onChange({ target: { value: 1 } });
  assert.deepEqual(runtime.actions.at(-1), { type: 'ticket/filter', filter: { status: 1 }, pagination: { pageSize: 10, current: 1 } });
  nodes(page.render(), node => node.type === 'Input')[0].props.onChange({ target: { value: 'user@example.test' } });
  assert.equal(runtime.timers[0].delay, 300);
  runtime.timers[0].callback();
  assert.equal(runtime.actions.at(-1).filter.email, 'user@example.test');
});

test('Ticket page chooses desktop popup or mobile navigation', async () => {
  const desktop = await loadPage();
  const desktopPage = new desktop.Page({});
  desktopPage.openTicket(7);
  assert.equal(desktop.opened[0][0], 'https://admin.example.test/panel/#/ticket/7');
  const mobile = await loadPage('mobile safari');
  const mobilePage = new mobile.Page({});
  mobilePage.openTicket(8);
  assert.equal(mobile.location.href, 'https://admin.example.test/panel/#/ticket/8');
});
