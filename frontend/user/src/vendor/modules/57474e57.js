let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./coreJsVersion.js"),
  i = require("./56504f45.js"),
  a = require("./redefine.js"),
  s = require("./77487272.js"),
  c = "prototype",
  u = function (e, t, n) {
    var l,
      f,
      p,
      d,
      h = e & u.F,
      m = e & u.G,
      v = e & u.S,
      y = e & u.P,
      g = e & u.B,
      b = m ? r : v ? r[t] || (r[t] = {}) : (r[t] || {})[c],
      w = m ? o : o[t] || (o[t] = {}),
      x = w[c] || (w[c] = {});
    for (l in m && (n = t), n) f = !h && b && void 0 !== b[l], p = (f ? b : n)[l], d = g && f ? s(p, r) : y && "function" == typeof p ? s(Function.call, p) : p, b && a(b, l, p, e & u.U), w[l] != p && i(w, l, d), y && x[l] != p && (x[l] = p);
  };
r.core = o, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, legacyModule.exports = u;
