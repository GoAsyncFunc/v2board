import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

function createReact() {
  return {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update) {
        const next = typeof update === 'function' ? update(this.state, this.props) : update;
        this.state = { ...this.state, ...next };
      }
    },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadDashboard() {
  const source = await fs.readFile(new URL('../src/pages/Dashboard.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [];
  const charts = [];
  const listeners = new Map();
  const history = { push: path => actions.push({ type: 'history/push', path }) };
  history.default = history;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    URL,
    window: {
      settings: { secure_path: 'admin' },
      addEventListener: (event, listener) => listeners.set(event, listener),
      removeEventListener: (event, listener) => listeners.delete(event),
    },
    require(id) {
      if (id === 'react') return createReact();
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'echarts/core') return {
        use: () => {},
        init: (element, theme, options) => {
          const chart = { element, theme, options, setOption: option => { chart.option = option; }, resize: () => { chart.resized = true; } };
          charts.push(chart);
          return chart;
        },
      };
      if (id === 'echarts/charts') return { BarChart: 'BarChart', LineChart: 'LineChart' };
      if (id === 'echarts/components') return { DatasetComponent: 'Dataset', GridComponent: 'Grid', LegendComponent: 'Legend', TooltipComponent: 'Tooltip', TransformComponent: 'Transform' };
      if (id === 'echarts/features') return { LabelLayout: 'LabelLayout' };
      if (id === 'echarts/renderers') return { SVGRenderer: 'SVGRenderer' };
      if (id.includes('reactRedux')) return { connect: () => Component => Component };
      if (id.includes('routerHistory')) return { __esModule: true, default: history, push: history.push };
      if (id.includes('MainLayout')) return 'MainLayout';
      if (id.includes('services/request')) return { get: async () => ({ status: 'running' }) };
      if (id.includes('siteSettings')) return { siteSettings: { serviceHost: 'https://service.example.test/api/v1' } };
      if (id.includes('MoneyDisplay')) return { formatIncome: value => `income:${value}`, formatLiveCount: value => value || '0' };
      throw new Error(id);
    },
  });
  return { ...module.exports, actions, historyEvents: actions, charts, listeners };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

test('Dashboard builds ranked chart options in reverse display order', async () => {
  const { rankChartOption } = await loadDashboard();
  const option = rankChartOption([
    { server_name: 'A', total: 1 },
    { server_name: 'B', total: 2 },
  ], item => item.server_name);
  assert.deepEqual(Array.from(option.yAxis.data), ['B', 'A']);
  assert.deepEqual(Array.from(option.series[0].data), [2, 1]);
  assert.equal(option.tooltip.formatter([{ value: 3 }]), '3 GB');
});

test('Dashboard dispatches all stat/config loads and cleans up resize listener', async () => {
  const runtime = await loadDashboard();
  const actions = [];
  const page = new runtime.DashboardPage({
    dispatch: action => actions.push(action),
    stat: {},
    config: { site: { currency: '¥' } },
  });
  page.orderChart.current = {};
  page.serverLastRankChart.current = {};
  page.serverTodayRankChart.current = {};
  page.userTodayRankChart.current = {};
  page.userLastRankChart.current = {};

  await page.componentDidMount();
  assert.deepEqual(actions.map(action => action.type), [
    'stat/getOverride', 'stat/getOrder', 'stat/getServerLastRank',
    'stat/getServerTodayRank', 'stat/getUserTodayRank', 'stat/getUserLastRank',
    'config/fetch',
  ]);
  assert.equal(actions.at(-1).key, 'site');
  assert.equal(runtime.listeners.has('resize'), true);

  actions.find(action => action.type === 'stat/getOrder').complete([{ type: 'paid', date: '2026-09-19', value: 3 }]);
  actions.find(action => action.type === 'stat/getServerTodayRank').complete([{ server_name: 'Node A', total: 4 }]);
  assert.equal(runtime.charts.length, 2);
  assert.equal(runtime.charts[0].option.series[0].data[0], 3);
  assert.equal(runtime.charts[1].option.yAxis.data[0], 'Node A');

  page.componentWillUnmount();
  assert.equal(runtime.listeners.has('resize'), false);
});

test('Dashboard pending commission alert keeps the original order filters and route', async () => {
  const runtime = await loadDashboard();
  const actions = [];
  const page = new runtime.DashboardPage({
    dispatch: action => actions.push(action),
    stat: { commission_pending_total: 2 },
    config: { site: { currency: '¥' } },
  });
  page.showPendingCommissionOrders();
  assert.deepEqual(JSON.parse(JSON.stringify(actions)), [
    { type: 'order/addFilter', key: 'status', condition: '=', value: '3' },
    { type: 'order/addFilter', key: 'commission_status', condition: '=', value: '0' },
    { type: 'order/addFilter', key: 'commission_balance', condition: '>', value: '0' },
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.historyEvents)), [{ type: 'history/push', path: '/order' }]);
});

test('Admin home redirects to login on mount', async () => {
  const source = await fs.readFile(new URL('../src/pages/Index.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const actions = [];
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return { Component: class { constructor(props) { this.props = props; } }, createElement: () => ({}) };
      if (id.includes('routerHistory')) return { push: path => actions.push(path) };
      throw new Error(id);
    },
  });
  const page = new module.exports.default({});
  page.componentDidMount();
  assert.deepEqual(actions, ['/login']);
});
