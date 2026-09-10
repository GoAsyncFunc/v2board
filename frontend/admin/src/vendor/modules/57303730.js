let legacyModule = module,
  legacyExports = exports;
var r = require("./4e734f2f.js"),
  i = require("./7445656a.js"),
  o = require("./44386b59.js");
legacyModule.exports = function (e) {
  return function (t, n, a) {
    var s,
      l = r(t),
      c = i(l.length),
      u = o(a, c);
    if (e && n != n) {
      while (c > u) if (s = l[u++], s != s) return !0;
    } else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
    return !e && -1;
  };
};
