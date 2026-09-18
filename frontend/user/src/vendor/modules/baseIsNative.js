var isFunction = require("./isFunction.js"),
  isMasked = require("./isMasked.js"),
  isObject = require("./isObjectValue.js"),
  toSource = require("./sourceFunctionToString.js"),
  regexpCharPattern = /[\\^$.*+?()[\]{}|]/g,
  hostConstructorPattern = /^\[object .+?Constructor\]$/,
  functionToString = Function.prototype.toString,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  nativeFunctionPattern = RegExp("^" + functionToString.call(hasOwnProperty).replace(regexpCharPattern, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) return !1;
  var pattern = isFunction(value) ? nativeFunctionPattern : hostConstructorPattern;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;
