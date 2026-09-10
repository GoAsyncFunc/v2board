let legacyModule = module,
  legacyExports = exports;
var r = require("./56352f31.js").f,
  o = require("./2f4d6664.js"),
  i = require("./7a4e772b.js"),
  a = require("./77487272.js"),
  s = require("./59455649.js"),
  c = require("./346f3336.js"),
  u = require("./58645054.js"),
  l = require("./34384478.js"),
  f = require("./67527169.js"),
  p = require("./385a2f56.js"),
  d = require("./2b793531.js").fastKey,
  h = require("./4a633770.js"),
  m = p ? "_s" : "size",
  v = function (e, t) {
    var n,
      r = d(t);
    if ("F" !== r) return e._i[r];
    for (n = e._f; n; n = n.n) if (n.k == t) return n;
  };
legacyModule.exports = {
  getConstructor: function (e, t, n, u) {
    var l = e(function (e, r) {
      s(e, l, t, "_i"), e._t = t, e._i = o(null), e._f = void 0, e._l = void 0, e[m] = 0, void 0 != r && c(r, n, e[u], e);
    });
    return i(l.prototype, {
      clear: function () {
        for (var e = h(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
        e._f = e._l = void 0, e[m] = 0;
      },
      delete: function (e) {
        var n = h(this, t),
          r = v(n, e);
        if (r) {
          var o = r.n,
            i = r.p;
          delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[m]--;
        }
        return !!r;
      },
      forEach: function (e) {
        h(this, t);
        var n,
          r = a(e, arguments.length > 1 ? arguments[1] : void 0, 3);
        while (n = n ? n.n : this._f) {
          r(n.v, n.k, this);
          while (n && n.r) n = n.p;
        }
      },
      has: function (e) {
        return !!v(h(this, t), e);
      }
    }), p && r(l.prototype, "size", {
      get: function () {
        return h(this, t)[m];
      }
    }), l;
  },
  def: function (e, t, n) {
    var r,
      o,
      i = v(e, t);
    return i ? i.v = n : (e._l = i = {
      i: o = d(t, !0),
      k: t,
      v: n,
      p: r = e._l,
      n: void 0,
      r: !1
    }, e._f || (e._f = i), r && (r.n = i), e[m]++, "F" !== o && (e._i[o] = i)), e;
  },
  getEntry: v,
  setStrong: function (e, t, n) {
    u(e, t, function (e, n) {
      this._t = h(e, t), this._k = n, this._l = void 0;
    }, function () {
      var e = this,
        t = e._k,
        n = e._l;
      while (n && n.r) n = n.p;
      return e._t && (e._l = n = n ? n.n : e._t._f) ? l(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v]) : (e._t = void 0, l(1));
    }, n ? "entries" : "values", !n, !0), f(t);
  }
};
