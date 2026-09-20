import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const code = (await transform(await fs.readFile(new URL('../src/models/userExportEffects.ts', import.meta.url), 'utf8'), { format: 'cjs', loader: 'ts' })).code;
function run(effect, { count, code: status = 200, reject = false, callback = false } = {}) {
  const trace = [], module = { exports: {} };
  const params = count === undefined ? {} : { generate_count: count };
  const filter = [{ key: 'email', condition: 'like', value: 'fixture' }];
  vm.runInNewContext(code, {
    module, exports: module.exports, window: { settings: { secure_path: 'fixture-admin' } },
    require(id) {
      if (id.includes('request')) return { post(url, data) { trace.push(['post', url, structuredClone(data)]); return 'request'; } };
      if (id.includes('antdMessage')) return { a: { loading: text => trace.push(['loading', text]), destroy: () => trace.push(['destroy']) } };
      if (id === 'antd/lib/message') return { loading: text => trace.push(['loading', text]), destroy: () => trace.push(['destroy']) };
      if (id.includes('77642f52')) return () => ({ format: () => '2026-01-02 03:04:05' });
      if (id === 'moment') return () => ({ format: () => '2026-01-02 03:04:05' });
      if (id.includes('download')) return { downloadCsv: (...args) => trace.push(['download', ...args]) };
        throw Error(id);
    },
  }, { timeout: 2000 });
  const iterator = module.exports[effect]({ params, callback: callback ? () => trace.push(['callback']) : undefined }, {
    put: action => { trace.push(['put', structuredClone(action)]); return 'put'; },
    select: select => { trace.push(['select']); return { selected: select({ user: { filter } }) }; },
  });
  let step = iterator.next();
  while (!step.done) {
    if (step.value === 'request' && reject) {
      assert.throws(() => iterator.throw(Error('Network failure')), /Network failure/);
      trace.push(['error']); break;
    }
    step = iterator.next(step.value === 'request' ? { code: status, buffer: 'fixture,csv' } : step.value?.selected);
  }
  return { trace, params, filter };
}
for (const count of [undefined, 0, 2]) for (const status of [200, 422]) for (const callback of [false, true]) {
  test(`generate: count=${count}, status=${status}, callback=${callback}`, () => {
    const { trace, params } = run('generate', { count, code: status, callback });
    const expected = [
      ['put', { type: 'setState', payload: { generateLoading: true } }],
      ['post', '/fixture-admin/user/generate', params],
      ['put', { type: 'setState', payload: { generateLoading: false } }],
    ];
    if (status === 200) {
      if (count) expected.push(['download', 'fixture,csv', 'USER 2026-01-02 03:04:05.csv']);
      expected.push(['put', { type: 'fetch' }]);
      if (callback) expected.push(['callback']);
    }
    assert.deepEqual(trace, expected);
  });
}
for (const status of [200, 422]) test(`dumpCSV: status=${status}`, () => {
  const { trace, filter } = run('dumpCSV', { code: status });
  const expected = [['select'], ['loading', '导出中'], ['post', '/fixture-admin/user/dumpCSV', { filter }], ['destroy']];
  if (status === 200) expected.push(['download', 'fixture,csv', '2026-01-02 03:04:05.csv']);
  assert.deepEqual(trace, expected);
});
for (const effect of ['generate', 'dumpCSV']) test(`${effect}: network failure propagates without download or callback`, () => {
  const { trace } = run(effect, { reject: true, callback: true, count: 2 });
  assert.equal(trace.at(-1)[0], 'error');
  assert.equal(trace.some(event => ['download', 'callback'].includes(event[0])), false);
  // Migration parity: original effects do not reset loading on thrown network errors.
  assert.equal(trace.some(event => event[0] === 'destroy' || event[1]?.payload?.generateLoading === false), false);
});
