let legacyModule = module,
  legacyExports = exports;
var r = require("./59714163.js")("meta"),
  o = require("./39334934.js"),
  i = require("./hasOwnLegacy.js"),
  a = require("./definePropertyLegacy.js").f,
  s = 0,
  c = Object.isExtensible || function () {
    return !0;
  },
  u = !require("./tryCatchTestLegacy.js")(function () {
    return c(Object.preventExtensions({}));
  }),
  l = function (e) {
    a(e, r, {
      value: {
        i: "O" + ++s,
        w: {}
      }
    });
  },
  f = function (e, t) {
    if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
    if (!i(e, r)) {
      if (!c(e)) return "F";
      if (!t) return "E";
      l(e);
    }
    return e[r].i;
  },
  p = function (e, t) {
    if (!i(e, r)) {
      if (!c(e)) return !0;
      if (!t) return !1;
      l(e);
    }
    return e[r].w;
  },
  d = function (e) {
    return u && h.NEED && c(e) && !i(e, r) && l(e), e;
  },
  h = legacyModule.exports = {
    KEY: r,
    NEED: !1,
    fastKey: f,
    getWeak: p,
    onFreeze: d
  };
