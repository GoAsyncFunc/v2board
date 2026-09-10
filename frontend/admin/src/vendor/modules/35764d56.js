let legacyModule = module,
  legacyExports = exports;
var r = require("./422b4f54.js"),
  i = require("./4e734f2f.js"),
  o = require("./57303730.js")(!1),
  a = require("./56566c78.js")("IE_PROTO");
legacyModule.exports = function (e, t) {
  var n,
    s = i(e),
    l = 0,
    c = [];
  for (n in s) n != a && r(s, n) && c.push(n);
  while (t.length > l) r(s, n = t[l++]) && (~o(c, n) || c.push(n));
  return c;
};
