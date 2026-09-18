let legacyModule = module,
  legacyExports = exports;
function assignProperties() {
  return legacyModule.exports = assignProperties = Object.assign || function assignPropertiesFallback(target) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
      var source = arguments[sourceIndex];
      for (var propertyName in source) Object.prototype.hasOwnProperty.call(source, propertyName) && (target[propertyName] = source[propertyName]);
    }
    return target;
  }, assignProperties.apply(this, arguments);
}
legacyModule.exports = assignProperties;
