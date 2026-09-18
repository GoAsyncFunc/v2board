let legacyModule = module,
  legacyExports = exports;
var toInteger = require("./toInteger.js"),
  requireObjectCoercible = require("./requireObjectCoercible.js");
legacyModule.exports = function repeatString(count) {
  var stringValue = String(requireObjectCoercible(this)),
    repeatedString = "",
    remainingCount = toInteger(count);
  if (remainingCount < 0 || remainingCount == 1 / 0) throw RangeError("Count can't be negative");
  for (; remainingCount > 0; (remainingCount >>>= 1) && (stringValue += stringValue)) 1 & remainingCount && (repeatedString += stringValue);
  return repeatedString;
};
