let legacyModule = module,
  legacyExports = exports;
var r = require("./bindContextLegacy.js"),
  i = require("./indexedObjectLegacy.js"),
  o = require("./toObjectLegacy.js"),
  a = require("./toLength.js"),
  arraySpeciesCreate = require("./arraySpeciesCreate.js");
legacyModule.exports = function (e, t) {
  var n = 1 == e,
    l = 2 == e,
    c = 3 == e,
    u = 4 == e,
    h = 6 == e,
    f = 5 == e || h,
    d = t || arraySpeciesCreate;
  return function (t, s, p) {
    for (var m, g, v = o(t), y = i(v), b = r(s, p, 3), w = a(y.length), x = 0, _ = n ? d(t, w) : l ? d(t, 0) : void 0; w > x; x++) if ((f || x in y) && (m = y[x], g = b(m, x, v), e)) if (n) _[x] = g;else if (g) switch (e) {
      case 3:
        return !0;
      case 5:
        return m;
      case 6:
        return x;
      case 2:
        _.push(m);
    } else if (u) return !1;
    return h ? -1 : c || u ? u : _;
  };
};
