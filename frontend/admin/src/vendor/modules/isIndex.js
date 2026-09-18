let legacyModule = module,
  legacyExports = exports;
var maxSafeInteger = 9007199254740991;
function isIndex(value) {
  return "number" == typeof value && value > -1 && value % 1 == 0 && value <= maxSafeInteger;
}
legacyModule.exports = isIndex;
