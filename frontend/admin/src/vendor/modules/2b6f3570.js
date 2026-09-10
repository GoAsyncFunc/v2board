let legacyModule = module,
  legacyExports = exports;
var r = require("./77487272.js"),
  i = require("./39574656.js"),
  o = require("./696c3471.js"),
  a = require("./4f735664.js"),
  s = require("./31376a43.js");
legacyModule.exports = function (e, t) {
  var n = 1 == e,
    l = 2 == e,
    c = 3 == e,
    u = 4 == e,
    h = 6 == e,
    f = 5 == e || h,
    d = t || s;
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
