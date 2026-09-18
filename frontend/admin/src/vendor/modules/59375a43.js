let legacyModule = module,
  legacyExports = exports;
var r = require("./35543259.js"),
  i = require("./coreJsNamespace.js"),
  o = require("./32475450.js"),
  a = require("./definePropertyRuntime.js"),
  s = require("./422b4f54.js"),
  l = "prototype",
  c = function (e, t, n) {
    var u,
      h,
      f,
      d = e & c.F,
      p = e & c.G,
      m = e & c.S,
      g = e & c.P,
      v = e & c.B,
      y = e & c.W,
      b = p ? i : i[t] || (i[t] = {}),
      w = b[l],
      x = p ? r : m ? r[t] : (r[t] || {})[l];
    for (u in p && (n = t), n) h = !d && x && void 0 !== x[u], h && s(b, u) || (f = h ? x[u] : n[u], b[u] = p && "function" != typeof x[u] ? n[u] : v && h ? o(f, r) : y && x[u] == f ? function (e) {
      var t = function (t, n, r) {
        if (this instanceof e) {
          switch (arguments.length) {
            case 0:
              return new e();
            case 1:
              return new e(t);
            case 2:
              return new e(t, n);
          }
          return new e(t, n, r);
        }
        return e.apply(this, arguments);
      };
      return t[l] = e[l], t;
    }(f) : g && "function" == typeof f ? o(Function.call, f) : f, g && ((b.virtual || (b.virtual = {}))[u] = f, e & c.R && w && !w[u] && a(w, u, f)));
  };
c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, legacyModule.exports = c;
