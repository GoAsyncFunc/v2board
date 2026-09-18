let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./noopLegacy.js"),
  o = i(r);
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var a = function () {
  var e = null,
    t = function (t) {
      return (0, o.default)(null == e, "A history supports only one prompt at a time"), e = t, function () {
        e === t && (e = null);
      };
    },
    n = function (t, n, r, i) {
      if (null != e) {
        var a = "function" === typeof e ? e(t, n) : e;
        "string" === typeof a ? "function" === typeof r ? r(a, i) : ((0, o.default)(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), i(!0)) : i(!1 !== a);
      } else i(!0);
    },
    r = [],
    i = function (e) {
      var t = !0,
        n = function () {
          t && e.apply(void 0, arguments);
        };
      return r.push(n), function () {
        t = !1, r = r.filter(function (e) {
          return e !== n;
        });
      };
    },
    a = function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      r.forEach(function (e) {
        return e.apply(void 0, t);
      });
    };
  return {
    setPrompt: t,
    confirmTransitionTo: n,
    appendListener: i,
    notifyListeners: a
  };
};
legacyExports.default = a;
