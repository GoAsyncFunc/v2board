let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./53456b77.js"),
  o = i(r);
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, o.default)(e, r.key, r);
    }
  }
  return function (t, n, r) {
    return n && e(t.prototype, n), r && e(t, r), t;
  };
}();
