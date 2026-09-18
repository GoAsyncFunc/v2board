let legacyModule = module,
  legacyExports = exports;
var trimStart = require("./trimStart.js"),
  isObject = require("./isObjectValue.js"),
  isSymbol = require("./isSymbol.js"),
  nan = NaN,
  binaryPattern = /^[-+]0x[0-9a-f]+$/i,
  binaryPrefix = /^0b[01]+$/i,
  octalPrefix = /^0o[0-7]+$/i,
  parseInteger = parseInt;
function toNumber(value) {
  if ("number" == typeof value) return value;
  if (isSymbol(value)) return nan;
  if (isObject(value)) {
    var primitiveValue = "function" == typeof value.valueOf ? value.valueOf() : value;
    value = isObject(primitiveValue) ? primitiveValue + "" : primitiveValue;
  }
  if ("string" != typeof value) return 0 === value ? value : +value;
  value = trimStart(value);
  var isBinary = binaryPrefix.test(value);
  return isBinary || octalPrefix.test(value) ? parseInteger(value.slice(2), isBinary ? 2 : 8) : binaryPattern.test(value) ? nan : +value;
}
legacyModule.exports = toNumber;
