let legacyModule = module,
  legacyExports = exports;
function n() {
  return legacyModule.exports = n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports, n.apply(this, arguments);
}
legacyModule.exports = n, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
