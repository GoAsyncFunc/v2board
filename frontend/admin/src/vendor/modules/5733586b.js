let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  i = require("./requireObjectCoercible.js"),
  o = require("./tryCatchTest.js"),
  a = require("./4773725a.js"),
  s = "[" + a + "]",
  l = "\u200b\x85",
  c = RegExp("^" + s + s + "*"),
  u = RegExp(s + s + "*$"),
  h = function (e, t, n) {
    var i = {},
      s = o(function () {
        return !!a[e]() || l[e]() != l;
      }),
      c = i[e] = s ? t(f) : a[e];
    n && (i[n] = c), r(r.P + r.F * s, "String", i);
  },
  f = h.trim = function (e, t) {
    return e = String(i(e)), 1 & t && (e = e.replace(c, "")), 2 & t && (e = e.replace(u, "")), e;
  };
legacyModule.exports = h;
