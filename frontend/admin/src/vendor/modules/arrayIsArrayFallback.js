let legacyModule = module,
  legacyExports = exports;
var objectToString = {}.toString;
legacyModule.exports = Array.isArray || function isArray(value) {
  return "[object Array]" == objectToString.call(value);
};
