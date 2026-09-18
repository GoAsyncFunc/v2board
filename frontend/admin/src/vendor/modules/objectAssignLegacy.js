let legacyModule = module,
  legacyExports = exports;
var r = require("./descriptorsSupport.js"),
  i = require("./objectKeysLegacy.js"),
  o = require("./getOwnPropertySymbolsLegacy.js"),
  a = require("./propertyIsEnumerableLegacy.js"),
  s = require("./toObject.js"),
  l = require("./toIndexedObjectLegacy.js"),
  c = Object.assign;
legacyModule.exports = !c || require("./tryCatchTestLegacy.js")(function () {
  var e = {},
    t = {},
    n = Symbol(),
    r = "abcdefghijklmnopqrst";
  return e[n] = 7, r.split("").forEach(function (e) {
    t[e] = e;
  }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
}) ? function (e, t) {
  var n = s(e),
    c = arguments.length,
    u = 1,
    h = o.f,
    f = a.f;
  while (c > u) {
    var d,
      p = l(arguments[u++]),
      m = h ? i(p).concat(h(p)) : i(p),
      g = m.length,
      v = 0;
    while (g > v) d = m[v++], r && !f.call(p, d) || (n[d] = p[d]);
  }
  return n;
} : c;
