import assert from 'node:assert/strict';
import test from 'node:test';
import { compareModelEffect } from './helpers/model-differential.mjs';

const couponState = {
    coupons: [],
    fetchLoading: false,
    saveLoading: false,
    pagination: { pageSize: 10, current: 1 },
    sort: {},
};

test('coupon model effects match the bundle module', async () => {
    const outcomes = await compareModelEffect('coupon', {
        bundleFile: '654f4378.js',
        modelFile: 'couponModel.ts',
        state: { coupon: couponState },
        effects: {
            fetch: {},
            generate: { params: { type: 1, value: 10, generate_count: 5 }, callback: true },
            drop: { id: 7 },
            show: { id: 7 },
            changeTable: { pagination: { current: 2 }, sort: {} },
        },
    });
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(outcomes.recovered), plain(outcomes.original));
});
