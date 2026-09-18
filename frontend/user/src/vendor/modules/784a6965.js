let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwn.js"),
  o = require("./toIndexedObject.js"),
  i = require("./4c6e6578.js")(!1),
  a = require("./4a35372f.js")("IE_PROTO");
legacyModule.exports = function (e, t) {
  var n,
    s = o(e),
    c = 0,
    u = [];
  for (n in s) n != a && r(s, n) && u.push(n);
  while (t.length > c) r(s, n = t[c++]) && (~i(u, n) || u.push(n));
  return u;
};
