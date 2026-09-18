let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObjectValue.js"),
  isPrototype = require("./isPrototype.js"),
  nativeKeysIn = require("./keysIn.js"),
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty;
function baseKeys(object) {
  if (!isObject(object)) return nativeKeysIn(object);
  var isProto = isPrototype(object),
    result = [];
  for (var key in object) ("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key);
  return result;
}
legacyModule.exports = baseKeys;
