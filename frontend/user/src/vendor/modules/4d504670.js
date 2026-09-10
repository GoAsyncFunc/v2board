let legacyModule = module,
  legacyExports = exports;
var r = require("./754f5053.js"),
  o = require("./59375a43.js"),
  i = require("./6b546957.js"),
  a = require("./4e65674d.js"),
  s = require("./53427545.js"),
  c = require("./6a324443.js"),
  u = require("./52664b42.js"),
  l = require("./552b4b44.js"),
  f = require("./55576958.js")("iterator"),
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
