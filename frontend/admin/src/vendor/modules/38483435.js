let legacyModule = module,
  legacyExports = exports;
var r = require("./45705844.js"),
  i = require("./isObject.js"),
  o = require("./toLength.js"),
  a = require("./77487272.js"),
  s = require("./wellKnownSymbol.js")("isConcatSpreadable");
function l(e, t, n, c, u, h, f, d) {
  var p,
    m,
    g = u,
    v = 0,
    y = !!f && a(f, d, 3);
  while (v < c) {
    if (v in n) {
      if (p = y ? y(n[v], v, t) : n[v], m = !1, i(p) && (m = p[s], m = void 0 !== m ? !!m : r(p)), m && h > 0) g = l(e, t, p, o(p.length), g, h - 1) - 1;else {
        if (g >= 9007199254740991) throw TypeError();
        e[g] = p;
      }
      g++;
    }
    v++;
  }
  return g;
}
legacyModule.exports = l;
