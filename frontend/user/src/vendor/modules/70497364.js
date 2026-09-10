let legacyModule = module,
  legacyExports = exports;
var r = require("./424a6653.js"),
  o = function (e) {
    var t = /[height|width]$/;
    return t.test(e);
  },
  i = function (e) {
    var t = "",
      n = Object.keys(e);
    return n.forEach(function (i, a) {
      var s = e[i];
      i = r(i), o(i) && "number" === typeof s && (s += "px"), t += !0 === s ? i : !1 === s ? "not " + i : "(" + i + ": " + s + ")", a < n.length - 1 && (t += " and ");
    }), t;
  },
  a = function (e) {
    var t = "";
    return "string" === typeof e ? e : e instanceof Array ? (e.forEach(function (n, r) {
      t += i(n), r < e.length - 1 && (t += ", ");
    }), t) : i(e);
  };
legacyModule.exports = a;
