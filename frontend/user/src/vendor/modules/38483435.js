let legacyModule = module,
  legacyExports = exports;
var r = require("./45705844.js"),
  o = require("./75382b75.js"),
  i = require("./4f735664.js"),
  a = require("./77487272.js"),
  s = require("./674c374e.js")("isConcatSpreadable");
function c(e, t, n, u, l, f, p, d) {
  var h,
    m,
    v = l,
    y = 0,
    g = !!p && a(p, d, 3);
  while (y < u) {
    if (y in n) {
      if (h = g ? g(n[y], y, t) : n[y], m = !1, o(h) && (m = h[s], m = void 0 !== m ? !!m : r(h)), m && f > 0) v = c(e, t, h, i(h.length), v, f - 1) - 1;else {
        if (v >= 9007199254740991) throw TypeError();
        e[v] = h;
      }
      v++;
    }
    y++;
  }
  return v;
}
legacyModule.exports = c;
