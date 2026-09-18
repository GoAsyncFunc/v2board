let legacyModule = module,
  legacyExports = exports;
var getTag = require("./objectTagRuntime.js"),
  getPrototypeOf = require("./getPrototypeOfLegacy.js"),
  isObjectLike = require("./isObjectLike.js"),
  objectTag = "[object Object]",
  functionPrototype = Function.prototype,
  objectPrototype = Object.prototype,
  functionToString = functionPrototype.toString,
  hasOwnProperty = objectPrototype.hasOwnProperty,
  objectConstructorString = functionToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != objectTag) return !1;
  var prototype = getPrototypeOf(value);
  if (null === prototype) return !0;
  var constructor = hasOwnProperty.call(prototype, "constructor") && prototype.constructor;
  return "function" == typeof constructor && constructor instanceof constructor && functionToString.call(constructor) == objectConstructorString;
}
legacyModule.exports = isPlainObject;
