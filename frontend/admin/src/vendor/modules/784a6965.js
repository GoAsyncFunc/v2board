let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwn.js"),
  i = require("./toIndexedObject.js"),
  o = require("./4c6e6578.js")(!1),
  a = require("./sharedKey.js")("IE_PROTO");
legacyModule.exports = function (e, t) {
  var n,
    s = i(e),
    l = 0,
    c = [];
  for (n in s) n != a && r(s, n) && c.push(n);
  while (t.length > l) r(s, n = t[l++]) && (~o(c, n) || c.push(n));
  return c;
};
