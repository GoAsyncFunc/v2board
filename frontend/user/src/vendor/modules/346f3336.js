let legacyModule = module,
  legacyExports = exports;
var r = require("./77487272.js"),
  o = require("./3639535a.js"),
  i = require("./554c4d54.js"),
  a = require("./assertObject.js"),
  s = require("./4f735664.js"),
  c = require("./getIteratorMethod.js"),
  u = {},
  l = {};
legacyExports = legacyModule.exports = function (e, t, n, f, p) {
  var d,
    h,
    m,
    v,
    y = p ? function () {
      return e;
    } : c(e),
    g = r(n, f, t ? 2 : 1),
    b = 0;
  if ("function" != typeof y) throw TypeError(e + " is not iterable!");
  if (i(y)) {
    for (d = s(e.length); d > b; b++) if (v = t ? g(a(h = e[b])[0], h[1]) : g(e[b]), v === u || v === l) return v;
  } else for (m = y.call(e); !(h = m.next()).done;) if (v = o(m, g, h.value, t), v === u || v === l) return v;
};
legacyExports.BREAK = u, legacyExports.RETURN = l;
