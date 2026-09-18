let legacyModule = module,
  legacyExports = exports;
var r = require("./descriptorsSupport.js"),
  o = require("./objectKeysLegacy.js"),
  i = require("./getOwnPropertySymbolsLegacy.js"),
  a = require("./propertyIsEnumerableLegacy.js"),
  s = require("./toObject.js"),
  c = require("./4d317870.js"),
  u = Object.assign;
legacyModule.exports = !u || require("./tryCatchTestLegacy.js")(function () {
  var e = {},
    t = {},
    n = Symbol(),
    r = "abcdefghijklmnopqrst";
  return e[n] = 7, r.split("").forEach(function (e) {
    t[e] = e;
  }), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != r;
}) ? function (e, t) {
  var n = s(e),
    u = arguments.length,
    l = 1,
    f = i.f,
    p = a.f;
  while (u > l) {
    var d,
      h = c(arguments[l++]),
      m = f ? o(h).concat(f(h)) : o(h),
      v = m.length,
      y = 0;
    while (v > y) d = m[y++], r && !p.call(h, d) || (n[d] = h[d]);
  }
  return n;
} : u;
