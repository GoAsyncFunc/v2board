import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React = { Fragment: 'Fragment', Component: class { constructor(props) { this.props = props; } setState(value) { this.state = { ...this.state, ...value }; } }, createElement(type, props, ...children) { return typeof type === 'function' ? type(props) : { type, props: props || {}, children }; } };
async function load(original) {
  const trace = [], cache = {}, compiled = {};
  for (const [name, file] of Object.entries({ page: original ? './fixtures/pages/user-plan.jsx' : '../src/pages/subscription/Plan.tsx', card: '../src/components/subscription/PlanCard.tsx' })) compiled[name] = (await transform(await fs.readFile(new URL(file, import.meta.url), 'utf8'), { format: 'cjs', loader: file.endsWith('.tsx') ? 'tsx' : 'jsx' })).code;
  function evaluate(name) {
    if (cache[name]) return cache[name];
    const module = { exports: {} };
    vm.runInNewContext(compiled[name], { module, exports: module.exports, require(id) {
      if (id === 'react' || id.includes('reactRuntime')) return React;
      if (id === 'antd/lib/empty') return { __esModule: true, default: 'Empty' };
      if (id.includes('PlanCard')) return evaluate('card');
      if (id.includes('MoneyDisplay')) return { formatPrice: value => (value / 100).toFixed(2) };
      if (id.includes('MainLayout')) return { __esModule: true, default: 'Layout', a: 'Layout' };
      if (id === 'react-redux' || id.includes('reactRedux')) return { c: () => cls => cls, connect: () => cls => cls };
      if ((id.includes('routerHistory') || id.includes('../app/history'))) return { push: route => trace.push(['navigate', route]) };
      if (id.includes('localeSettings')) { const localeSettings = { periodText: { month_price: () => 'Month', year_price: () => 'Year', onetime_price: () => 'Once', reset_price: () => 'Reset' } }; return { a: localeSettings, localeSettings }; }
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
      if (id.includes('siteHelpers')) { const parseJson = text => text === 'features' ? [{ support: true, feature: 'Supported' }, { support: false, feature: 'Unavailable' }] : text; return { c: parseJson, parseJson }; }
      if (id.includes('6a65685a')) return Object.assign;
      if (id.includes('moduleInterop')) return { markEsModule: o => Object.defineProperty(o, '__esModule', { value: true }), interopDefault: obj => { const fn = () => obj; Object.defineProperty(fn, 'a', { get: fn }); return fn; } };
        throw Error(id);
    } }, { timeout: 2000 });
    return cache[name] = module.exports;
  }
  return { Page: evaluate('page').default, trace };
}
function normalize(value) {
  // React DOM maps the former `class` prop to the same attribute. New source uses
  // className; this explicit correction is normalized rather than hidden.
  if (Array.isArray(value)) return value.map(normalize);
  if (typeof value === 'function') return '[handler]';
  // Both false and undefined omit the class attribute in React DOM.
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key, entry]) => key !== 'key' && !(['class', 'className'].includes(key) && (entry === false || entry === undefined))).map(([key, v]) => [key === 'class' ? 'className' : key, normalize(v)]));
  return value;
}
function links(tree, found = []) { if (Array.isArray(tree)) tree.forEach(node => links(node, found)); else if (tree && typeof tree === 'object') { if (tree.type === 'a') found.push(tree); links(tree.children, found); } return found; }
for (const tab of [0, 1, 2]) for (const capacity of [null, 0, 3, 10]) for (const content of ['', 'features', '<b>HTML content</b>']) test(`Plan page tab=${tab}, capacity=${capacity}, content=${content}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const { Page, trace } = await load(original);
    const base = { capacity_limit: capacity, content, month_price: null, year_price: null, onetime_price: null, reset_price: 99 };
    const plans = [{ ...base, id: 1, name: 'Monthly', month_price: 100 }, { ...base, id: 2, name: 'Once', onetime_price: 200 }, { ...base, id: 3, name: 'Free', month_price: 0 }];
    const page = new Page({ plan: { plans }, comm: { config: { currency_symbol: '¥' } }, dispatch: action => trace.push(['dispatch', action]) });
    page.componentDidMount(); page.setState({ tabs: tab }); const tree = page.render();
    links(tree).forEach(link => link.props.onClick());
    results.push(structuredClone(normalize({ tree, trace, price: page.getUnitPriceTag(plans[2]) })));
  }
  assert.deepEqual(results[1], results[0]);
});
test('Plan empty list retains the original spinner while loading', async () => {
  const results = [];
  for (const original of [true, false]) { const { Page } = await load(original); results.push(structuredClone(normalize(new Page({ plan: { plans: [], fetchLoading: true }, comm: { config: {} } }).render()))); }
  assert.deepEqual(results[1], results[0]);
});
test('Plan empty response clears the spinner and shows an empty state', async () => {
  const { Page } = await load(false);
  const page = new Page({ plan: { plans: [], fetchLoading: true }, comm: { config: {} } });
  assert.match(JSON.stringify(page.render()), /Loading\.\.\./);
  page.props = { ...page.props, plan: { plans: [], fetchLoading: false } };
  const rendered = JSON.stringify(page.render());
  assert.doesNotMatch(rendered, /Loading\.\.\./);
  assert.match(rendered, /"type":"Empty"/);
});

test('Plan category controls switch the visible cards without refetching', async () => {
  const { Page, trace } = await load(false);
  const base = { capacity_limit: null, content: '', month_price: null, year_price: null, onetime_price: null, reset_price: 99 };
  const page = new Page({
    plan: { plans: [
      { ...base, id: 1, name: 'Monthly', month_price: 100 },
      { ...base, id: 2, name: 'Once', onetime_price: 200 },
    ] },
    comm: { config: {} },
    dispatch: action => trace.push(['dispatch', action]),
  });
  function tabControls(tree) {
    if (Array.isArray(tree)) return tree.flatMap(tabControls);
    if (!tree || typeof tree !== 'object') return [];
    return [
      ...(tree.type === 'span' && tree.props.onClick ? [tree] : []),
      ...tabControls(tree.children),
    ];
  }
  for (const [tab, destination] of [[1, '/plan/1'], [2, '/plan/2']]) {
    tabControls(page.render())[tab].props.onClick();
    assert.equal(page.state.tabs, tab);
    const cards = links(page.render());
    assert.equal(cards.length, 1);
    cards[0].props.onClick();
    assert.deepEqual(trace.at(-1), ['navigate', destination]);
  }
  tabControls(page.render())[0].props.onClick();
  assert.equal(links(page.render()).length, 2);
  assert.equal(trace.filter(entry => entry[0] === 'dispatch').length, 0);
});
