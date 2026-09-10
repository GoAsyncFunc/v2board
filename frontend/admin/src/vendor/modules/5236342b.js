let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./47422b74.js"),
  i = o(r);
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var a = function () {
  var e = null,
    t = function (t) {
      return (0, i.default)(null == e, "A history supports only one prompt at a time"), e = t, function () {
        e === t && (e = null);
      };
    },
    n = function (t, n, r, o) {
      if (null != e) {
        var a = "function" === typeof e ? e(t, n) : e;
        "string" === typeof a ? "function" === typeof r ? r(a, o) : ((0, i.default)(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), o(!0)) : o(!1 !== a);
      } else o(!0);
    },
    r = [],
    o = function (e) {
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
    appendListener: o,
    notifyListeners: a
  };
};
legacyExports.default = a;
