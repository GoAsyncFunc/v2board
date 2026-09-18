let legacyModule = module,
  legacyExports = exports;
var toInteger = require("./toInteger.js"),
  toLength = require("./toLength.js");
legacyModule.exports = function validateTypedArrayLength(value) {
  if (void 0 === value) return 0;
  var integerValue = toInteger(value),
    length = toLength(integerValue);
  if (integerValue !== length) throw RangeError("Wrong length!");
  return length;
};
