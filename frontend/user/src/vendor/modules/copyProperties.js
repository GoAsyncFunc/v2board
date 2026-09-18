let legacyModule = module,
  legacyExports = exports;
var reactStaticPropertyNames = {
    childContextTypes: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  },
  functionPropertyNames = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  },
  defineProperty = Object.defineProperty,
  getOwnPropertyNames = Object.getOwnPropertyNames,
  getOwnPropertySymbols = Object.getOwnPropertySymbols,
  getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
  getPrototypeOf = Object.getPrototypeOf,
  objectPrototype = getPrototypeOf && getPrototypeOf(Object);
function copyProperties(target, source, excludedProperties) {
  if ("string" !== typeof source) {
    if (objectPrototype) {
      var parentPrototype = getPrototypeOf(source);
      parentPrototype && parentPrototype !== objectPrototype && copyProperties(target, parentPrototype, excludedProperties);
    }
    var propertyNames = getOwnPropertyNames(source);
    getOwnPropertySymbols && (propertyNames = propertyNames.concat(getOwnPropertySymbols(source)));
    for (var index = 0; index < propertyNames.length; ++index) {
      var propertyName = propertyNames[index];
      if (!reactStaticPropertyNames[propertyName] && !functionPropertyNames[propertyName] && (!excludedProperties || !excludedProperties[propertyName])) {
        var descriptor = getOwnPropertyDescriptor(source, propertyName);
        try {
          defineProperty(target, propertyName, descriptor);
        } catch (e) {}
      }
    }
    return e;
  }
  return e;
}
legacyModule.exports = f;
