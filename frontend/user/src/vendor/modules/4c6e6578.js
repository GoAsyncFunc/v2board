let legacyModule = module,
  legacyExports = exports;
var r = require("./4f654f43.js"),
  o = require("./4f735664.js"),
  i = require("./53706333.js");
legacyModule.exports = function (e) {
  return function (t, n, a) {
    var s,
      c = r(t),
      u = o(c.length),
      l = i(a, u);
    if (e && n != n) {
      while (u > l) if (s = c[l++], s != s) return !0;
    } else for (; u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
    return !e && -1;
  };
};
