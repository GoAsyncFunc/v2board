export type PluginValue = object | string | number | boolean | symbol | bigint | null | undefined;
export type PluginHandler<Value extends PluginValue = PluginValue, Args extends PluginValue = PluginValue> = (
  value: Value,
  args?: Args,
) => Value;
export type RuntimePlugin = Record<string, PluginValue>;

interface PluginRuntimeOptions {
  validKeys?: string[];
}

interface ValueOptions<Value extends PluginValue, Args extends PluginValue = undefined> {
  initialValue: Value;
  args?: Args;
}

let plugins: RuntimePlugin[] | null = null;
let validKeys: string[] = [];

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function isPlainObject(value: PluginValue): value is RuntimePlugin {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function pluginValues(key: string): PluginValue[] {
  assert(validKeys.includes(key), `Invalid key ${key}`);
  return (plugins || []).filter(plugin => key in plugin).map(plugin => plugin[key]);
}

function pluginHandlers<Value extends PluginValue, Args extends PluginValue>(
  items: string | PluginHandler<Value, Args>[],
): PluginHandler<Value, Args>[] {
  const values = typeof items === 'string' ? pluginValues(items) : items;
  return values.map(value => {
    assert(typeof value === 'function', 'applied item must be function');
    return value as PluginHandler<Value, Args>;
  });
}

export function init(options: PluginRuntimeOptions = {}): void {
  plugins = [];
  validKeys = options.validKeys || [];
}

export function use(plugin: RuntimePlugin): void {
  Object.keys(plugin).forEach(key => {
    assert(validKeys.concat('default').includes(key), `Invalid key ${key} from plugin`);
  });
  if (!plugins) init();
  plugins?.push(plugin);
}

export function getItem(key: string): PluginValue[] {
  if (!plugins) init();
  return pluginValues(key);
}

export function compose<Value extends PluginValue>(
  items: string | PluginHandler<Value>[],
  { initialValue }: ValueOptions<Value>,
): Value {
  const handlers = pluginHandlers(items);
  if (handlers.length === 1) return handlers[0] as Value;
  return handlers.reduceRight<Value>((next, current) => current(next), initialValue);
}

export function apply<Value extends PluginValue, Args extends PluginValue = undefined>(
  items: string | PluginHandler<Value, Args>[],
  { initialValue, args }: ValueOptions<Value, Args>,
): Value {
  return pluginHandlers(items).reduce((value, current) => current(value, args), initialValue);
}

export function applyForEach<Value extends PluginValue>(
  items: string | PluginHandler<Value>[],
  { initialValue }: ValueOptions<Value>,
): void {
  pluginHandlers(items).forEach(current => current(initialValue));
}

export function mergeConfig<Config extends RuntimePlugin = RuntimePlugin>(
  items: string | Config[],
): Config {
  const configs = typeof items === 'string' ? pluginValues(items) : items;
  return configs.reduce<Config>((result, config) => {
    assert(isPlainObject(config), 'Config is not plain object');
    return { ...result, ...config };
  }, {} as Config);
}

export async function mergeConfigAsync<Config extends RuntimePlugin = RuntimePlugin>(
  items: string | Array<Config | Promise<Config>>,
): Promise<Config> {
  const configs = typeof items === 'string' ? pluginValues(items) : items;
  const resolved = await Promise.all(configs);
  return resolved.reduce<Config>((result, config) => {
    assert(isPlainObject(config), 'Config is not plain object');
    return { ...result, ...config };
  }, {} as Config);
}
