export type PluginCallback = (...args: never[]) => void;
export type PluginConfigurationValue =
    | string
    | number
    | boolean
    | symbol
    | bigint
    | null
    | undefined
    | PluginConfigurationValue[]
    | PluginConfiguration
    | PluginCallback;

export interface PluginConfiguration {
    [key: string]: PluginConfigurationValue;
}

export type PluginHandler<Value, Args = undefined> = (value: Value, args?: Args) => Value;
export type RuntimePlugin = Record<string, PluginConfigurationValue>;

interface PluginRuntimeOptions {
    validKeys?: string[];
}

interface ValueOptions<Value, Args = undefined> {
    initialValue: Value;
    args?: Args;
}

let plugins: RuntimePlugin[] | null = null;
let validKeys: string[] = [];

function assert(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(message);
}

function isPlainObject<Value>(value: Value): value is Value & PluginConfiguration {
    if (value === null || typeof value !== 'object') return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}

function pluginValues(key: string): PluginConfigurationValue[] {
    assert(validKeys.includes(key), `Invalid key ${key}`);
    return (plugins || []).filter((plugin) => key in plugin).map((plugin) => plugin[key]);
}

function pluginHandlers<Value, Args>(
    items: string | PluginHandler<Value, Args>[],
): PluginHandler<Value, Args>[] {
    const values = typeof items === 'string' ? pluginValues(items) : items;
    return values.map((value) => {
        assert(typeof value === 'function', 'applied item must be function');
        return value as PluginHandler<Value, Args>;
    });
}

export function init(options: PluginRuntimeOptions = {}): void {
    plugins = [];
    validKeys = options.validKeys || [];
}

export function use(plugin: RuntimePlugin): void {
    Object.keys(plugin).forEach((key) => {
        assert(validKeys.concat('default').includes(key), `Invalid key ${key} from plugin`);
    });
    if (!plugins) init();
    plugins?.push(plugin);
}

export function getItem(key: string): PluginConfigurationValue[] {
    if (!plugins) init();
    return pluginValues(key);
}

export function compose<Value>(
    items: string | PluginHandler<Value>[],
    { initialValue }: ValueOptions<Value>,
): Value {
    const handlers = pluginHandlers(items);
    if (handlers.length === 1) return handlers[0] as Value;
    return handlers.reduceRight<Value>((next, current) => current(next), initialValue);
}

export function apply<Value, Args = undefined>(
    items: string | PluginHandler<Value, Args>[],
    { initialValue, args }: ValueOptions<Value, Args>,
): Value {
    return pluginHandlers(items).reduce((value, current) => current(value, args), initialValue);
}

export function applyForEach<Value>(
    items: string | PluginHandler<Value>[],
    { initialValue }: ValueOptions<Value>,
): void {
    pluginHandlers(items).forEach((current) => current(initialValue));
}

export function mergeConfig<Config = PluginConfiguration>(items: string | Config[]): Config {
    const configs = typeof items === 'string' ? pluginValues(items) : items;
    return configs.reduce<Config>((result, config) => {
        assert(isPlainObject(config), 'Config is not plain object');
        return Object.assign({}, result, config) as Config;
    }, {} as Config);
}

export async function mergeConfigAsync<Config = PluginConfiguration>(
    items: string | Array<Config | Promise<Config>>,
): Promise<Config> {
    const configs = typeof items === 'string' ? pluginValues(items) : items;
    const resolved = await Promise.all(configs);
    return resolved.reduce<Config>((result, config) => {
        assert(isPlainObject(config), 'Config is not plain object');
        return Object.assign({}, result, config) as Config;
    }, {} as Config);
}
