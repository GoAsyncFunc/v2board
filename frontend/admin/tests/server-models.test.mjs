import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const copy = (value) => structuredClone(value);
const protocolModelExports = {
    serverAnyTls: 'serverAnyTLS',
    serverHysteria: 'serverHysteria',
    serverShadowsocks: 'serverShadowsocks',
    serverTrojan: 'serverTrojan',
    serverTuic: 'serverTuic',
    serverV2Node: 'serverV2node',
    serverVless: 'serverVless',
    serverVmess: 'serverVmess',
};

async function loadModel(modelName) {
    const modelFileName = modelName === 'serverManage' ? 'serverManagement' : modelName;
    const result = await build({
        absWorkingDir: appRoot,
        entryPoints: [
            protocolModelExports[modelName]
                ? 'src/models/serverProtocolModelFactory.ts'
                : `src/models/${modelFileName}.ts`,
        ],
        bundle: true,
        write: false,
        platform: 'node',
        format: 'cjs',
        target: 'es2018',
        logLevel: 'silent',
        plugins: [
            {
                name: 'request-mock',
                setup(builder) {
                    builder.onResolve({ filter: /services\/request$/ }, () => ({
                        path: 'request-mock',
                        namespace: 'test',
                    }));
                    builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({
                        loader: 'js',
                        contents: `
            exports.get = (url, data) => globalThis.recordRequest('GET', url, data);
            exports.post = (url, data) => globalThis.recordRequest('POST', url, data);
            exports.isSuccessfulResponse = response => response.code === 200;
          `,
                    }));
                },
            },
        ],
    });
    const requests = [];
    const context = {
        module: { exports: {} },
        exports: {},
        window: { settings: { secure_path: 'admin-path' } },
        recordRequest(method, url, data) {
            requests.push([method, url, copy(data)]);
            return { request: true };
        },
    };
    context.exports = context.module.exports;
    vm.runInNewContext(result.outputFiles[0].text, context, { timeout: 3000 });
    return {
        model: protocolModelExports[modelName]
            ? context.module.exports[protocolModelExports[modelName]]
            : context.module.exports.default,
        requests,
    };
}

function runEffect(model, effectName, action, response, selectedState) {
    const puts = [];
    let callbackCount = 0;
    const effectAction = {
        ...action,
        ...(action.callback
            ? {
                  callback: () => {
                      callbackCount += 1;
                  },
              }
            : {}),
    };
    const tools = {
        put(value) {
            puts.push(copy(value));
            return { put: true };
        },
        select(selector) {
            return { selection: selector(selectedState) };
        },
    };
    const iterator = model.effects[effectName](effectAction, tools);
    let step = iterator.next();
    while (!step.done) {
        if (step.value?.request) step = iterator.next(copy(response));
        else if (step.value?.selection) step = iterator.next(step.value.selection);
        else step = iterator.next(step.value);
    }
    return { puts, callbackCount };
}

const protocols = [
    ['serverAnyTls', 'serverAnyTLS', 'anytls'],
    ['serverHysteria', 'serverHysteria', 'hysteria'],
    ['serverShadowsocks', 'serverShadowsocks', 'shadowsocks'],
    ['serverTrojan', 'serverTrojan', 'trojan'],
    ['serverTuic', 'serverTuic', 'tuic'],
    ['serverV2Node', 'serverV2node', 'v2node'],
    ['serverVless', 'serverVless', 'vless'],
    ['serverVmess', 'serverVmess', 'vmess'],
];

for (const [fileName, namespace, protocol] of protocols) {
    test(`${fileName} keeps its namespace and protocol endpoint`, async () => {
        const { model, requests } = await loadModel(fileName);
        const result = runEffect(model, 'update', { id: 7, key: 'show', value: 0 }, { code: 200 });
        assert.equal(model.namespace, namespace);
        assert.deepEqual(requests, [
            ['POST', `/admin-path/server/${protocol}/update`, { id: 7, show: 0 }],
        ]);
        assert.deepEqual(result.puts, [{ type: 'serverManage/getNodes' }]);
    });
}

test('protocol save brackets loading and refreshes only after success', async () => {
    const successful = await loadModel('serverVless');
    const successResult = runEffect(
        successful.model,
        'save',
        { params: { id: 4, name: 'edge' }, callback: true },
        { code: 200 },
    );
    assert.deepEqual(successful.requests, [
        ['POST', '/admin-path/server/vless/save', { id: 4, name: 'edge' }],
    ]);
    assert.deepEqual(successResult.puts, [
        { type: 'setState', payload: { saveLoading: true } },
        { type: 'setState', payload: { saveLoading: false } },
        { type: 'serverManage/getNodes' },
    ]);
    assert.equal(successResult.callbackCount, 1);

    const failed = await loadModel('serverVless');
    const failedResult = runEffect(
        failed.model,
        'save',
        { params: { id: 4 }, callback: true },
        { code: 422 },
    );
    assert.deepEqual(failedResult.puts, [
        { type: 'setState', payload: { saveLoading: true } },
        { type: 'setState', payload: { saveLoading: false } },
    ]);
    assert.equal(failedResult.callbackCount, 0);
});

test('server group fetch and save preserve loading and refresh behavior', async () => {
    const fetched = await loadModel('serverGroup');
    const groups = [{ id: 1, name: 'Default' }];
    const fetchResult = runEffect(fetched.model, 'fetch', {}, { code: 200, data: groups });
    assert.deepEqual(fetched.requests, [['GET', '/admin-path/server/group/fetch', undefined]]);
    assert.deepEqual(fetchResult.puts, [
        { type: 'setState', payload: { fetchLoading: true } },
        { type: 'setState', payload: { fetchLoading: false } },
        { type: 'setState', payload: { groups } },
    ]);

    const saved = await loadModel('serverGroup');
    const saveResult = runEffect(
        saved.model,
        'save',
        { params: { name: 'Premium' }, callback: true },
        { code: 200 },
    );
    assert.deepEqual(saveResult.puts, [{ type: 'fetch' }]);
    assert.equal(saveResult.callbackCount, 1);
});

test('server route failure does not refresh or call completion callback', async () => {
    const { model, requests } = await loadModel('serverRoute');
    const result = runEffect(
        model,
        'save',
        { params: { action: 'block', match: 'geoip:cn' }, callback: true },
        { code: 422 },
    );
    assert.deepEqual(requests, [
        ['POST', '/admin-path/server/route/save', { action: 'block', match: 'geoip:cn' }],
    ]);
    assert.deepEqual(result.puts, []);
    assert.equal(result.callbackCount, 0);
});

test('server manage sort keeps the original move algorithm', async () => {
    const { model } = await loadModel('serverManage');
    const servers = [
        { id: 1, type: 'vless' },
        { id: 2, type: 'vless' },
        { id: 3, type: 'trojan' },
    ];
    const result = runEffect(
        model,
        'sort',
        { fromIndex: 0, toIndex: 2 },
        { code: 200 },
        { serverManage: { servers, fetchLoading: false, sortMode: true } },
    );
    assert.deepEqual(result.puts, [
        {
            type: 'setState',
            payload: {
                servers: [
                    { id: 2, type: 'vless' },
                    { id: 3, type: 'trojan' },
                    { id: 1, type: 'vless' },
                ],
            },
        },
    ]);
});

test('server manage saveSort groups positions by protocol and id', async () => {
    const { model, requests } = await loadModel('serverManage');
    const servers = [
        { id: 8, type: 'vless' },
        { id: 3, type: 'trojan' },
        { id: 9, type: 'vless' },
    ];
    const result = runEffect(
        model,
        'saveSort',
        {},
        { code: 200 },
        { serverManage: { servers, fetchLoading: false, sortMode: true } },
    );
    assert.deepEqual(requests, [
        ['POST', '/admin-path/server/manage/sort', { vless: { 8: 0, 9: 2 }, trojan: { 3: 1 } }],
    ]);
    assert.deepEqual(result.puts, [
        { type: 'setState', payload: { fetchLoading: true } },
        { type: 'setState', payload: { fetchLoading: false } },
        { type: 'getNodes' },
    ]);
});
