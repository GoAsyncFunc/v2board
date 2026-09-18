let legacyModule = module,
  legacyExports = exports;
function typeOf(value) {
  "@babel/helpers - typeof";

  return legacyModule.exports = typeOf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (value) {
    return typeof value;
  } : function (value) {
    return value && "function" == typeof Symbol && value.constructor === Symbol && value !== Symbol.prototype ? "symbol" : typeof value;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports, typeOf(value);
}
legacyModule.exports = typeOf, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
