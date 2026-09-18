let legacyModule = module,
  legacyExports = exports;
var r = require("./6b434b35.js")("meta"),
  i = require("./75382b75.js"),
  o = require("./6f786f30.js"),
  a = require("./definePropertyHelper.js").f,
  s = 0,
  l = Object.isExtensible || function () {
    return !0;
  },
  c = !require("./77555779.js")(function () {
    return l(Object.preventExtensions({}));
  }),
  u = function (e) {
    a(e, r, {
      value: {
        i: "O" + ++s,
        w: {}
      }
    });
  },
  h = function (e, t) {
    if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
    if (!o(e, r)) {
      if (!l(e)) return "F";
      if (!t) return "E";
      u(e);
    }
    return e[r].i;
  },
  f = function (e, t) {
    if (!o(e, r)) {
      if (!l(e)) return !0;
      if (!t) return !1;
      u(e);
    }
    return e[r].w;
  },
  d = function (e) {
    return c && p.NEED && l(e) && !o(e, r) && u(e), e;
  },
  p = legacyModule.exports = {
    KEY: r,
    NEED: !1,
    fastKey: h,
    getWeak: f,
    onFreeze: d
  };
