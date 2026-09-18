let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./coreJsNamespace.js"),
  i = require("./bindContext.js"),
  a = require("./definePropertyRuntime.js"),
  s = require("./hasOwnLegacy.js"),
  c = "prototype",
  u = function (e, t, n) {
    var l,
      f,
      p,
      d = e & u.F,
      h = e & u.G,
      m = e & u.S,
      v = e & u.P,
      y = e & u.B,
      g = e & u.W,
      b = h ? o : o[t] || (o[t] = {}),
      w = b[c],
      x = h ? r : m ? r[t] : (r[t] || {})[c];
    for (l in h && (n = t), n) f = !d && x && void 0 !== x[l], f && s(b, l) || (p = f ? x[l] : n[l], b[l] = h && "function" != typeof x[l] ? n[l] : y && f ? i(p, r) : g && x[l] == p ? function (e) {
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
      return t[c] = e[c], t;
    }(p) : v && "function" == typeof p ? i(Function.call, p) : p, v && ((b.virtual || (b.virtual = {}))[l] = p, e & u.R && w && !w[l] && a(w, l, p)));
  };
u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, legacyModule.exports = u;
