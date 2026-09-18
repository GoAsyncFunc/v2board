let legacyModule = module,
  legacyExports = exports;
var n = {}.toString;
legacyModule.exports = Array.isArray || function (e) {
  return "[object Array]" == n.call(e);
};
