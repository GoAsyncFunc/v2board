let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./requireObjectCoercible.js"),
  i = require("./tryCatchTest.js"),
  a = require("./whitespaceCharacters.js"),
  s = "[" + a + "]",
  c = "\u200b\x85",
  u = RegExp("^" + s + s + "*"),
  l = RegExp(s + s + "*$"),
  f = function (e, t, n) {
    var o = {},
      s = i(function () {
        return !!a[e]() || c[e]() != c;
      }),
      u = o[e] = s ? t(p) : a[e];
    n && (o[n] = u), r(r.P + r.F * s, "String", o);
  },
  p = f.trim = function (e, t) {
    return e = String(o(e)), 1 & t && (e = e.replace(u, "")), 2 & t && (e = e.replace(l, "")), e;
  };
legacyModule.exports = f;
