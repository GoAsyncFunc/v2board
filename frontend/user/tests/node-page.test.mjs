import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React = { Component: class { constructor(props) { this.props = props; } }, createElement: (type, props, ...children) => ({ type, props: props || {}, children }) };
async function load(original) {
  const trace = [], cache = new Map(), compiled = {};
  for (const [name, relative] of Object.entries({ page: original ? './fixtures/pages/user-node.jsx' : '../src/pages/subscription/Node.tsx', columns: '../src/components/NodeColumns.tsx' })) {
    compiled[name] = (await transform(await fs.readFile(new URL(relative, import.meta.url), 'utf8'), { format: 'cjs', loader: relative.endsWith('.tsx') ? 'tsx' : 'jsx' })).code;
  }
  function evaluate(name) {
    if (cache.has(name)) return cache.get(name);
    const module = { exports: {} };
    vm.runInNewContext(compiled[name], { module, exports: module.exports, require(id) {
      if (id === 'react' || id.includes('reactRuntime')) return React;
      if (id.includes('NodeColumns')) return evaluate('columns');
      if (id.includes('MainLayout')) return { __esModule: true, default: 'Layout', a: 'Layout' };
      if (id === 'react-redux' || id.includes('reactRedux')) return { c: () => component => component, connect: () => component => component };
      if (id.includes('routerHistory')) return { push: route => trace.push(['navigate', route]) };
      if (id.includes('siteHelpers')) return { f: (...args) => trace.push(['usage', ...args]), calculateUsage: (...args) => trace.push(['usage', ...args]) };
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
      for (const [key, label] of [['antdTable', 'Table'], ['antdTag', 'Tag'], ['antdBadge', 'Badge'], ['antdTooltip', 'Tooltip'], ['/Icon', 'Icon']]) if (id.includes(key)) return { a: label, [label]: label };
      if (/67395956|2b424a64|41776870|35446d6f|iconStyles|request|77642f52|2f497261/.test(id)) return {};
      if (id.includes('6a65685a')) return Object.assign;
      if (id.includes('moduleInterop')) return { markEsModule: o => Object.defineProperty(o, '__esModule', { value: true }), interopDefault: obj => { const fn = () => obj; Object.defineProperty(fn, 'a', { get: fn }); return fn; } };
        throw Error(id);
    } }, { timeout: 2000 });
    cache.set(name, module.exports); return module.exports;
  }
  return { Page: evaluate('page').default, trace };
}
const normalize = value => JSON.parse(JSON.stringify(value, (key, value) => key === 'key' && typeof value === 'number' ? '[random-key]' : typeof value === 'function' ? '[handler]' : value));
function find(node, type) { if (node?.type === type) return node; for (const child of node?.children || []) { const found = find(child, type); if (found) return found; } }
for (const loading of [false, true]) for (const populated of [false, true]) for (const planId of [null, 7]) {
  test(`Node structure/lifecycle loading=${loading} nodes=${populated} plan=${planId}`, async () => {
    const results = [];
    for (const original of [true, false]) {
      const { Page, trace } = await load(original);
      const page = new Page({ server: { servers: populated ? [{ name: 'fixture' }] : [], fetchLoading: loading }, user: { subscribe: { plan_id: planId, u: 1, d: 2, transfer_enable: 10 } }, dispatch: action => trace.push(['dispatch', action]) });
      page.componentDidMount(); const tree = page.render();
      if (!loading && !populated) find(tree, 'a').props.onClick();
      results.push(normalize({ tree, trace }));
    }
    assert.deepEqual(results[1], results[0]);
  });
}
for (const record of [{ is_online: 1, rate: 1.5, tags: ['A', 'B'] }, { is_online: '0', rate: 0, tags: null }, { is_online: null, rate: '2', tags: [] }, { is_online: '0x1', rate: 1, tags: [] }]) {
  test(`Node column render ${JSON.stringify(record)}`, async () => {
    const results = [];
    for (const original of [true, false]) {
      const { Page } = await load(original);
      const tree = new Page({ server: { servers: [record], fetchLoading: false }, user: { subscribe: {} } }).render();
      results.push(normalize(find(tree, 'Table').props.columns.filter(column => column.render).map(column => column.render(record[column.dataIndex]))));
    }
    assert.deepEqual(results[1], results[0]);
  });
}
