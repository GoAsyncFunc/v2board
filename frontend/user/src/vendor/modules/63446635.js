let legacyModule = module,
  legacyExports = exports;
function n(t) {
  "@babel/helpers - typeof";

  return legacyModule.exports = n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports, n(t);
}
legacyModule.exports = n, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
