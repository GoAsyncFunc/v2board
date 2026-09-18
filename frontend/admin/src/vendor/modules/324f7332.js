let legacyModule = module,
  legacyExports = exports;
var r = require("./7a4e772b.js"),
  i = require("./objectMeta.js").getWeak,
  o = require("./assertObject.js"),
  a = require("./isObject.js"),
  s = require("./59455649.js"),
  l = require("./346f3336.js"),
  c = require("./2b6f3570.js"),
  u = require("./hasOwn.js"),
  h = require("./collectionReceiver.js"),
  f = c(5),
  d = c(6),
  p = 0,
  m = function (e) {
    return e._l || (e._l = new g());
  },
  g = function () {
    this.a = [];
  },
  v = function (e, t) {
    return f(e.a, function (e) {
      return e[0] === t;
    });
  };
g.prototype = {
  get: function (e) {
    var t = v(this, e);
    if (t) return t[1];
  },
  has: function (e) {
    return !!v(this, e);
  },
  set: function (e, t) {
    var n = v(this, e);
    n ? n[1] = t : this.a.push([e, t]);
  },
  delete: function (e) {
    var t = d(this.a, function (t) {
      return t[0] === e;
    });
    return ~t && this.a.splice(t, 1), !!~t;
  }
}, legacyModule.exports = {
  getConstructor: function (e, t, n, o) {
    var c = e(function (e, r) {
      s(e, c, t, "_i"), e._t = t, e._i = p++, e._l = void 0, void 0 != r && l(r, n, e[o], e);
    });
    return r(c.prototype, {
      delete: function (e) {
        if (!a(e)) return !1;
        var n = i(e);
        return !0 === n ? m(h(this, t))["delete"](e) : n && u(n, this._i) && delete n[this._i];
      },
      has: function (e) {
        if (!a(e)) return !1;
        var n = i(e);
        return !0 === n ? m(h(this, t)).has(e) : n && u(n, this._i);
      }
    }), c;
  },
  def: function (e, t, n) {
    var r = i(o(t), !0);
    return !0 === r ? m(e).set(t, n) : r[e._i] = n, e;
  },
  ufstore: m
};
