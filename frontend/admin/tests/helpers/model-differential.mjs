// Generic dual-mode model runner: executes each dva effect against the
// original webpack module and the recovered TypeScript model, comparing the
// traced side effects (select/put/request/message/navigate/callback).
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';

const home = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const MODULE_DIR =
    '/Users/infsr/Downloads/pro/projects/v2board-recovered-ui-archive/admin/umi/modules';
const settings = { secure_path: 'admin' };
const sandboxWindow = { settings, URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} } };
const document = { createElement: () => ({ click: () => {}, style: {} }) };

// Precompiled once; the recovered theme/payment models read these constants.
const adminSettingsModule = { exports: {} };

const OK = { code: 200, data: [], total: 0, buffer: 'fixture-csv' };

const React = {
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
    Fragment: 'Fragment',
};
// MailTestResult is preloaded once; its notification calls are delegated to
// whichever model context is currently running.
let activeModelContext = undefined;
const NOTIFICATION_METHODS = ['loading', 'success', 'error', 'destroy', 'info', 'warning'];
function makeLazyNotificationSink(sinkName) {
    return new Proxy(
        {},
        {
            get: (_target, prop) => {
                if (typeof prop !== 'string' || !NOTIFICATION_METHODS.includes(prop))
                    return undefined;
                return (...args) => {
                    if (!activeModelContext)
                        throw new Error(`lazy ${sinkName}: no active model context`);
                    return activeModelContext[sinkName][prop](...args);
                };
            },
        },
    );
}
const lazyMessage = makeLazyNotificationSink('message');
const lazyModal = makeLazyNotificationSink('modal');
const mailTestResultModule = { exports: {} };
const mailTestResultCode = await esbuildTransform(
    await fs.readFile(
        path.join(home, 'src/pages/config/system/components/MailTestResult.tsx'),
        'utf8',
    ),
    { format: 'cjs', loader: 'tsx' },
);
vm.runInNewContext(mailTestResultCode.code, {
    module: mailTestResultModule,
    exports: mailTestResultModule.exports,
    window: sandboxWindow,
    console: { log() {} },
    require(id) {
        if (id === 'react') return React;
        if (id === 'antd/lib/message') return lazyMessage;
        if (id === 'antd/lib/modal') return lazyModal;
        throw new Error(`Unexpected MailTestResult dependency: ${id}`);
    },
});

const adminSettingsCode = await esbuildTransform(
    await fs.readFile(path.join(home, 'src/config/adminSettings.ts'), 'utf8'),
    { format: 'cjs', loader: 'ts' },
);
vm.runInNewContext(adminSettingsCode.code, {
    module: adminSettingsModule,
    exports: adminSettingsModule.exports,
    window: sandboxWindow,
    require() {
        return {};
    },
});

// Trace payloads may carry React elements with function props; JSON keeps
// them representable for the deep-equal comparison.
const safeClone = (value) =>
    JSON.parse(
        JSON.stringify(value, (_key, child) =>
            typeof child === 'function' ? '[function]' : child,
        ),
    );

export function createModelContext(responses = [OK]) {
    const trace = [];
    const console2 = { log: (...args) => trace.push(['console', ...safeClone(args)]) };
    let requestCount = 0;
    const nextResponse = () => safeClone(responses[Math.min(requestCount++, responses.length - 1)]);
    const message = {
        loading: (text) => trace.push(['message', 'loading', text]),
        success: (text) => trace.push(['message', 'success', text]),
        error: (text) => trace.push(['message', 'error', text]),
        destroy: () => trace.push(['message', 'destroy']),
    };
    const modal = {
        error: (options) => trace.push(['modal', 'error', safeClone(options)]),
        success: (options) => trace.push(['modal', 'success', safeClone(options)]),
        info: (options) => trace.push(['modal', 'info', safeClone(options)]),
        warning: (options) => trace.push(['modal', 'warning', safeClone(options)]),
    };
    // The bundle accesses message/history/modal through their `.a` aliases.
    message.a = message;
    modal.a = modal;
    const history = { push: (route) => trace.push(['navigate', route]) };
    history.a = history;
    const api = {
        get: (url, data) => {
            trace.push(['get', url, safeClone(data ?? null)]);
            return Promise.resolve(nextResponse());
        },
        post: (url, data) => {
            trace.push(['post', url, safeClone(data ?? null)]);
            return Promise.resolve(nextResponse());
        },
    };
    return { trace, responses, message, history, api, modal, console: console2 };
}

function webpackRequire(context, extraModules = {}) {
    const modules = {
        p0pE: Object.assign,
        'wd/R': () => ({ format: () => '2026-01-02 03:04:05' }),
        tsqr: context.message,
        '3a4m': context.history,
        t3Un: { a: context.api.get, b: context.api.post },
        // The bundle builds the mail-test notification content through React.
        q1tI: {
            __esModule: true,
            default: {
                createElement: (type, props, ...children) => ({
                    type,
                    props: props || {},
                    children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
                }),
                Fragment: 'Fragment',
            },
        },
        // Modal (kLXV) carries error/success notifications in the config model.
        kLXV: context.modal,
        ...extraModules,
    };
    const cache = new Map();
    function require(id) {
        if (id in modules) return modules[id];
        if (cache.has(id)) return cache.get(id);
        // CSS-only side-effect imports from the bundle carry no runtime exports.
        const cssOnly = new Set([
            'miYZ',
            'q3h4',
            '5Dmo',
            'Pwec',
            'OaEy',
            '14J3',
            'jCWc',
            'sRBo',
            'g9YV',
            'Awhp',
            'lUTK',
            'qVdP',
            '+BJd',
            '2qtc',
            '/zsF',
            '+L6B',
            'H9LU',
            '3XVG',
            'ykC2',
            'v32e',
            'lJCZ',
            'wCAj',
            'jsC+',
            'BvKs',
            'KrTs',
            'CtXQ',
            'mr32',
            'Bl7J',
            'kaz8',
            'PArb',
            'BMrR',
            'kPKH',
            'RFCh',
            'Hg0r',
            '0Wa5',
            'yWgo',
            'GmDa',
            '3moC',
            'mHNb',
            'lETv',
            'O8oq',
            'e+9n',
            'N9RS',
            'ZlA7',
            'hjwd',
            'LMyI',
            'lWxU',
            'nPtr',
            'wtDr',
            'T4gb',
            'eOCx',
            '6lKK',
            '1dD/',
            '0fn0',
            'dX6P',
            'wD64',
            'Gk2u',
            'mCd/',
            'yiO6',
            'hVla',
        ]);
        if (cssOnly.has(id)) {
            cache.set(id, {});
            return {};
        }
        // The shared admin settings constants bundle (module tI4l).
        if (id === 'tI4l') {
            const exports = loadBundleModuleRaw('7449346c.js', context, require);
            cache.set(id, exports);
            return exports;
        }
        throw new Error(`Unexpected bundle dependency: ${id}`);
    }
    require.r = (exports) => Object.defineProperty(exports, '__esModule', { value: true });
    require.d = (exports, name, getter) =>
        Object.defineProperty(exports, name, { get: getter, enumerable: true });
    require.n = (mod) => {
        // Mirrors webpack: the returned getter carries an `a` accessor that
        // evaluates the getter itself, so `l.a` yields module.default for
        // __esModule modules and the module otherwise.
        const getter = mod && mod.__esModule ? () => mod.default : () => mod;
        Object.defineProperty(getter, 'a', { get: getter, enumerable: true });
        return getter;
    };
    return require;
}

// Loads a bundle module (used lazily so shared modules like the settings
// constants resolve through the same webpack runtime).
async function loadBundleModuleRaw(bundleFile, context, requireFn) {
    const code = await fs.readFile(path.join(MODULE_DIR, bundleFile), 'utf8');
    const module = { exports: {} };
    const factory = vm.runInNewContext(
        `(function (module, exports, require) { return (${code})(module, exports, require); })`,
        {
            window: sandboxWindow,
            document,
            Blob: function Blob(parts, options) {
                this.parts = parts;
                this.options = options;
            },
        },
    );
    factory(module, module.exports, requireFn);
    return module.exports;
}

export async function loadBundleModel(bundleFile, context, extraModules = {}) {
    const code = await fs.readFile(path.join(MODULE_DIR, bundleFile), 'utf8');
    const module = { exports: {} };
    const factory = vm.runInNewContext(
        `(function (module, exports, require) { return (${code})(module, exports, require); })`,
        {
            window: sandboxWindow,
            document,
            console: context.console,
            Blob: function Blob(parts, options) {
                this.parts = parts;
                this.options = options;
            },
        },
    );
    factory(module, module.exports, webpackRequire(context, extraModules));
    return module.exports.default;
}

// The recovered models read sibling namespaces through select(); provide the
// namespaces the bundle pages rely on so both sides see the same state.
const SHARED_STATE = {
    user: { users: [], user: {}, filter: [], pagination: { current: 1, pageSize: 10 } },
    plan: { plans: [] },
    serverGroup: { groups: [] },
    config: {},
    stat: {},
    ticket: { tickets: [] },
};

export async function loadRecoveredModel(modelFile, context, exportName) {
    const source = await fs.readFile(path.join(home, 'src/models', modelFile), 'utf8');
    const { code } = await esbuildTransform(source, {
        format: 'cjs',
        loader: 'ts',
        target: 'es2018',
    });
    const module = { exports: {} };
    let loaded = false;
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window: sandboxWindow,
        document,
        console: context.console,
        Blob: function Blob(parts, options) {
            this.parts = parts;
            this.options = options;
        },
        require(id) {
            if (id === 'moment') return () => ({ format: () => '2026-01-02 03:04:05' });
            if (id === 'antd/lib/message') return context.message;
            if (id.endsWith('/apiClient')) {
                return {
                    get: context.api.get,
                    post: context.api.post,
                    isSuccessfulResponse: (response) => response.code === 200,
                };
            }
            if (id.includes('/apiContracts') || id.includes('types/apiContracts'))
                return { isSuccessfulResponse: (response) => response.code === 200 };
            if (id.endsWith('/navigationService')) return context.history;
            if (id.endsWith('/csvDownloadService'))
                return {
                    downloadCsv: (buffer, name) => {
                        context.trace.push(['download', safeClone(buffer), name]);
                    },
                };
            if (id.endsWith('/adminSettings')) return adminSettingsModule.exports;
            if (id.endsWith('/MailTestResult')) return mailTestResultModule.exports;
            if (id.endsWith('/siteHelpers'))
                return {
                    getToken: () => 'fixture-token',
                    setToken: () => {},
                    getPreference: () => 10,
                    setPreference: () => {},
                };
            if (id.endsWith('/clipboardService')) return { copyToClipboard: () => {} };
            throw new Error(`Unexpected model dependency: ${id}`);
        },
    });
    const target = exportName ? module.exports[exportName] : module.exports.default;
    return target;
}

export async function runEffect(model, effectName, action, state, context) {
    const effect = model.effects[effectName];
    if (!effect) throw new Error(`effect ${effectName} missing`);
    const mergedState = { ...SHARED_STATE, ...state };
    const api = {
        put: (action2) => {
            context.trace.push(['put', safeClone(action2)]);
            return { put: true };
        },
        select: (fn) => {
            context.trace.push(['select']);
            return fn(mergedState);
        },
    };
    const withCallbacks = { ...action };
    if (!('callback' in withCallbacks))
        withCallbacks.callback = () => context.trace.push(['callback']);
    if (!('complete' in withCallbacks))
        withCallbacks.complete = (value) => context.trace.push(['complete', safeClone(value)]);
    const iterator = effect(withCallbacks, api);
    let step = iterator.next();
    let count = 0;
    while (!step.done) {
        if (++count > 80) throw new Error('Effect failed to terminate');
        const value = step.value;
        if (value && typeof value.then === 'function') {
            step = iterator.next(await value);
        } else {
            // Select executes synchronously and yields its result; passing the
            // yielded value back mirrors what redux-saga does for it. Put
            // yields ignore the resumed value.
            step = iterator.next(value);
        }
    }
    context.trace.push(['state', safeClone(model.state)]);
}

export async function compareModelEffect(modelName, { bundleFile, modelFile, state, effects }) {
    const outcomes = {};
    for (const side of ['original', 'recovered']) {
        const context = createModelContext();
        const model =
            side === 'original'
                ? await loadBundleModel(bundleFile, context)
                : await loadRecoveredModel(modelFile, context);
        for (const [effectName, action] of Object.entries(effects ?? {})) {
            const marker = context.trace.length;
            await runEffect(model, effectName, safeClone(action ?? {}), state, context);
            outcomes[side] = outcomes[side] ?? [];
            outcomes[side].push({ effect: effectName, trace: context.trace.slice(marker) });
        }
        outcomes[`${side}State`] = safeClone(model.state);
    }
    return outcomes;
}

// Loads both sides, enumerates the original effect set, runs each effect with
// the same action on both sides, and returns the traces plus key sets.
export async function compareAllModelEffects({ bundleFile, modelFile, action, exportName }) {
    const bundleContext = createModelContext();
    const original = await loadBundleModel(bundleFile, bundleContext);
    activeModelContext = bundleContext;
    const recoveredContext = createModelContext();
    const recovered = await loadRecoveredModel(modelFile, recoveredContext, exportName);
    activeModelContext = recoveredContext;

    assert.deepEqual(Object.keys(recovered.effects), Object.keys(original.effects));
    // The bundle's bootstrap injects `namespace` around models that carry
    // `name`; the recovered models declare `namespace` directly.
    assert.equal(recovered.namespace, original.name);

    const state = { [original.name]: safeClone(original.state) };
    const traces = [];
    for (const effectName of Object.keys(original.effects)) {
        const bundleTrace = [];
        const recoveredTrace = [];
        for (const [side, model, context, sink] of [
            ['original', original, bundleContext, bundleTrace],
            ['recovered', recovered, recoveredContext, recoveredTrace],
        ]) {
            void side;
            const marker = context.trace.length;
            await runEffect(model, effectName, safeClone(action), state, context);
            sink.push(...safeClone(context.trace.slice(marker)));
        }
        traces.push({ effect: effectName, original: bundleTrace, recovered: recoveredTrace });
    }
    return {
        traces,
        originalState: safeClone(original.state),
        recoveredState: safeClone(recovered.state),
    };
}
