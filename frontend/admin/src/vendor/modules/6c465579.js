let legacyModule = module,
  legacyExports = exports;
var r = require("./385a2f56.js"),
  i = require("./49676761.js"),
  o = require("./65367737.js"),
  a = require("./4c734157.js"),
  s = require("./696c3471.js"),
  l = require("./39574656.js"),
  c = Object.assign;
legacyModule.exports = !c || require("./77555779.js")(function () {
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
