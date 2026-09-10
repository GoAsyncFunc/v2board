let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return Array.isArray ? Array.isArray(e) : "[object Array]" === v(e);
}
function i(e) {
  return "boolean" === typeof e;
}
function o(e) {
  return null === e;
}
function a(e) {
  return null == e;
}
function s(e) {
  return "number" === typeof e;
}
function l(e) {
  return "string" === typeof e;
}
function c(e) {
  return "symbol" === typeof e;
}
function u(e) {
  return void 0 === e;
}
function h(e) {
  return "[object RegExp]" === v(e);
}
function f(e) {
  return "object" === typeof e && null !== e;
}
function d(e) {
  return "[object Date]" === v(e);
}
function p(e) {
  return "[object Error]" === v(e) || e instanceof Error;
}
function m(e) {
  return "function" === typeof e;
}
function g(e) {
  return null === e || "boolean" === typeof e || "number" === typeof e || "string" === typeof e || "symbol" === typeof e || "undefined" === typeof e;
}
function v(e) {
  return Object.prototype.toString.call(e);
}
legacyExports.isArray = r, legacyExports.isBoolean = i, legacyExports.isNull = o, legacyExports.isNullOrUndefined = a, legacyExports.isNumber = s, legacyExports.isString = l, legacyExports.isSymbol = c, legacyExports.isUndefined = u, legacyExports.isRegExp = h, legacyExports.isObject = f, legacyExports.isDate = d, legacyExports.isError = p, legacyExports.isFunction = m, legacyExports.isPrimitive = g, legacyExports.isBuffer = require("./746a6c41.js").Buffer.isBuffer;
