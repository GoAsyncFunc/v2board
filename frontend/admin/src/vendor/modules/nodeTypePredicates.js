let legacyModule = module,
  legacyExports = exports;
function isArray(value) {
  return Array.isArray ? Array.isArray(value) : "[object Array]" === getTag(value);
}
function isBoolean(value) {
  return "boolean" === typeof value;
}
function isNull(value) {
  return null === value;
}
function isNullOrUndefined(value) {
  return null == value;
}
function isNumber(value) {
  return "number" === typeof value;
}
function isString(value) {
  return "string" === typeof value;
}
function isSymbol(value) {
  return "symbol" === typeof value;
}
function isUndefined(value) {
  return void 0 === value;
}
function isRegExp(value) {
  return "[object RegExp]" === getTag(value);
}
function isObject(value) {
  return "object" === typeof value && null !== value;
}
function isDate(value) {
  return "[object Date]" === getTag(value);
}
function isError(value) {
  return "[object Error]" === getTag(value) || value instanceof Error;
}
function isFunction(value) {
  return "function" === typeof value;
}
function isPrimitive(value) {
  return null === value || "boolean" === typeof value || "number" === typeof value || "string" === typeof value || "symbol" === typeof value || "undefined" === typeof value;
}
function getTag(value) {
  return Object.prototype.toString.call(value);
}
legacyExports.isArray = isArray, legacyExports.isBoolean = isBoolean, legacyExports.isNull = isNull, legacyExports.isNullOrUndefined = isNullOrUndefined, legacyExports.isNumber = isNumber, legacyExports.isString = isString, legacyExports.isSymbol = isSymbol, legacyExports.isUndefined = isUndefined, legacyExports.isRegExp = isRegExp, legacyExports.isObject = isObject, legacyExports.isDate = isDate, legacyExports.isError = isError, legacyExports.isFunction = isFunction, legacyExports.isPrimitive = isPrimitive, legacyExports.isBuffer = require("./bufferPolyfill.js").Buffer.isBuffer;
