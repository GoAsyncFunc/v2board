import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function run(original, scenario) {
  const trace = [], module = { exports: {} };
  const api = { get: (...args) => { trace.push(['get', ...args]); return 'request'; } }; api.a = api.get;
  const file = new URL(original ? './fixtures/models/user-order-query.cjs' : '../src/models/orderQueryEffects.ts', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  const code = original ? text : (await transform(text, { format: 'cjs', loader: 'ts' })).code;
  vm.runInNewContext(code, { module, exports: module.exports, api, require(id) {
    if (id.includes('types/api')) return { isSuccessfulResponse: response => response.code === 200 };
    if (id.includes('request')) return api;
        throw Error(id);
  } }, { timeout: 2000 });
  const action = { tradeNo: 'FIXTURE-ORDER', filter: { status: 0 } };
  if (scenario.callback) {
    action.callback = (...args) => trace.push(['callback', ...args]);
    action.complete = (...args) => trace.push(['complete', ...args]);
  }
  const iterator = module.exports[scenario.effect](action, { put: action => { trace.push(['put', action]); return 'put'; } });
  let step, count = 0;
  try {
    step = iterator.next();
    while (!step.done) {
      if (++count > 20) throw Error('Unterminated effect');
      step = step.value === 'request' && scenario.reject
        ? iterator.throw(Error('Network failure'))
        : iterator.next(step.value === 'request' ? structuredClone(scenario.response) : undefined);
    }
  } catch (error) { trace.push(['error', error.name, error.message === 'Network failure' ? error.message : 'callback contract']); }
  return structuredClone(trace);
}
const scenarios = [];
for (const effect of ['detail', 'check', 'getPaymentMethod', 'fetch']) {
  for (const response of [{ code: 200, data: [] }, { code: 200, data: null }, { code: 200, data: 0 }, { code: 200, data: 1 }, { code: 422 }, { code: 500 }]) {
    for (const callback of [false, true]) scenarios.push({ effect, response, callback });
  }
  scenarios.push({ effect, reject: true, callback: true });
}
for (const [index, scenario] of scenarios.entries()) test(`order query ${index + 1}: ${scenario.effect}`, async () => {
  const before = await run(true, scenario), after = await run(false, scenario);
  assert.deepEqual(after, before);
  if (scenario.reject) assert.equal(after.at(-1)[0], 'error');
  if (scenario.effect === 'getPaymentMethod' && scenario.response?.code === 200 && !scenario.callback) {
    assert.equal(after.at(-1)[0], 'error', 'Inherited required complete callback still throws');
  }
});
