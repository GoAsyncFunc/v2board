import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(
    new URL('../src/models-support/orderManagementEffects.ts', import.meta.url),
    'utf8',
);
const { code } = await transform(source, { format: 'cjs', loader: 'ts' });

function run(effect, action, { status = 200, reject = false } = {}) {
    const trace = [];
    const module = { exports: {} };
    vm.runInNewContext(
        code,
        {
            module,
            exports: module.exports,
            window: { settings: { secure_path: 'fixture-admin' } },
            require(id) {
                if (id.includes('services/apiClient'))
                    return {
                        post(endpoint, params) {
                            trace.push(['post', endpoint, structuredClone(params)]);
                            return 'request';
                        },
                    };
                if (id.includes('types/apiContracts'))
                    return {
                        isSuccessfulResponse: (response) => response.code === 200,
                    };
                throw Error(id);
            },
        },
        { timeout: 2000 },
    );

    const iterator = module.exports[effect](action, {
        put(value) {
            trace.push(['put', structuredClone(value)]);
            return 'put';
        },
    });
    let step = iterator.next();
    while (!step.done) {
        if (step.value === 'request' && reject) {
            assert.throws(() => iterator.throw(Error('Network failure')), /Network failure/);
            trace.push(['error']);
            break;
        }
        step = iterator.next(step.value === 'request' ? { code: status } : step.value);
    }
    return trace;
}

const tradeActions = {
    update: {
        action: { tradeNo: 'TRADE-1', key: 'commission_status', value: '1' },
        endpoint: 'update',
        params: { trade_no: 'TRADE-1', commission_status: '1' },
    },
    paid: {
        action: { tradeNo: 'TRADE-1' },
        endpoint: 'paid',
        params: { trade_no: 'TRADE-1' },
    },
    cancel: {
        action: { tradeNo: 'TRADE-1' },
        endpoint: 'cancel',
        params: { trade_no: 'TRADE-1' },
    },
};

for (const [effect, scenario] of Object.entries(tradeActions)) {
    for (const status of [200, 422]) {
        test(`${effect} refreshes orders only after a successful response (${status})`, () => {
            const expected = [
                ['post', `/fixture-admin/order/${scenario.endpoint}`, scenario.params],
            ];
            if (status === 200) expected.push(['put', { type: 'fetch' }]);
            assert.deepEqual(run(effect, scenario.action, { status }), expected);
        });
    }

    test(`${effect} preserves transport rejection`, () => {
        const trace = run(effect, scenario.action, { reject: true });
        assert.deepEqual(trace.at(-1), ['error']);
        assert.equal(
            trace.some((event) => event[0] === 'put'),
            false,
        );
    });
}

for (const status of [200, 422]) {
    for (const callback of [false, true]) {
        test(`assign converts totals and completes only after success (${status}, callback=${callback})`, () => {
            const trace = [];
            const action = {
                params: {
                    email: 'buyer@example.com',
                    plan_id: 7,
                    period: 'month_price',
                    total_amount: 12.34,
                },
                callback: callback ? () => trace.push(['callback']) : undefined,
            };
            const effectTrace = run('assign', action, { status });
            const expected = [
                ['put', { type: 'setState', payload: { assignLoading: true } }],
                [
                    'post',
                    '/fixture-admin/order/assign',
                    {
                        email: 'buyer@example.com',
                        plan_id: 7,
                        period: 'month_price',
                        total_amount: 1234,
                    },
                ],
                ['put', { type: 'setState', payload: { assignLoading: false } }],
            ];
            if (status === 200) {
                expected.push(['put', { type: 'fetch' }]);
                if (callback) expected.push(['callback']);
            }
            assert.deepEqual([...effectTrace, ...trace], expected);
        });
    }
}

test('assign preserves pending state when transport rejects', () => {
    const trace = run(
        'assign',
        {
            params: {
                email: 'buyer@example.com',
                plan_id: 7,
                period: 'month_price',
                total_amount: 1,
            },
        },
        { reject: true },
    );
    assert.deepEqual(trace.at(-1), ['error']);
    assert.equal(
        trace.some((event) => event[1]?.payload?.assignLoading === false),
        false,
    );
});
