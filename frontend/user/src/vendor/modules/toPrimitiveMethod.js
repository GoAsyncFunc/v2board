let legacyModule = module,
  legacyExports = exports;
var assertObject = require("./assertObject.js"),
  toPrimitive = require("./toPrimitive.js"),
  numberHint = "number";
legacyModule.exports = function toPrimitiveMethod(hint) {
  if ("string" !== hint && hint !== numberHint && "default" !== hint) throw TypeError("Incorrect hint");
  return toPrimitive(assertObject(this), hint != numberHint);
};
