import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const originalCode = await fs.readFile(
    new URL('./fixtures/models/recovered-order-factory.cjs', import.meta.url),
    'utf8',
);
const paymentCode = (
    await transform(
        await fs.readFile(new URL('../src/models/orderManagementEffects.ts', import.meta.url), 'utf8'),
        { format: 'cjs', loader: 'ts' },
    )
).code;
async function run(original, scenario) {
    const trace = [],
        module = { exports: {} };
    const location = {};
    Object.defineProperty(location, 'href', { set: (value) => trace.push(['redirect', value]) });
    const post = (...args) => {
        trace.push(['post', ...structuredClone(args)]);
        return 'request';
    };
    const history = { push: (value) => trace.push(['navigate', value]) };
    const message = {
        info: (...args) => trace.push(['info', ...args]),
        loading: (...args) => trace.push(['loading', ...args]),
    };
    const require = (id) => {
        if (id === 'p0pE') return Object.assign;
        if (id.includes('types/api'))
            return { isSuccessfulResponse: (response) => response.code === 200 };
        if (id === 't3Un' || id.includes('request')) return { b: post, post };
        if (id === '3a4m' || (id.includes('routerHistory') || id.includes('../app/history'))) return history;
        if (id === 'antd/lib/message') return { __esModule: true, default: message };
        if (id === 'tsqr' || id.includes('antdMessage')) return { a: message };
        if (id === 'miYZ') return {};
        throw Error('Unexpected dependency ' + id);
    };
    require.r = (exports) => Object.defineProperty(exports, '__esModule', { value: true });
    require.n = (object) => {
        const fn = () => object;
        Object.defineProperty(fn, 'a', { get: fn });
        return fn;
    };
    const context = vm.createContext({
        module,
        exports: module.exports,
        require,
        window: { location },
    });
    vm.runInContext(original ? originalCode : paymentCode, context, { timeout: 2000 });
    let effects = module.exports;
    if (original) {
        const result = { exports: {} };
        module.exports(result, result.exports, require);
        effects = result.exports.default.effects;
    }
    const action = {
        tradeNo: 'FIXTURE',
        method: scenario.method,
        token: scenario.token,
        params: { plan_id: 7, period: 'month_price' },
    };
    if (scenario.callback) action.complete = () => trace.push(['complete']);
    if (!original && scenario.effect === 'checkout')
        action.complete = () => trace.push(['info', '正在前往收银台']);
    if (!original && scenario.effect === 'checkoutByStripe')
        action.complete = () => trace.push(['loading', '请稍等，我们正在验证该笔支付', 5]);
    const iterator = effects[scenario.effect](action, {
        put: (value) => {
            trace.push(['put', structuredClone(value)]);
            return 'put';
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
                    : iterator.next(
                          step.value === 'request' ? structuredClone(scenario.response) : undefined,
                      );
        }
    } catch (error) {
        trace.push(['error', error.name, scenario.reject ? error.message : 'invalid response']);
    }
    return structuredClone(trace);
}
const cases = [];
for (const effect of ['save', 'checkout', 'checkoutByStripe', 'cancel']) {
    for (const response of [
        { code: 200, type: 0, data: 'fixture-qr' },
        { code: 200, type: 1, data: 'https://invalid.test/pay' },
        { code: 200, type: 2, data: true },
        { code: 422 },
        { code: 500 },
        {},
        null,
    ]) {
        for (const callback of [false, true])
            cases.push({ effect, response, callback, method: 1, token: 'tok_fixture' });
    }
    cases.push({ effect, reject: true, callback: true });
}
for (const token of [undefined, null, {}, { error: 'fixture' }])
    cases.push({ effect: 'checkoutByStripe', token, response: { code: 200 } });
for (const method of [undefined, null])
    cases.push({ effect: 'checkout', method, response: { code: 200, type: 2, data: true } });
for (const [index, scenario] of cases.entries())
    test(`payment effect ${index + 1}: ${scenario.effect}`, async () => {
        const before = await run(true, scenario),
            after = await run(false, scenario);
        assert.deepEqual(after, before);
        if (scenario.effect === 'cancel' && scenario.response?.code === 200) {
            const actions = after.filter((x) => x[0] === 'put').map((x) => x[1].type);
            assert.deepEqual(actions.slice(-2), ['fetch', 'details']);
            if (scenario.callback) assert.deepEqual(after.at(-1), ['complete']);
        }
        if (scenario.reject) assert.equal(after.at(-1)[0], 'error');
    });
