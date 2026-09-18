let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = require("./coreJsVersion.js"),
  o = require("./definePropertyValue.js"),
  a = require("./redefine.js"),
  s = require("./bindContextLegacy.js"),
  l = "prototype",
  c = function (e, t, n) {
    var u,
      h,
      f,
      d,
      p = e & c.F,
      m = e & c.G,
      g = e & c.S,
      v = e & c.P,
      y = e & c.B,
      b = m ? r : g ? r[t] || (r[t] = {}) : (r[t] || {})[l],
      w = m ? i : i[t] || (i[t] = {}),
      x = w[l] || (w[l] = {});
    for (u in m && (n = t), n) h = !p && b && void 0 !== b[u], f = (h ? b : n)[u], d = y && h ? s(f, r) : v && "function" == typeof f ? s(Function.call, f) : f, b && a(b, u, f, e & c.U), w[u] != f && o(w, u, d), v && x[u] != f && (x[u] = f);
  };
r.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, legacyModule.exports = c;
