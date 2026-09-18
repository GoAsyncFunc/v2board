let legacyModule = module,
  legacyExports = exports;
var r = require("./descriptorsSupport.js"),
  i = require("./7736474f.js"),
  o = require("./6d716c46.js"),
  a = require("./4e56306b.js"),
  s = require("./4a423638.js"),
  l = require("./4d317870.js"),
  c = Object.assign;
legacyModule.exports = !c || require("./4b557850.js")(function () {
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
