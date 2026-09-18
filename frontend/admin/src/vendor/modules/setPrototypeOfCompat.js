let legacyModule = module,
  legacyExports = exports;
function n(t, r) {
  return legacyModule.exports = n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    return e.__proto__ = t, e;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports, n(t, r);
}
legacyModule.exports = n, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
