// Differential evidence for the user frontend dva models: every effect runs
// against the original webpack module and the recovered TypeScript model.
// The user bundle shares many model modules with admin (coupon, knowledge,
// notice, order, stat, ticket, plan, user) but has unique models for
// passport, layout, comm, guest, invite, server, telegram, tutorial.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';

const userRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const MODULE_DIR = '/Users/infsr/Downloads/pro/projects/v2board-recovered-ui-archive/user/umi/modules';
const settings = { secure_path: '' };
const sandboxWindow = { settings, URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} } };
const document = { createElement: () => ({ style: {}, click() {}, appendChild() {} }) };

const OK = { code: 200, data: [], total: 0, buffer: 'fixture-csv' };

function createModelContext(responses = [OK]) {
    const trace = [];
    let requestCount = 0;
    const nextResponse = () => structuredClone(responses[Math.min(requestCount++, responses.length - 1)]);
    const message = {
        loading: (text) => trace.push(['message', 'loading', text]),
        success: (text) => trace.push(['message', 'success', text]),
        error: (text) => trace.push(['message', 'error', text]),
        destroy: () => trace.push(['message', 'destroy']),
        info: (text) => trace.push(['message', 'info', text]),
        warning: (text) => trace.push(['message', 'warning', text]),
    };
    message.a = message;
    const history = { push: (route) => trace.push(['navigate', route]) };
    history.a = history;
    const api = {
        get: (url, data) => { trace.push(['get', url, structuredClone(data ?? null)]); return Promise.resolve(nextResponse()); },
        post: (url, data) => { trace.push(['post', url, structuredClone(data ?? null)]); return Promise.resolve(nextResponse()); },
    };
    return { trace, responses, message, history, api };
}

function webpackRequire(context, extraModules = {}) {
    const siteHelpers = {
        getToken: () => 'fixture-token',
        setToken: () => { context.trace.push(['setToken']); },
        removeToken: () => { context.trace.push(['removeToken']); },
    };
    siteHelpers.a = siteHelpers;
    siteHelpers.p = siteHelpers.setToken;
    siteHelpers.h = siteHelpers.setToken;
    siteHelpers.r = (level, value) => { context.trace.push(['notify', level, value]); };
    siteHelpers.default = siteHelpers;
    Object.defineProperty(siteHelpers, '__esModule', { value: true });
    const modules = {
        p0pE: Object.assign,
        'wd/R': () => ({ format: () => '2026-01-02 03:04:05' }),
        tsqr: context.message,
        '3a4m': context.history,
        t3Un: { a: context.api.get, b: context.api.post },
        yWgo: siteHelpers,
        ...extraModules,
    };
    function require(id) {
        if (id in modules) return modules[id];
        const cssOnly = new Set(['miYZ', 'q3h4', '5Dmo', 'Pwec', 'OaEy', '14J3', 'jCWc', 'sRBo', 'g9YV', 'Awhp', 'lUTK', 'qVdP', '+BJd', '2qtc', '/zsF', '+L6B', 'H9LU', '3XVG', 'ykC2', 'v32e', 'lJCZ', 'wCAj', 'jsC+', 'BvKs', 'KrTs', 'CtXQ', 'mr32', 'Bl7J', 'kaz8', 'PArb', 'BMrR', 'kPKH', 'RFCh', 'Hg0r', '0Wa5', 'yWgo', 'GmDa', '3moC', 'mHNb', 'lETv', 'O8oq', 'e+9n', 'N9RS', 'ZlA7', 'hjwd', 'LMyI', 'lWxU', 'nPtr', 'wtDr', 'T4gb', 'eOCx', '6lKK', '1dD/', '0fn0', 'dX6P', 'wD64', 'Gk2u', 'mCd/', 'yiO6', 'hVla', 'Etx0', 'eZa/', 'axnf', '7tDr', '8Aft', '4Nfv', 'n54A', 'hlQx', 'wD64']);
        if (cssOnly.has(id)) return {};
        throw new Error(`Unexpected bundle dependency: ${id}`);
    }
    require.r = (e) => Object.defineProperty(e, '__esModule', { value: true });
    require.d = (e, n, g) => Object.defineProperty(e, n, { get: g, enumerable: true });
    require.n = (x) => {
        const g = x && x.__esModule ? () => x.default : () => x;
        Object.defineProperty(g, 'a', { get: g, enumerable: true });
        return g;
    };
    return require;
}

async function loadBundleModel(bundleFile, context) {
    const code = await fs.readFile(path.join(MODULE_DIR, bundleFile), 'utf8');
    const module = { exports: {} };
    const factory = vm.runInNewContext(
        `(function (module, exports, require) { return (${code})(module, exports, require); })`,
        { window: sandboxWindow, document, Blob: function (p, o) { this.parts = p; this.options = o; } },
    );
    factory(module, module.exports, webpackRequire(context));
    return module.exports.default;
}

async function loadRecoveredModel(modelFile, context) {
    const source = await fs.readFile(path.join(userRoot, 'src/models', modelFile), 'utf8');
    const { code } = await esbuildTransform(source, { format: 'cjs', loader: 'ts', target: 'es2018' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window: sandboxWindow,
        document,
        Blob: function (p, o) { this.parts = p; this.options = o; },
        require(id) {
            if (id === 'moment') return () => ({ format: () => '2026-01-02 03:04:05' });
            if (id === 'antd/lib/message') return context.message;
            if (id.endsWith('/apiClient')) return { get: context.api.get, post: context.api.post, isSuccessfulResponse: (r) => r.code === 200 };
            if (id.includes('/apiContracts')) return { isSuccessfulResponse: (r) => r.code === 200 };
            if (id.endsWith('/navigationService') || id.endsWith('/history')) return context.history;
            if (id.endsWith('/siteHelpers'))
                return {
                    getToken: () => 'fixture-token',
                    setToken: () => { context.trace.push(['setToken']); },
                    removeToken: () => { context.trace.push(['removeToken']); },
                    getPreference: () => 10,
                    setPreference: noop,
                };
            throw new Error(`Unexpected user model dependency: ${id}`);
        },
    });
    return module.exports.default;
}

const noop = () => {};

async function runEffect(model, effectName, action, state, context) {
    const effect = model.effects[effectName];
    if (!effect) throw new Error(`effect ${effectName} missing`);
    const api = {
        put: (a) => { context.trace.push(['put', structuredClone(a)]); return { put: true }; },
        select: (fn) => { context.trace.push(['select']); return fn(state); },
    };
    const withCallbacks = { ...action };
    if (!('callback' in withCallbacks)) withCallbacks.callback = () => context.trace.push(['callback']);
    if (!('complete' in withCallbacks)) withCallbacks.complete = (value) => context.trace.push(['complete', structuredClone(value)]);
    const iterator = effect(withCallbacks, api);
    let step = iterator.next();
    let count = 0;
    while (!step.done) {
        if (++count > 80) throw new Error('Effect failed to terminate');
        const value = step.value;
        if (value && typeof value.then === 'function') step = iterator.next(await value);
        else step = iterator.next(value);
    }
    context.trace.push(['state', structuredClone(model.state)]);
}

export async function compareUserModelEffect({ bundleFile, modelFile, action }) {
    const outcomes = {};
    for (const side of ['original', 'recovered']) {
        const context = createModelContext();
        const model = side === 'original'
            ? await loadBundleModel(bundleFile, context)
            : await loadRecoveredModel(modelFile, context);
        assert.ok(model.effects, `${side} ${modelFile} should have effects`);
        const effectNames = Object.keys(model.effects);
        const traces = [];
        const state = { [model.name ?? model.namespace]: structuredClone(model.state) };
        for (const effectName of effectNames) {
            const marker = context.trace.length;
            await runEffect(model, effectName, structuredClone(action ?? {}), state, context);
            traces.push({ effect: effectName, trace: structuredClone(context.trace.slice(marker)) });
        }
        outcomes[side] = { effectNames, traces };
        outcomes[`${side}State`] = structuredClone(model.state);
    }
    return outcomes;
}

const plain = (value) => JSON.parse(JSON.stringify(value));
export { plain };
