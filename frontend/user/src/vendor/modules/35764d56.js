let legacyModule = module,
  legacyExports = exports;
var r = require("./422b4f54.js"),
  o = require("./4e734f2f.js"),
  i = require("./57303730.js")(!1),
  a = require("./56566c78.js")("IE_PROTO");
legacyModule.exports = function (e, t) {
  var n,
    s = o(e),
    c = 0,
    u = [];
  for (n in s) n != a && r(s, n) && u.push(n);
  while (t.length > c) r(s, n = t[c++]) && (~i(u, n) || u.push(n));
  return u;
};
