let legacyModule = module,
  legacyExports = exports;
var isSymbol = require("./isSymbol.js"),
  infinity = 1 / 0;
function toKey(value) {
  if ("string" == typeof value || isSymbol(value)) return value;
  var stringValue = value + "";
  return "0" == stringValue && 1 / value == -infinity ? "-0" : stringValue;
}
legacyModule.exports = toKey;
