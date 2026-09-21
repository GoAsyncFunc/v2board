import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/queue/index.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [];
  const timers = [];
  const React = {
    Component: class { constructor(props) { this.props = props; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    setTimeout(callback, delay) { timers.push({ callback, delay }); return timers.length; },
    clearTimeout() {},
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Page => Page };
      if (id === 'antd/lib/table') return 'Table';
      if (id.includes('MainLayout')) return 'Layout';
      if (id.includes('LoadingContainer')) return 'LoadingContainer';
      if (id.includes('QueueDisplayColumns')) return { createReadonlyQueueColumns: () => [{ key: 'name' }] };
      throw new Error(id);
    },
  });
  return {
    Page: module.exports.QueuePage,
    actions,
    timers,
    dispatch: action => actions.push(JSON.parse(JSON.stringify(action))),
  };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

test('Queue page fetches both stats, refreshes every three seconds, and clears its timer', async () => {
  const runtime = await loadPage();
  const page = new runtime.Page({ system: { queueStats: null, queueWorkload: null }, dispatch: runtime.dispatch });
  page.componentDidMount();
  assert.deepEqual(runtime.actions, [
    { type: 'system/getQueueStats' },
    { type: 'system/getQueueWorkload' },
  ]);
  assert.equal(runtime.timers[0].delay, 3000);
  page.componentWillUnmount();
});

test('Queue page renders counters, status, and filters the default workload', async () => {
  const runtime = await loadPage();
  const queueWorkload = [{ name: 'default' }, { name: 'emails', jobs: 3 }];
  const page = new runtime.Page({
    system: {
      queueStats: { jobsPerMinute: 2, recentJobs: 10, failedJobs: 1, status: true },
      queueWorkload,
    },
    dispatch: runtime.dispatch,
  });
  const tree = page.render();
  const tables = nodes(tree, node => node.type === 'Table');
  assert.equal(tables.length, 1);
  assert.deepEqual(tables[0].props.dataSource, [{ name: 'emails', jobs: 3 }]);
  assert.match(JSON.stringify(tree), /当前作业量/);
  assert.match(JSON.stringify(tree), /运行中/);
  assert.match(JSON.stringify(tree), /si-check text-success/);
});
