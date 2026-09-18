let legacyModule = module,
  legacyExports = exports;
function defineEnumerableProperty(object, propertyKey, value) {
  return propertyKey in object ? Object.defineProperty(object, propertyKey, {
    value: value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : object[propertyKey] = value, object;
}
legacyModule.exports = defineEnumerableProperty;
