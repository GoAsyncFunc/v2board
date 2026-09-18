let legacyModule = module,
  legacyExports = exports;
var r,
  o = require("./globalObject.js"),
  i = require("./2b6f3570.js")(0),
  a = require("./724b496c.js"),
  s = require("./2b793531.js"),
  c = require("./6c465579.js"),
  u = require("./324f7332.js"),
  l = require("./75382b75.js"),
  f = require("./4a633770.js"),
  p = require("./4a633770.js"),
  d = !o.ActiveXObject && "ActiveXObject" in o,
  h = "WeakMap",
  m = s.getWeak,
  v = Object.isExtensible,
  y = u.ufstore,
  g = function (e) {
    return function () {
      return e(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  },
  b = {
    get: function (e) {
      if (l(e)) {
        var t = m(e);
        return !0 === t ? y(f(this, h)).get(e) : t ? t[this._i] : void 0;
      }
    },
    set: function (e, t) {
      return u.def(f(this, h), e, t);
    }
  },
  w = legacyModule.exports = require("./6e574d51.js")(h, g, b, u, !0, !0);
p && d && (r = u.getConstructor(g, h), c(r.prototype, b), s.NEED = !0, i(["delete", "has", "get", "set"], function (e) {
  var t = w.prototype,
    n = t[e];
  a(t, e, function (t, o) {
    if (l(t) && !v(t)) {
      this._f || (this._f = new r());
      var i = this._f[e](t, o);
      return "set" == e ? this : i;
    }
    return n.call(this, t, o);
  });
}));
