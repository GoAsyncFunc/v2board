let legacyModule = module,
  legacyExports = exports;
var objectToString = {}.toString;
legacyModule.exports = function getRawClassName(value) {
  return objectToString.call(value).slice(8, -1);
};
