let legacyModule = module,
  legacyExports = exports;
var r = require("./385a2f56.js"),
  o = require("./49676761.js"),
  i = require("./4f654f43.js"),
  a = require("./4c734157.js").f;
legacyModule.exports = function (e) {
  return function (t) {
    var n,
      s = i(t),
      c = o(s),
      u = c.length,
      l = 0,
      f = [];
    while (u > l) n = c[l++], r && !a.call(s, n) || f.push(e ? [n, s[n]] : s[n]);
    return f;
  };
};
