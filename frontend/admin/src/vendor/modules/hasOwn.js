let legacyModule = module,
  legacyExports = exports;
var hasOwnProperty = {}.hasOwnProperty;
legacyModule.exports = function hasOwn(object, propertyName) {
  return hasOwnProperty.call(object, propertyName);
};
