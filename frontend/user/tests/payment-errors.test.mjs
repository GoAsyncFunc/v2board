import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const code = (
    await transform(
        await fs.readFile(new URL('../src/services/request.ts', import.meta.url), 'utf8'),
        { format: 'cjs', loader: 'ts' },
    )
).code;
for (const kind of ['validation', 'server', 'forbidden', 'transport', 'invalid-json'])
    test(`real request wrapper with mocked ${kind} failure`, async () => {
        const events = [],
            module = { exports: {} };
        const window = { settings: { title: 'Fixture' }, location: { href: 'http://ui.test/' } };
        const fetch = async () => {
            if (kind === 'transport') throw Error('Network offline');
            return {
                status: kind === 'forbidden' ? 403 : kind === 'validation' ? 422 : 500,
                json: async () => {
                    if (kind === 'invalid-json') throw Error('Invalid JSON');
                    return kind === 'validation'
                        ? { errors: { method: ['Invalid payment method'] } }
                        : { message: 'Payment unavailable' };
                },
            };
        };
        vm.runInNewContext(code, {
            module,
            exports: module.exports,
            window,
            document: {},
            URL,
            fetch,
            require(id) {
                if (id.includes('i18n'))
                    return { getLocale: () => 'zh-CN', formatMessage: ({ id }) => id };
                if (id.includes('siteHelpers'))
                    return {
                        d: () => 'fixture-token',
                        o: () => events.push('clear-token'),
                        getToken: () => 'fixture-token',
                        clearToken: () => events.push('clear-token'),
                    };
                throw Error(id);
            },
        });
        module.exports.setRequestFailurePresenter((failure) =>
            events.push(['error', failure.titleMessageId, failure.description]),
        );
        if (['transport', 'invalid-json'].includes(kind)) {
            await assert.rejects(() => module.exports.post('/user/order/checkout', {}));
            assert.equal(events.length, 0, 'Inherited transport/parse errors have no notification');
        } else {
            const result = await module.exports.post('/user/order/checkout', {});
            if (kind === 'forbidden') {
                assert.equal(window.location.href, '/');
                assert.deepEqual(events, ['clear-token']);
            } else
                assert.deepEqual(events, [
                    [
                        'error',
                        '请求失败',
                        kind === 'validation' ? 'Invalid payment method' : 'Payment unavailable',
                    ],
                ]);
            assert.equal(
                result.code,
                kind === 'forbidden' ? 403 : kind === 'validation' ? 422 : 500,
            );
        }
    });
