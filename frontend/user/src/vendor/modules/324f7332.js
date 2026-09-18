let legacyModule = module,
  legacyExports = exports;
var r = require("./7a4e772b.js"),
  o = require("./objectMeta.js").getWeak,
  i = require("./assertObject.js"),
  a = require("./isObject.js"),
  s = require("./59455649.js"),
  c = require("./346f3336.js"),
  u = require("./2b6f3570.js"),
  l = require("./hasOwn.js"),
  f = require("./collectionReceiver.js"),
  p = u(5),
  d = u(6),
  h = 0,
  m = function (e) {
    return e._l || (e._l = new v());
  },
  v = function () {
    this.a = [];
  },
  y = function (e, t) {
    return p(e.a, function (e) {
      return e[0] === t;
    });
  };
v.prototype = {
  get: function (e) {
    var t = y(this, e);
    if (t) return t[1];
  },
  has: function (e) {
    return !!y(this, e);
  },
  set: function (e, t) {
    var n = y(this, e);
    n ? n[1] = t : this.a.push([e, t]);
  },
  delete: function (e) {
    var t = d(this.a, function (t) {
      return t[0] === e;
    });
    return ~t && this.a.splice(t, 1), !!~t;
  }
}, legacyModule.exports = {
  getConstructor: function (e, t, n, i) {
    var u = e(function (e, r) {
      s(e, u, t, "_i"), e._t = t, e._i = h++, e._l = void 0, void 0 != r && c(r, n, e[i], e);
    });
    return r(u.prototype, {
      delete: function (e) {
        if (!a(e)) return !1;
        var n = o(e);
        return !0 === n ? m(f(this, t))["delete"](e) : n && l(n, this._i) && delete n[this._i];
      },
      has: function (e) {
        if (!a(e)) return !1;
        var n = o(e);
        return !0 === n ? m(f(this, t)).has(e) : n && l(n, this._i);
      }
    }), u;
  },
  def: function (e, t, n) {
    var r = o(i(t), !0);
    return !0 === r ? m(e).set(t, n) : r[e._i] = n, e;
  },
  ufstore: m
};
