import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);

async function run(original, scenario) {
  const trace = [], module = { exports: {} };
  const action = structuredClone(scenario.action || {});
  if (scenario.callback) action.callback = () => trace.push(['callback']);
  const state = { plans: [{ id: 1 }, { id: 2 }, { id: 3 }] };
  const response = structuredClone(scenario.response || { code: scenario.status ?? 200 });
  const request = method => (url, data) => { trace.push(['request', method, url, structuredClone(data)]); return 'request'; };
  const get = request('GET'), post = request('POST');
  const file = new URL(original ? './fixtures/models/admin-plan.cjs' : '../src/models/planModel.ts', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  const code = original ? text : (await transform(text, { format: 'cjs', loader: 'ts' })).code;
  vm.runInNewContext(code, {
    module, exports: module.exports, window: { settings: { secure_path: 'fixture-admin' } },
    require(id) {
      if (id.includes('request')) return { a: get, b: post, get, post, isSuccessfulResponse: value => value.code === 200 };
      if (id.includes('types/apiContracts')) return { isSuccessfulResponse: value => value.code === 200 };
      if (id.includes('adminSettingsRuntime')) return { a: { periodText: { month_price: 'Month', year_price: 'Year', onetime_price: 'Once' } } };
      if (id.includes('config/adminSettings')) return { settings: { periodText: { month_price: 'Month', year_price: 'Year', onetime_price: 'Once' } } };
      if (id.includes('70307045')) return Object.assign;
      if (id.includes('reactRuntime')) return {};
      if (id.includes('moduleInterop')) return {
        markEsModule: object => Object.defineProperty(object, '__esModule', { value: true }),
        interopDefault: object => { const fn = () => object; Object.defineProperty(fn, 'a', { get: fn }); return fn; },
      };
        throw Error(id);
    },
  }, { timeout: 2000 });
  const model = module.exports.default;
  const iterator = model.effects[scenario.effect](action, {
    put: value => { trace.push(['put', structuredClone(value)]); return 'put'; },
    select: selector => { trace.push(['select']); return { selected: selector({ plan: state }) }; },
  });
  let step = iterator.next(), count = 0;
  while (!step.done) {
    if (++count > 20) throw Error('Unterminated effect');
    if (step.value === 'request' && scenario.reject) {
      try { step = iterator.throw(Error('Network failure')); } catch (error) { trace.push(['error', error.message]); break; }
    } else step = iterator.next(step.value === 'request' ? response : step.value?.selected);
  }
  delete action.callback;
  trace.push(['state', state], ['response', response], ['action', action], ['initial', model.state],
    ['reducer', model.reducers.setState({ keep: 1 }, { payload: { add: 2 } })]);
  return structuredClone(trace);
}
const scenarios = [];
for (const prices of [
  { month_price: 0, year_price: null, onetime_price: 12345 },
  { month_price: 1.235, year_price: 2.345, onetime_price: null },
  { month_price: undefined, year_price: '10.25' },
]) {
  for (const status of [200, 422]) {
    scenarios.push({ effect: 'fetch', response: { code: status, data: [{ id: 1, ...prices }] } });
    for (const callback of [false, true]) scenarios.push({ effect: 'save', action: { params: prices }, status, callback });
  }
}
scenarios.push({ effect: 'fetch', response: { code: 200, data: [] } });
for (const effect of ['drop', 'update']) for (const status of [200, 422]) {
  scenarios.push({ effect, status, action: { id: 7, key: 'show', value: 0 } });
}
for (const [fromIndex, toIndex] of [[0, 2], [2, 0], [1, 1]]) for (const status of [200, 422]) {
  scenarios.push({ effect: 'sort', action: { fromIndex, toIndex }, status });
}
for (const effect of ['fetch', 'save', 'drop', 'update', 'sort']) scenarios.push({
  effect, reject: true, action: { params: { month_price: 1, year_price: null, onetime_price: 0 }, id: 7, key: 'show', value: 1, fromIndex: 0, toIndex: 2 },
});
for (const [index, scenario] of scenarios.entries()) test(`admin plan ${index + 1}: ${scenario.effect}`, async () => {
  assert.deepEqual(await run(false, scenario), await run(true, scenario));
});
