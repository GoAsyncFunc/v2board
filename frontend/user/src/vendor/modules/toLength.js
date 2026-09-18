let legacyModule = module,
  legacyExports = exports;
var toInteger = require("./toInteger.js"),
  min = Math.min;
legacyModule.exports = function toLength(value) {
  return value > 0 ? min(toInteger(value), 9007199254740991) : 0;
};
