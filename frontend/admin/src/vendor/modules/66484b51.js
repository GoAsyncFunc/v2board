let legacyModule = module,
  legacyExports = exports;
var r = require("./descriptorsLegacySupport.js"),
  i = require("./objectKeys.js"),
  o = require("./4f654f43.js"),
  a = require("./4c734157.js").f;
legacyModule.exports = function (e) {
  return function (t) {
    var n,
      s = o(t),
      l = i(s),
      c = l.length,
      u = 0,
      h = [];
    while (c > u) n = l[u++], r && !a.call(s, n) || h.push(e ? [n, s[n]] : s[n]);
    return h;
  };
};
