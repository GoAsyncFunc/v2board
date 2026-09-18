let legacyModule = module,
  legacyExports = exports;
var r = require("./pureMode.js"),
  o = require("./57474e57.js"),
  i = require("./redefine.js"),
  a = require("./definePropertyValue.js"),
  s = require("./emptyExports.js"),
  c = require("./626d4969.js"),
  u = require("./setToStringTag.js"),
  l = require("./getPrototypeOfFallback.js"),
  f = require("./wellKnownSymbol.js")("iterator"),
  p = !([].keys && "next" in [].keys()),
  d = "@@iterator",
  h = "keys",
  m = "values",
  v = function () {
    return this;
  };
legacyModule.exports = function (e, t, n, y, g, b, w) {
  c(n, t, y);
  var x,
    O,
    E,
    _ = function (e) {
      if (!p && e in j) return j[e];
      switch (e) {
        case h:
          return function () {
            return new n(this, e);
          };
        case m:
          return function () {
            return new n(this, e);
          };
      }
      return function () {
        return new n(this, e);
      };
    },
    k = t + " Iterator",
    S = g == m,
    C = !1,
    j = e.prototype,
    P = j[f] || j[d] || g && j[g],
    T = P || _(g),
    L = g ? S ? _("entries") : T : void 0,
    N = "Array" == t && j.entries || P;
  if (N && (E = l(N.call(new e())), E !== Object.prototype && E.next && (u(E, k, !0), r || "function" == typeof E[f] || a(E, f, v))), S && P && P.name !== m && (C = !0, T = function () {
    return P.call(this);
  }), r && !w || !p && !C && j[f] || a(j, f, T), s[t] = T, s[k] = v, g) if (x = {
    values: S ? T : _(m),
    keys: b ? T : _(h),
    entries: L
  }, w) for (O in x) O in j || i(j, O, x[O]);else o(o.P + o.F * (p || C), t, x);
  return x;
};
