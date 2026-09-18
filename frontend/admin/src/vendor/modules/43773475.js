let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js").f,
  i = require("./2f4d6664.js"),
  o = require("./7a4e772b.js"),
  a = require("./77487272.js"),
  s = require("./59455649.js"),
  l = require("./346f3336.js"),
  c = require("./58645054.js"),
  u = require("./iteratorResultLegacy.js"),
  h = require("./67527169.js"),
  f = require("./descriptorsLegacySupport.js"),
  d = require("./objectMeta.js").fastKey,
  p = require("./collectionReceiver.js"),
  m = f ? "_s" : "size",
  g = function (e, t) {
    var n,
      r = d(t);
    if ("F" !== r) return e._i[r];
    for (n = e._f; n; n = n.n) if (n.k == t) return n;
  };
legacyModule.exports = {
  getConstructor: function (e, t, n, c) {
    var u = e(function (e, r) {
      s(e, u, t, "_i"), e._t = t, e._i = i(null), e._f = void 0, e._l = void 0, e[m] = 0, void 0 != r && l(r, n, e[c], e);
    });
    return o(u.prototype, {
      clear: function () {
        for (var e = p(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
        e._f = e._l = void 0, e[m] = 0;
      },
      delete: function (e) {
        var n = p(this, t),
          r = g(n, e);
        if (r) {
          var i = r.n,
            o = r.p;
          delete n._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), n._f == r && (n._f = i), n._l == r && (n._l = o), n[m]--;
        }
        return !!r;
      },
      forEach: function (e) {
        p(this, t);
        var n,
          r = a(e, arguments.length > 1 ? arguments[1] : void 0, 3);
        while (n = n ? n.n : this._f) {
          r(n.v, n.k, this);
          while (n && n.r) n = n.p;
        }
      },
      has: function (e) {
        return !!g(p(this, t), e);
      }
    }), f && r(u.prototype, "size", {
      get: function () {
        return p(this, t)[m];
      }
    }), u;
  },
  def: function (e, t, n) {
    var r,
      i,
      o = g(e, t);
    return o ? o.v = n : (e._l = o = {
      i: i = d(t, !0),
      k: t,
      v: n,
      p: r = e._l,
      n: void 0,
      r: !1
    }, e._f || (e._f = o), r && (r.n = o), e[m]++, "F" !== i && (e._i[i] = o)), e;
  },
  getEntry: g,
  setStrong: function (e, t, n) {
    c(e, t, function (e, n) {
      this._t = p(e, t), this._k = n, this._l = void 0;
    }, function () {
      var e = this,
        t = e._k,
        n = e._l;
      while (n && n.r) n = n.p;
      return e._t && (e._l = n = n ? n.n : e._t._f) ? u(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v]) : (e._t = void 0, u(1));
    }, n ? "entries" : "values", !n, !0), h(t);
  }
};
