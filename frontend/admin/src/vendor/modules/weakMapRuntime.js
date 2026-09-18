let legacyModule = module,
  legacyExports = exports;
var r,
  i = require("./globalObject.js"),
  o = require("./2b6f3570.js")(0),
  a = require("./redefine.js"),
  s = require("./objectMeta.js"),
  l = require("./6c465579.js"),
  c = require("./324f7332.js"),
  u = require("./isObject.js"),
  h = require("./collectionReceiver.js"),
  f = require("./collectionReceiver.js"),
  d = !i.ActiveXObject && "ActiveXObject" in i,
  p = "WeakMap",
  m = s.getWeak,
  g = Object.isExtensible,
  v = c.ufstore,
  y = function (e) {
    return function () {
      return e(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  },
  b = {
    get: function (e) {
      if (u(e)) {
        var t = m(e);
        return !0 === t ? v(h(this, p)).get(e) : t ? t[this._i] : void 0;
      }
    },
    set: function (e, t) {
      return c.def(h(this, p), e, t);
    }
  },
  w = legacyModule.exports = require("./collectionStrong.js")(p, y, b, c, !0, !0);
f && d && (r = c.getConstructor(y, p), l(r.prototype, b), s.NEED = !0, o(["delete", "has", "get", "set"], function (e) {
  var t = w.prototype,
    n = t[e];
  a(t, e, function (t, i) {
    if (u(t) && !g(t)) {
      this._f || (this._f = new r());
      var o = this._f[e](t, i);
      return "set" == e ? this : o;
    }
    return n.call(this, t, i);
  });
}));
