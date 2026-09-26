import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clone = (value) => structuredClone(value);

async function load() {
    const result = await build({
        absWorkingDir: root,
        entryPoints: ['src/models/configurationModel.ts'],
        bundle: true,
        write: false,
        platform: 'node',
        format: 'cjs',
        logLevel: 'silent',
        plugins: [
            {
                name: 'config-model-dependencies',
                setup(builder) {
                    builder.onResolve({ filter: /services\/apiClient$/ }, () => ({
                        path: 'request',
                        namespace: 'test',
                    }));
                    builder.onResolve({ filter: /^antd\/lib\/message$/ }, () => ({
                        path: 'message',
                        namespace: 'test',
                    }));
                    builder.onLoad({ filter: /^request$/, namespace: 'test' }, () => ({
                        loader: 'js',
                        contents: `exports.get=(url,data)=>globalThis.request('GET',url,data);exports.post=(url,data)=>globalThis.request('POST',url,data);exports.isSuccessfulResponse=response=>response.code===200;`,
                    }));
                    builder.onResolve({ filter: /^antd\/lib\/modal$/ }, () => ({
                        path: 'modal',
                        namespace: 'test',
                    }));
                    builder.onLoad({ filter: /^message$/, namespace: 'test' }, () => ({
                        loader: 'js',
                        contents: `module.exports={success:value=>globalThis.notify('success',value),error:value=>globalThis.notify('error',value),loading:value=>globalThis.notify('loading',value),destroy:()=>globalThis.notify('destroy')};`,
                    }));
                    builder.onLoad({ filter: /^modal$/, namespace: 'test' }, () => ({
                        loader: 'js',
                        contents: `module.exports={success:o=>globalThis.notify('success',o.title),error:o=>globalThis.notify('error',o.title)};`,
                    }));
                },
            },
        ],
    });
    const requests = [];
    const notifications = [];
    const context = {
        module: { exports: {} },
        exports: {},
        console: { log() {} },
        process: { env: {} },
        window: { settings: { secure_path: 'admin' } },
        request(method, url, data) {
            requests.push([method, url, clone(data)]);
            return { request: true };
        },
        notify(level, value) {
            notifications.push([level, typeof value === 'string' ? value : value.title]);
        },
    };
    context.exports = context.module.exports;
    vm.runInNewContext(result.outputFiles[0].text, context);
    return { model: context.module.exports.default, requests, notifications };
}

function run(model, effect, action, response, state) {
    const puts = [];
    const iterator = model.effects[effect](action, {
        put(value) {
            puts.push(clone(value));
            return { put: true };
        },
        select(selector) {
            return { selected: selector(state) };
        },
    });
    let step = iterator.next();
    while (!step.done)
        step = iterator.next(
            step.value?.request ? clone(response) : step.value?.selected || step.value,
        );
    return puts;
}

test('config fetch normalizes comma-separated list fields', async () => {
    const runtime = await load();
    const puts = run(
        runtime.model,
        'fetch',
        { key: 'invite' },
        {
            code: 200,
            data: {
                invite: { commission_withdraw_method: '支付宝,USDT' },
                site: { email_whitelist_suffix: 'example.com,example.org' },
                deposit: { deposit_bounus: '50:18,100:38' },
            },
        },
    );
    assert.deepEqual(runtime.requests, [['GET', '/admin/config/fetch', { key: 'invite' }]]);
    assert.deepEqual(puts.at(-1).payload, {
        invite: { commission_withdraw_method: ['支付宝', 'USDT'] },
        site: { email_whitelist_suffix: ['example.com', 'example.org'] },
        deposit: { deposit_bounus: ['50:18', '100:38'] },
    });
});

test('config save posts only the selected group, shows the toast and refreshes', async () => {
    const runtime = await load();
    const puts = run(
        runtime.model,
        'save',
        { parentKey: 'email' },
        { code: 200 },
        {
            config: { email: { email_host: 'smtp.example.com', email_port: 465 } },
        },
    );
    assert.deepEqual(runtime.requests, [
        ['POST', '/admin/config/save', { email_host: 'smtp.example.com', email_port: 465 }],
    ]);
    // The bundle shows the save toast inside the model (module 366c4b4b).
    assert.deepEqual(runtime.notifications, [['success', '保存成功']]);
    assert.deepEqual(puts, [{ type: 'fetch' }]);
});

test('telegram webhook shows the toast only after a successful response', async () => {
    const runtime = await load();
    const puts = run(
        runtime.model,
        'setTelegramWebhook',
        { token: 'fixture-token' },
        { code: 200 },
    );
    assert.deepEqual(runtime.requests, [
        ['POST', '/admin/config/setTelegramWebhook', { telegram_bot_token: 'fixture-token' }],
    ]);
    assert.deepEqual(puts, [
        { type: 'setState', payload: { setTelegramWebhookLoading: true } },
        { type: 'setState', payload: { setTelegramWebhookLoading: false } },
    ]);
    assert.deepEqual(runtime.notifications, [['success', 'webhook 设置成功']]);
});

test('mail test preserves loading and shows the result notification after success', async () => {
    const runtime = await load();
    const log = { error: 'connection failed', email: 'admin@example.com' };
    const puts = run(
        runtime.model,
        'testSendMail',
        {},
        {
            code: 200,
            log: { error: 'connection failed', email: 'admin@example.com' },
        },
    );
    assert.deepEqual(runtime.requests, [['POST', '/admin/config/testSendMail', undefined]]);
    assert.deepEqual(puts, [
        { type: 'setState', payload: { testSendMailLoading: true } },
        { type: 'setState', payload: { testSendMailLoading: false } },
    ]);
    // The bundle renders the mail-test modal inside the model; the error log
    // selects the error variant with the failing title.
    assert.deepEqual(runtime.notifications, [['error', '发送失败']]);
});
