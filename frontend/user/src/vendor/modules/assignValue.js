let legacyModule = module,
  legacyExports = exports;
var baseAssignValue = require("./baseAssignValue.js"),
  sameValueZero = require("./sameValueZero.js");
function assignValue(object, key, value) {
  (void 0 === value || sameValueZero(object[key], value)) && (void 0 !== value || key in object) || baseAssignValue(object, key, value);
}
legacyModule.exports = assignValue;
