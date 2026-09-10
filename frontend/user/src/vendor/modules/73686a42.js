let legacyModule = module,
  legacyExports = exports;
var n = 9007199254740991;
function r(e) {
  return "number" == typeof e && e > -1 && e % 1 == 0 && e <= n;
}
legacyModule.exports = r;
