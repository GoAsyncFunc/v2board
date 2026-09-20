import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/models/invite.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { format: 'cjs', loader: 'ts' });

async function run(effect, action, response, reject = false) {
  const events = [], module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id.includes('types/api')) return { isSuccessfulResponse: value => value.code === 200 };
    if (id.includes('services/request')) {
      const request = method => async (url, params) => {
        events.push([method, url, structuredClone(params)]);
        if (reject) throw Error('Offline');
        return response;
      };
      return { get: request('GET'), post: request('POST') };
    }
    throw Error(id);
  } });
  const model = module.exports.default;
  const effectAction = effect === 'save' ? { ...action, complete: () => events.push(['complete']) } : action;
  const iterator = model.effects[effect](effectAction, { put: update => ({ update }) });
  let state = model.state, error;
  try {
    let step = iterator.next();
    while (!step.done) {
      if (step.value?.update) {
        const update = step.value.update;
        events.push(['put', structuredClone(update)]);
        if (update.type === 'setState') state = model.reducers.setState(state, update);
        step = iterator.next();
      } else {
        try { step = iterator.next(await step.value); }
        catch (failure) { step = iterator.throw(failure); }
      }
    }
  } catch (failure) { error = failure; }
  return { state, model, events, error };
}

for (const status of [200, 422, 500]) {
  test(`Invite details response=${status} preserves pagination and loading order`, async () => {
    const data = [{ id: 7, get_amount: 1200 }];
    const result = await run('details', { current: 2, pageSize: 50 }, { code: status, data, total: 120 });
    assert.equal(result.error, undefined);
    assert.deepEqual(result.events.slice(0, 3), [
      ['put', { type: 'setState', payload: { detailsLoading: true } }],
      ['GET', '/user/invite/details', { current: 2, page_size: 50 }],
      ['put', { type: 'setState', payload: { detailsLoading: false } }],
    ]);
    assert.equal(result.events.length, status === 200 ? 4 : 3);
    if (status === 200) {
      assert.equal(result.state.invites, data);
      assert.deepEqual(JSON.parse(JSON.stringify(result.state.detailsPagination)), { current: 2, page_size: 50, total: 120 });
    } else assert.equal(result.state.invites, result.model.state.invites);
  });

  test(`Invite fetch response=${status} merges codes and statistics`, async () => {
    const data = { codes: [{ code: 'DEMO' }], stat: [2, 1000, 500, 10] };
    const result = await run('fetch', {}, { code: status, data });
    assert.equal(result.state.fetchLoading, false);
    assert.deepEqual(result.events[1], ['GET', '/user/invite/fetch', undefined]);
    assert.equal(result.events.length, status === 200 ? 4 : 3);
    assert.equal(result.state.codes, status === 200 ? data.codes : result.model.state.codes);
    if (status === 200) assert.equal(result.state.stat, data.stat);
  });

  test(`Invite creation response=${status} refreshes only after success`, async () => {
    const result = await run('save', {}, { code: status, data: true });
    assert.equal(result.state.saveLoading, false);
    assert.deepEqual(result.events.slice(0, 3), [
      ['put', { type: 'setState', payload: { saveLoading: true } }],
      ['POST', '/user/invite/save', undefined],
      ['put', { type: 'setState', payload: { saveLoading: false } }],
    ]);
    assert.deepEqual(result.events.slice(3), status === 200 ? [['complete'], ['put', { type: 'fetch' }]] : []);
  });
}

test('Initial commission query leaves pagination arguments absent', async () => {
  const result = await run('details', {}, { code: 200, data: [], total: 0 });
  assert.deepEqual(result.events[1], ['GET', '/user/invite/details', { current: undefined, page_size: undefined }]);
  assert.equal(result.state.detailsPagination.current, undefined);
  assert.equal(result.state.detailsPagination.page_size, undefined);
});

for (const [effect, loading] of [['details', 'detailsLoading'], ['fetch', 'fetchLoading'], ['save', 'saveLoading']]) {
  test(`Invite ${effect} transport rejection retains original loading behavior`, async () => {
    const result = await run(effect, {}, undefined, true);
    assert.equal(result.error.message, 'Offline');
    assert.equal(result.state[loading], true);
    assert.equal(result.events.length, 2);
  });
}
