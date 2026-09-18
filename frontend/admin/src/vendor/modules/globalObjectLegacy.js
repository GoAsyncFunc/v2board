let legacyModule = module,
  legacyExports = exports;
var n;
n = function () {
  return this;
}();
try {
  n = n || new Function("return this")();
} catch (e) {
  "object" === typeof window && (n = window);
}
legacyModule.exports = n;
