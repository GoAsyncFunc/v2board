let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = require("./57474e57.js"),
  o = require("./redefine.js"),
  a = require("./redefineAll.js"),
  s = require("./objectMeta.js"),
  l = require("./346f3336.js"),
  c = require("./59455649.js"),
  u = require("./isObject.js"),
  h = require("./tryCatchTest.js"),
  f = require("./63517958.js"),
  d = require("./setToStringTag.js"),
  p = require("./51537338.js");
legacyModule.exports = function (e, t, n, m, g, v) {
  var y = r[e],
    b = y,
    w = g ? "set" : "add",
    x = b && b.prototype,
    _ = {},
    E = function (e) {
      var t = x[e];
      o(x, e, "delete" == e ? function (e) {
        return !(v && !u(e)) && t.call(this, 0 === e ? 0 : e);
      } : "has" == e ? function (e) {
        return !(v && !u(e)) && t.call(this, 0 === e ? 0 : e);
      } : "get" == e ? function (e) {
        return v && !u(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
      } : "add" == e ? function (e) {
        return t.call(this, 0 === e ? 0 : e), this;
      } : function (e, n) {
        return t.call(this, 0 === e ? 0 : e, n), this;
      });
    };
  if ("function" == typeof b && (v || x.forEach && !h(function () {
    new b().entries().next();
  }))) {
    var S = new b(),
      k = S[w](v ? {} : -0, 1) != S,
      C = h(function () {
        S.has(1);
      }),
      O = f(function (e) {
        new b(e);
      }),
      T = !v && h(function () {
        var e = new b(),
          t = 5;
        while (t--) e[w](t, t);
        return !e.has(-0);
      });
    O || (b = t(function (t, n) {
      c(t, b, e);
      var r = p(new y(), t, b);
      return void 0 != n && l(n, g, r[w], r), r;
    }), b.prototype = x, x.constructor = b), (C || T) && (E("delete"), E("has"), g && E("get")), (T || k) && E(w), v && x.clear && delete x.clear;
  } else b = m.getConstructor(t, e, g, w), a(b.prototype, n), s.NEED = !0;
  return d(b, e), _[e] = b, i(i.G + i.W + i.F * (b != y), _), v || m.setStrong(b, e, g), b;
};
