import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const cases = [
  { name: 'server', effect: 'fetch', endpoint: '/user/server/fetch', field: 'servers', loading: 'fetchLoading', data: [{ name: 'Node', rate: 1 }] },
  { name: 'stat', file: 'trafficStatisticsModel', effect: 'getTrafficLog', endpoint: '/user/stat/getTrafficLog', field: 'traffics', loading: 'getTrafficLogLoading', data: [{ u: '1024', d: '2048', server_rate: 1 }] },
  { name: 'notice', effect: 'fetch', endpoint: '/user/notice/fetch', field: 'notices', data: [{ title: 'Announcement', tags: ['弹窗'] }] },
  { name: 'telegram', effect: 'getBotInfo', endpoint: '/user/telegram/getBotInfo', field: 'botInfo', data: { username: 'test_bot' } },
];

async function load(entry, response, fail = false) {
  const modelFileNames = {
    server: 'serverCatalogModel',
    notice: 'noticeModel',
    telegram: 'telegramModel',
  };
  const source = await fs.readFile(
    new URL(`../src/models/${entry.file || modelFileNames[entry.name] || entry.name}.ts`, import.meta.url),
    'utf8',
  );
  const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
  const events = [];
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id.includes('types/apiContracts')) return { isSuccessfulResponse: value => value.code === 200 };
    if (id.includes('services/apiClient')) return { get: async endpoint => {
      events.push(['request', endpoint]);
      if (fail) throw Error('Offline');
      return response;
    } };
    throw Error(id);
  } });
  const model = module.exports.default;
  let state = model.state;
  const iterator = model.effects[entry.effect]({ complete: () => events.push(['complete']) }, {
    put: action => ({ kind: 'put', action }),
  });
  async function run() {
    let step = iterator.next();
    while (!step.done) {
      if (step.value?.kind === 'put') {
        const action = step.value.action;
        events.push(['put', structuredClone(action)]);
        state = model.reducers.setState(state, action);
        step = iterator.next();
      } else {
        try { step = iterator.next(await step.value); }
        catch (error) { step = iterator.throw(error); }
      }
    }
    return state;
  }
  return { model, events, run, getState: () => state };
}

for (const entry of cases) {
  for (const code of [200, 403, 500]) test(`${entry.name} query response=${code} preserves state and callback order`, async () => {
    const runtime = await load(entry, { code, data: entry.data });
    const state = await runtime.run();
    const expected = [];
    if (entry.loading) expected.push(['put', { type: 'setState', payload: { [entry.loading]: true } }]);
    expected.push(['request', entry.endpoint]);
    if (entry.loading) expected.push(['put', { type: 'setState', payload: { [entry.loading]: false } }]);
    if (code === 200) {
      expected.push(['put', { type: 'setState', payload: { [entry.field]: entry.data } }]);
      if (entry.name === 'notice') expected.push(['complete']);
      assert.equal(state[entry.field], entry.data);
    } else {
      assert.equal(state[entry.field], runtime.model.state[entry.field]);
    }
    assert.deepEqual(runtime.events, expected);
    if (entry.loading) assert.equal(state[entry.loading], false);
  });

  test(`${entry.name} transport failure preserves inherited state behavior`, async () => {
    const runtime = await load(entry, undefined, true);
    await assert.rejects(runtime.run(), /Offline/);
    assert.equal(runtime.events.some(event => event[0] === 'complete'), false);
    assert.equal(runtime.getState()[entry.field], runtime.model.state[entry.field]);
    if (entry.loading) assert.equal(runtime.getState()[entry.loading], true);
  });

  test(`${entry.name} reducer merges partial updates without mutating prior state`, async () => {
    const runtime = await load(entry, {});
    const before = { ...runtime.model.state, preserved: 'value' };
    const after = runtime.model.reducers.setState(before, { payload: { [entry.field]: entry.data } });
    assert.notEqual(after, before);
    assert.equal(after.preserved, 'value');
    assert.equal(after[entry.field], entry.data);
    assert.equal(before[entry.field], runtime.model.state[entry.field]);
  });
}
