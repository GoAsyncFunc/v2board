let legacyModule = module,
  legacyExports = exports;
var sameValueZero = require("./sameValueZero.js"),
  isArrayLike = require("./isArrayLike.js"),
  isIndexWithinLength = require("./isIndexWithinLength.js"),
  isObject = require("./isObjectValue.js");
function isIterateeCall(value, index, object) {
  if (!isObject(object)) return !1;
  var indexType = typeof index;
  return !!("number" == indexType ? isArrayLike(object) && isIndexWithinLength(index, object.length) : "string" == indexType && index in object) && sameValueZero(object[index], value);
}
legacyModule.exports = isIterateeCall;
