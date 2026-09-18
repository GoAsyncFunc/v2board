let legacyModule = module,
  legacyExports = exports;
var r = require("./bindContextLegacy.js"),
  i = require("./iteratorClose.js"),
  o = require("./isArrayIteratorMethod.js"),
  a = require("./assertObject.js"),
  s = require("./toLength.js"),
  l = require("./getIteratorMethod.js"),
  c = {},
  u = {};
legacyExports = legacyModule.exports = function (e, t, n, h, f) {
  var d,
    p,
    m,
    g,
    v = f ? function () {
      return e;
    } : l(e),
    y = r(n, h, t ? 2 : 1),
    b = 0;
  if ("function" != typeof v) throw TypeError(e + " is not iterable!");
  if (o(v)) {
    for (d = s(e.length); d > b; b++) if (g = t ? y(a(p = e[b])[0], p[1]) : y(e[b]), g === c || g === u) return g;
  } else for (m = v.call(e); !(p = m.next()).done;) if (g = i(m, y, p.value, t), g === c || g === u) return g;
};
legacyExports.BREAK = c, legacyExports.RETURN = u;
