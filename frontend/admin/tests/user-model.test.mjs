import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadUserModel(pageSizePreference) {
    const source = await fs.readFile(
        new URL('../src/models/userModel.ts', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    const module = { exports: {} };
    const effects = {
        addFilter() {},
        allDel() {},
        ban() {},
        changeTable() {},
        checkLogin() {},
        delUser() {},
        dumpCSV() {},
        fetch() {},
        filter() {},
        generate() {},
        getUserInfo() {},
        getUserInfoById() {},
        resetSecret() {},
        sendMail() {},
        update() {},
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === '../utils/siteHelpers' || id === '@/utils/siteHelpers') {
                return { getPreference: () => pageSizePreference };
            }
            if (id.startsWith('./') || id.includes('userManagementEffects')) return effects;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.default;
}

test('user model reads page-size preferences as numbers', async (t) => {
    for (const [preference, expected] of [
        [50, 50],
        ['50', 50],
        [0, 10],
        [false, 10],
        ['invalid', 10],
    ]) {
        await t.test(`${String(preference)} -> ${expected}`, async () => {
            const userModel = await loadUserModel(preference);
            assert.equal(userModel.state.pagination.pageSize, expected);
        });
    }
});

// The bundle owns the user feedback messages inside the model effects
// (webpack module 686c5178): dumpCSV shows loading/destroy around the
// request, resetSecret/delUser show success after the code-200 guard.
async function loadEffects() {
    const source = await fs.readFile(
        new URL('../src/models-support/userManagementEffects.ts', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    const messages = [];
    const requests = [];
    const downloads = [];
    const puts = [];
    const responses = {};
    const messageMock = {
        loading: (text) => messages.push(['loading', text]),
        success: (text) => messages.push(['success', text]),
        destroy: () => messages.push(['destroy']),
    };
    const settings = { secure_path: 'admin' };
    const sandboxWindow = { settings };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window: sandboxWindow,
        require(id) {
            if (id === 'moment') {
                return () => ({ format: () => '2026-09-26 12:00:00' });
            }
            if (id === 'antd/lib/message') return messageMock;
            if (id.endsWith('/apiClient')) {
                return {
                    post: (url, data) => {
                        requests.push(['POST', url, data]);
                        return Promise.resolve(responses[url] ?? { code: 422 });
                    },
                    get: (url) => {
                        requests.push(['GET', url]);
                        return Promise.resolve(responses[url] ?? { code: 422 });
                    },
                };
            }
            if (id.endsWith('/csvDownloadService')) {
                return { downloadCsv: (buffer, name) => downloads.push([buffer, name]) };
            }
            if (id.includes('/apiContracts'))
                return { isSuccessfulResponse: (r) => r.code === 200 };
            if (id.endsWith('/navigationService')) return { push: () => {} };
            if (id.endsWith('/siteHelpers')) return { getToken: () => 'token' };
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return {
        effects: module.exports,
        messages,
        requests,
        downloads,
        puts,
        responses,
        run: async (effect, action, state) => {
            const iterator = module.exports[effect](action ?? {}, {
                select: (fn) => ({
                    select: true,
                    selection: fn(state ?? { user: { filter: [] } }),
                }),
                put: (action2) => puts.push(action2),
            });
            let step = iterator.next();
            while (!step.done) {
                const value = step.value;
                // redux-saga resolves yielded promises; the apiClient mock
                // records the matched response before returning it.
                if (value && typeof value.then === 'function') step = iterator.next(await value);
                else if (value?.select) step = iterator.next(value.selection);
                else if (value?.put) step = iterator.next();
                else step = iterator.next();
            }
        },
    };
}

test('dumpCSV shows the loading message around the request and downloads on success', async () => {
    const runtime = await loadEffects();
    runtime.responses['/admin/user/dumpCSV'] = { code: 200, buffer: 'csv-bytes' };
    await runtime.run('dumpCSV', {}, { user: { filter: [{ key: 'id', value: 1 }] } });
    // Requests recorded inside the vm realm; compare as plain JSON.
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(runtime.requests), [
        ['POST', '/admin/user/dumpCSV', { filter: [{ key: 'id', value: 1 }] }],
    ]);
    assert.deepEqual(runtime.messages, [['loading', '导出中'], ['destroy']]);
    assert.deepEqual(runtime.downloads, [['csv-bytes', '2026-09-26 12:00:00.csv']]);

    runtime.messages.length = 0;
    runtime.requests.length = 0;
    runtime.downloads.length = 0;
    runtime.responses['/admin/user/dumpCSV'] = { code: 422 };
    await runtime.run('dumpCSV', {}, { user: { filter: [] } });
    // The destroy runs even on failure; nothing is downloaded.
    assert.deepEqual(runtime.messages, [['loading', '导出中'], ['destroy']]);
    assert.deepEqual(runtime.downloads, []);
});

test('resetSecret and delUser report success and refresh after the code-200 guard', async () => {
    const runtime = await loadEffects();
    runtime.responses['/admin/user/resetSecret'] = { code: 200 };
    runtime.responses['/admin/user/delUser'] = { code: 200 };
    await runtime.run('resetSecret', { id: 7 });
    await runtime.run('delUser', { id: 7 });
    assert.deepEqual(runtime.messages, [
        ['success', '重置成功'],
        ['success', '删除成功'],
    ]);
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(runtime.puts), [{ type: 'fetch' }, { type: 'fetch' }]);

    runtime.messages.length = 0;
    runtime.puts.length = 0;
    runtime.responses['/admin/user/resetSecret'] = { code: 422 };
    await runtime.run('resetSecret', { id: 7 });
    assert.deepEqual(runtime.messages, []);
    assert.deepEqual(runtime.puts, []);
});
