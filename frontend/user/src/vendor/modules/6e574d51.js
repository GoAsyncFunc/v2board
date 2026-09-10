let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  o = require("./57474e57.js"),
  i = require("./724b496c.js"),
  a = require("./7a4e772b.js"),
  s = require("./2b793531.js"),
  c = require("./346f3336.js"),
  u = require("./59455649.js"),
  l = require("./75382b75.js"),
  f = require("./77555779.js"),
  p = require("./63517958.js"),
  d = require("./6c76416f.js"),
  h = require("./51537338.js");
legacyModule.exports = function (e, t, n, m, v, y) {
  var g = r[e],
    b = g,
    w = v ? "set" : "add",
    x = b && b.prototype,
    O = {},
    E = function (e) {
      var t = x[e];
      i(x, e, "delete" == e ? function (e) {
        return !(y && !l(e)) && t.call(this, 0 === e ? 0 : e);
      } : "has" == e ? function (e) {
        return !(y && !l(e)) && t.call(this, 0 === e ? 0 : e);
      } : "get" == e ? function (e) {
        return y && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
      } : "add" == e ? function (e) {
        return t.call(this, 0 === e ? 0 : e), this;
      } : function (e, n) {
        return t.call(this, 0 === e ? 0 : e, n), this;
      });
    };
  if ("function" == typeof b && (y || x.forEach && !f(function () {
    new b().entries().next();
  }))) {
    var _ = new b(),
      k = _[w](y ? {} : -0, 1) != _,
      S = f(function () {
        _.has(1);
      }),
      C = p(function (e) {
        new b(e);
      }),
      j = !y && f(function () {
        var e = new b(),
          t = 5;
        while (t--) e[w](t, t);
        return !e.has(-0);
      });
    C || (b = t(function (t, n) {
      u(t, b, e);
      var r = h(new g(), t, b);
      return void 0 != n && c(n, v, r[w], r), r;
    }), b.prototype = x, x.constructor = b), (S || j) && (E("delete"), E("has"), v && E("get")), (j || k) && E(w), y && x.clear && delete x.clear;
  } else b = m.getConstructor(t, e, v, w), a(b.prototype, n), s.NEED = !0;
  return d(b, e), O[e] = b, o(o.G + o.W + o.F * (b != g), O), y || m.setStrong(b, e, v), b;
};
