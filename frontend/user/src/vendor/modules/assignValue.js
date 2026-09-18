let legacyModule = module,
  legacyExports = exports;
var baseAssignValue = require("./baseAssignValue.js"),
  sameValueZero = require("./sameValueZero.js"),
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty;
function assignValue(object, key, value) {
  var currentValue = object[key];
  hasOwnProperty.call(object, key) && sameValueZero(currentValue, value) && (void 0 !== value || key in object) || baseAssignValue(object, key, value);
}
legacyModule.exports = assignValue;
