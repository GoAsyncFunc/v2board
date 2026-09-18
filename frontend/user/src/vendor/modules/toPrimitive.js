let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObject.js");
legacyModule.exports = function toPrimitive(value, preferString) {
  if (!isObject(value)) return value;
  var method, result;
  if (preferString && "function" == typeof (method = value.toString) && !isObject(result = method.call(value))) return result;
  if ("function" == typeof (method = value.valueOf) && !isObject(result = method.call(value))) return result;
  if (!preferString && "function" == typeof (method = value.toString) && !isObject(result = method.call(value))) return result;
  throw TypeError("Can't convert object to primitive value");
};
