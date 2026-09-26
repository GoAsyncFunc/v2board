import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
async function run(original, scenario) {
    const trace = [];
    const state = {
        filter: [{ key: 'email', condition: 'like', value: 'test' }],
        pagination: { current: 4, pageSize: 20, total: 100 },
        sort: { sort: 'id', sort_type: 'DESC' },
    };
    const response = structuredClone(scenario.response);
    const api = {
        get: (...args) => {
            trace.push(['get', ...args]);
            return 'request';
        },
        isSuccessfulResponse: (value) => value.code === 200,
    };
    api.a = api.get;
    const file = original
        ? path.join(home, 'tests/fixtures/models/admin-user-query.cjs')
        : path.join(home, 'src/models/userManagementEffects.ts');
    const source = await fs.readFile(file, 'utf8');
    const code = original
        ? source
        : (await transform(source, { format: 'cjs', loader: 'ts' })).code;
    const module = { exports: {} };
    vm.runInNewContext(
        code,
        {
            module,
            exports: module.exports,
            api,
            window: { settings: { secure_path: 'test-admin' } },
            require: (id) => {
                if (id.includes('apiClient')) return api;
                if (id.includes('types/apiContracts')) return api;
                if (id.includes('types/modelEffectContracts')) return {};
                if (id.includes('types/filterContracts')) return {};
                if (id.includes('types/authenticationContracts')) return {};
                if (id.includes('types/storeContracts')) return {};
                if (id.includes('types/userContracts')) return {};
                if (id.includes('services/csvDownloadService')) return { downloadCsv() {} };
                if (id === 'moment') return () => ({ format: () => 'fixture' });
                if (id === 'antd/lib/message') return { loading() {}, success() {}, destroy() {} };
                if (id.includes('app/navigationService')) return { push() {} };
                if (id.includes('utils/siteHelpers')) return { getToken: () => null };
                throw Error(id);
            },
        },
        { timeout: 2000 },
    );
    const iterator = module.exports[scenario.effect](structuredClone(scenario.action || {}), {
        put: (value) => {
            trace.push(['put', structuredClone(value)]);
            return 'put';
        },
        select: (selector) => {
            trace.push(['select']);
            return { selected: selector({ user: state }) };
        },
    });
    let step = iterator.next(),
        count = 0;
    while (!step.done) {
        if (++count > 20) throw Error('Unterminated effect');
        if (step.value === 'request' && scenario.reject) {
            try {
                step = iterator.throw(Error('Network failure'));
            } catch (e) {
                trace.push(['error', e.message]);
                break;
            }
        } else step = iterator.next(step.value === 'request' ? response : step.value?.selected);
    }
    trace.push(['state', state], ['response', response]);
    return structuredClone(trace);
}
const user = {
    password: 'hash-fixture',
    transfer_enable: 1073741824,
    u: 123456,
    d: 234567,
    total_used: 358023,
    balance: 12345,
    commission_balance: 67,
    invite_user: { email: 'invite@example.com' },
};
const scenarios = [];
for (const effect of ['fetch', 'getUserInfoById']) {
    for (const code of [200, 422])
        scenarios.push({
            effect,
            action: { id: 7 },
            response: { code, data: effect === 'fetch' ? [user] : user, total: 1 },
        });
    scenarios.push({ effect, reject: true });
}
scenarios.push({ effect: 'fetch', response: { code: 200, data: [], total: 0 } });
for (const [label, value] of [
    ['numeric strings', '1073741824'],
    ['null values', null],
    ['missing values', undefined],
    ['invalid numeric strings', 'invalid'],
]) {
    const record = {
        ...user,
        transfer_enable: value,
        u: value,
        d: value,
        total_used: value,
        balance: value,
        commission_balance: value,
    };
    scenarios.push({ effect: 'fetch', label, response: { code: 200, data: [record], total: 1 } });
    scenarios.push({
        effect: 'getUserInfoById',
        label,
        response: { code: 200, data: record, total: 1 },
    });
}
for (const invite_user of [undefined, null])
    scenarios.push({
        effect: 'getUserInfoById',
        response: { code: 200, data: { ...user, invite_user } },
    });
for (const filter of [[], [{ key: 'banned', condition: '=', value: 1 }]])
    scenarios.push({ effect: 'filter', action: { filter } });
for (const pagination of [{ current: 2 }, { pageSize: 50, current: 1 }, {}])
    scenarios.push({
        effect: 'changeTable',
        action: { pagination, sort: { sort: 'email', sort_type: 'ASC' } },
    });
for (const clear of [true, false, undefined])
    scenarios.push({
        effect: 'addFilter',
        action: { key: 'balance', condition: '>', value: 100, clear },
    });
for (const [index, scenario] of scenarios.entries())
    test(`admin user query ${index + 1}: ${scenario.effect}`, async () =>
        assert.deepEqual(await run(false, scenario), await run(true, scenario)));
