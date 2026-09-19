export { default as loadable } from 'react-loadable';
export { default as MarkdownIt } from 'markdown-it';

export function resolveDefaultExport(module) {
  return module && Object.prototype.hasOwnProperty.call(module, 'default')
    ? module.default
    : module;
}

export function objectSpread(target, ...sources) {
  for (const source of sources) {
    if (source == null) continue;
    for (const key of Reflect.ownKeys(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, key)) {
        Object.defineProperty(target, key, {
          configurable: true,
          enumerable: true,
          value: source[key],
          writable: true,
        });
      }
    }
  }
  return target;
}

export const mergeProps = objectSpread;
export const assignProps = Object.assign;
