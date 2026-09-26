import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const copy = (value) => structuredClone(value);

async function loadModel(name) {
    const modelFileNames = {
        dashboardStatistics: 'dashboardStatisticsModel',
        system: 'queueMonitoringModel',
    };
    const result = await build({
        absWorkingDir: appRoot,
        entryPoints: [`src/models/${modelFileNames[name] || name}.ts`],
        bundle: true,
        write: false,
        platform: 'node',
        format: 'cjs',
        logLevel: 'silent',
        plugins: [
            {
                name: 'request-mock',
                setup(builder) {
                    builder.onResolve({ filter: /services\/apiClient$/ }, () => ({
                        path: 'request',
                        namespace: 'test',
                    }));
                    builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({
                        loader: 'js',
                        contents: `exports.get = url => globalThis.recordRequest(url);exports.isSuccessfulResponse=response=>response.code===200;`,
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
        recordRequest(url) {
            requests.push(url);
            return { request: true };
        },
    };
    context.exports = context.module.exports;
    vm.runInNewContext(result.outputFiles[0].text, context);
    return { model: context.module.exports.default, requests };
}

function runEffect(model, effect, response) {
    const puts = [];
    const completed = [];
    const iterator = model.effects[effect](
        { complete: (data) => completed.push(copy(data)) },
        {
            put(action) {
                puts.push(copy(action));
                return { put: true };
            },
        },
    );
    let step = iterator.next();
    while (!step.done) step = iterator.next(step.value?.request ? copy(response) : step.value);
    return { puts, completed };
}

test('dashboard statistics model uses semantic endpoints and only completes successful requests', async () => {
    const effects = [
        'getOrder',
        'getServerLastRank',
        'getServerTodayRank',
        'getUserTodayRank',
        'getUserLastRank',
    ];
    for (const effect of effects) {
        const successful = await loadModel('dashboardStatistics');
        const data = [{ total: 3 }];
        const result = runEffect(successful.model, effect, { code: 200, data });
        assert.equal(successful.requests[0], `/admin-path/stat/${effect}`);
        assert.deepEqual(result.completed, [data]);

        const failed = await loadModel('dashboardStatistics');
        assert.deepEqual(runEffect(failed.model, effect, { code: 422, data }).completed, []);
    }
});

test('dashboard statistics override stores dashboard totals after success', async () => {
    const { model, requests } = await loadModel('dashboardStatistics');
    const data = { online_user: 4, day_income: 1200 };
    const result = runEffect(model, 'getOverride', { code: 200, data });
    assert.deepEqual(requests, ['/admin-path/stat/getOverride']);
    assert.deepEqual(result.puts, [{ type: 'save', payload: data }]);
});

test('system queue effects bracket loading and store successful responses', async () => {
    for (const [effect, stateKey, loadingKey] of [
        ['getQueueStats', 'queueStats', 'getQueueStatsLoading'],
        ['getQueueWorkload', 'queueWorkload', 'getQueueWorkloadLoading'],
    ]) {
        const { model, requests } = await loadModel('system');
        const data = [{ name: 'emails' }];
        const result = runEffect(model, effect, { code: 200, data });
        assert.deepEqual(requests, [`/admin-path/system/${effect}`]);
        assert.deepEqual(result.puts, [
            { type: 'save', payload: { [loadingKey]: true } },
            { type: 'save', payload: { [loadingKey]: false } },
            { type: 'save', payload: { [stateKey]: data } },
        ]);
    }
});
