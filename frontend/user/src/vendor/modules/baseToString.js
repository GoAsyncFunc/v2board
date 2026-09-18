let legacyModule = module,
  legacyExports = exports;
var nativeSymbol = require("./nativeSymbol.js"),
  arrayMap = require("./arrayMap.js"),
  isArray = require("./isArray.js"),
  isSymbol = require("./isSymbol.js"),
  infinity = 1 / 0,
  symbolPrototype = nativeSymbol ? nativeSymbol.prototype : void 0,
  symbolToString = symbolPrototype ? symbolPrototype.toString : void 0;
function baseToString(value) {
  if ("string" == typeof value) return value;
  if (isArray(value)) return arrayMap(value, baseToString) + "";
  if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
  var stringValue = value + "";
  return "0" == stringValue && 1 / value == -infinity ? "-0" : stringValue;
}
legacyModule.exports = baseToString;
