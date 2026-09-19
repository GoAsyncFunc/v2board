let plugins = null;
let validKeys = [];

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const isPlainObject = value => {
    if (value === null || typeof value !== "object") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

const pluginValues = key => {
    assert(validKeys.includes(key), `Invalid key ${key}`);
    return plugins.filter(plugin => key in plugin).map(plugin => plugin[key]);
};

export function init(options = {}) {
    plugins = [];
    validKeys = options.validKeys || [];
}

export function use(plugin) {
    Object.keys(plugin).forEach(key => {
        assert(validKeys.concat("default").includes(key), `Invalid key ${key} from plugin`);
    });
    if (!plugins) init();
    plugins.push(plugin);
}

export function getItem(key) {
    if (!plugins) init();
    return pluginValues(key);
}

export function compose(items, { initialValue } = {}) {
    const functions = typeof items === "string" ? pluginValues(items) : items;
    if (functions.length === 1) return functions[0];
    return functions.reduceRight((next, current) => value => current(value), initialValue);
}

export function apply(items, { initialValue, args } = {}) {
    const functions = typeof items === "string" ? pluginValues(items) : items;
    assert(Array.isArray(functions), "item must be Array");
    return functions.reduce((value, current) => {
        assert(typeof current === "function", "applied item must be function");
        return current(value, args);
    }, initialValue);
}

export function applyForEach(items, { initialValue } = {}) {
    const functions = typeof items === "string" ? pluginValues(items) : items;
    assert(Array.isArray(functions), "item must be Array");
    functions.forEach(current => {
        assert(typeof current === "function", "applied item must be function");
        current(initialValue);
    });
}

export function mergeConfig(items) {
    const configs = typeof items === "string" ? pluginValues(items) : items;
    assert(Array.isArray(configs), "item must be Array");
    return configs.reduce((result, config) => {
        assert(isPlainObject(config), "Config is not plain object");
        return { ...result, ...config };
    }, {});
}

export async function mergeConfigAsync(items) {
    const configs = typeof items === "string" ? pluginValues(items) : items;
    assert(Array.isArray(configs), "item must be Array");
    const resolved = await Promise.all(configs);
    return resolved.reduce((result, config) => {
        assert(isPlainObject(config), "Config is not plain object");
        return { ...result, ...config };
    }, {});
}
