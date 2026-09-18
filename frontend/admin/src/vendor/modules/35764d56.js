let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwnLegacy.js"),
  i = require("./toArray.js"),
  o = require("./57303730.js")(!1),
  a = require("./sharedKeyLegacy.js")("IE_PROTO");
legacyModule.exports = function (e, t) {
  var n,
    s = i(e),
    l = 0,
    c = [];
  for (n in s) n != a && r(s, n) && c.push(n);
  while (t.length > l) r(s, n = t[l++]) && (~o(c, n) || c.push(n));
  return c;
};
