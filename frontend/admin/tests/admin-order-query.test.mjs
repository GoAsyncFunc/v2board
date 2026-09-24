import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function run(original, scenario) {
    const trace = [],
        module = { exports: {} };
    const state = {
        filter: [{ key: 'status', condition: '=', value: 0 }],
        pagination: { current: 4, pageSize: 20, total: 100 },
    };
    const response = structuredClone(scenario.response);
    const api = {
        get: (...args) => {
            trace.push(['get', ...structuredClone(args)]);
            return 'request';
        },
        isSuccessfulResponse: (value) => value.code === 200,
    };
    api.a = api.get;
    const file = new URL(
        original ? './fixtures/models/admin-order-query.cjs' : '../src/models/orderEffects.ts',
        import.meta.url,
    );
    const text = await fs.readFile(file, 'utf8');
    vm.runInNewContext(
        original ? text : (await transform(text, { format: 'cjs', loader: 'ts' })).code,
        {
            module,
            exports: module.exports,
            api,
            window: { settings: { secure_path: 'fixture-admin' } },
            require(id) {
                if (id.includes('request')) return api;
                if (id.includes('types/api')) return api;
                throw Error(id);
            },
        },
        { timeout: 2000 },
    );
    const iterator = module.exports[scenario.effect](structuredClone(scenario.action || {}), {
        put(action) {
            trace.push(['put', structuredClone(action)]);
            if (scenario.strict && !action.type) throw Error('Action type required');
            return 'put';
        },
        select(selector) {
            trace.push(['select']);
            return { selected: selector({ order: state }) };
        },
    });
    try {
        let step = iterator.next(),
            count = 0;
        while (!step.done) {
            if (++count > 20) throw Error('Unterminated effect');
            step =
                step.value === 'request' && scenario.reject
                    ? iterator.throw(Error('Offline'))
                    : iterator.next(step.value === 'request' ? response : step.value?.selected);
        }
    } catch (error) {
        trace.push(['error', error.name, error.message]);
    }
    trace.push(['state', state]);
    return structuredClone(trace);
}
const cases = [];
for (const code of [200, 422, 500])
    for (const data of [
        [],
        [{ trade_no: 'TEST', status: 3, total_amount: 12345, created_at: 1700000000 }],
        null,
    ])
        cases.push({ effect: 'fetch', response: { code, data, total: 1 } });
cases.push({ effect: 'fetch', reject: true });
for (const filter of [[], [{ key: 'trade_no', condition: 'like', value: 'TEST' }]])
    cases.push({ effect: 'filter', action: { filter } });
for (const clear of [false, true])
    for (const strict of [false, true])
        cases.push({
            effect: 'addFilter',
            action: { key: 'status', condition: '=', value: 2, clear },
            strict,
        });
for (const pagination of [{ current: 2 }, { pageSize: 50, current: 1 }, {}])
    cases.push({ effect: 'changeTable', action: { pagination } });
for (const [index, scenario] of cases.entries())
    test(`admin order query ${index + 1}: ${scenario.effect}`, async () => {
        const before = await run(true, scenario),
            after = await run(false, scenario);
        assert.deepEqual(after, before);
        if (scenario.strict && scenario.action.clear)
            assert.ok(
                after.some((event) => event[0] === 'error' && event[2] === 'Action type required'),
            );
        if (scenario.effect === 'fetch' && scenario.response?.code === 200)
            assert.deepEqual(
                after.find((e) => e[1]?.payload && Object.hasOwn(e[1].payload, 'orders'))?.[1]
                    .payload.orders,
                scenario.response.data,
            );
    });
