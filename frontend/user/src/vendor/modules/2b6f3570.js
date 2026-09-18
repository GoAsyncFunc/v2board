let legacyModule = module,
  legacyExports = exports;
var r = require("./bindContextLegacy.js"),
  o = require("./indexedObjectLegacy.js"),
  i = require("./toObjectLegacy.js"),
  a = require("./toLength.js"),
  s = require("./speciesConstructor.js");
legacyModule.exports = function (e, t) {
  var n = 1 == e,
    c = 2 == e,
    u = 3 == e,
    l = 4 == e,
    f = 6 == e,
    p = 5 == e || f,
    d = t || s;
  return function (t, s, h) {
    for (var m, v, y = i(t), g = o(y), b = r(s, h, 3), w = a(g.length), x = 0, O = n ? d(t, w) : c ? d(t, 0) : void 0; w > x; x++) if ((p || x in g) && (m = g[x], v = b(m, x, y), e)) if (n) O[x] = v;else if (v) switch (e) {
      case 3:
        return !0;
      case 5:
        return m;
      case 6:
        return x;
      case 2:
        O.push(m);
    } else if (l) return !1;
    return f ? -1 : u || l ? l : O;
  };
};
