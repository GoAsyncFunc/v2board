var getTag = require("./getTag.js"),
  getPrototype = require("./getPrototypeOf.js"),
  isObjectLike = require("./isObjectLikeLegacy.js"),
  objectTag = "[object Object]",
  functionToString = Function.prototype.toString,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  objectConstructorSource = functionToString.call(Object);

function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != objectTag) return !1;
  var prototype = getPrototype(value);
  if (null === prototype) return !0;
  var constructor = hasOwnProperty.call(prototype, "constructor") && prototype.constructor;
  return "function" == typeof constructor && constructor instanceof constructor && functionToString.call(constructor) == objectConstructorSource;
}

module.exports = isPlainObject;
