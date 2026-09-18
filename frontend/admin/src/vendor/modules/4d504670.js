let legacyModule = module,
  legacyExports = exports;
var r = require("./trueValue.js"),
  i = require("./coreJsExport.js"),
  o = require("./definePropertyEntry.js"),
  a = require("./definePropertyRuntime.js"),
  s = require("./emptyExports.js"),
  createIteratorConstructor = require("./createIteratorConstructorLegacy.js"),
  c = require("./setToStringTag.js"),
  u = require("./getPrototypeOfLegacyFallback.js"),
  h = require("./wellKnownSymbolLegacy.js")("iterator"),
  f = !([].keys && "next" in [].keys()),
  d = "@@iterator",
  p = "keys",
  m = "values",
  g = function () {
    return this;
  };
legacyModule.exports = function (e, t, n, v, y, b, w) {
  createIteratorConstructor(n, t, v);
  var x,
    _,
    E,
    S = function (e) {
      if (!f && e in T) return T[e];
      switch (e) {
        case p:
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
    C = y == m,
    O = !1,
    T = e.prototype,
    L = T[h] || T[d] || y && T[y],
    A = L || S(y),
    P = y ? C ? S("entries") : A : void 0,
    j = "Array" == t && T.entries || L;
  if (j && (E = u(j.call(new e())), E !== Object.prototype && E.next && (c(E, k, !0), r || "function" == typeof E[h] || a(E, h, g))), C && L && L.name !== m && (O = !0, A = function () {
    return L.call(this);
  }), r && !w || !f && !O && T[h] || a(T, h, A), s[t] = A, s[k] = g, y) if (x = {
    values: C ? A : S(m),
    keys: b ? A : S(p),
    entries: P
  }, w) for (_ in x) _ in T || o(T, _, x[_]);else i(i.P + i.F * (f || O), t, x);
  return x;
};
