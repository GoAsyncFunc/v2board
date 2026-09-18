let legacyModule = module,
  legacyExports = exports;
var r,
  o,
  i,
  a,
  s = require("./46715048.js"),
  c = require("./globalObject.js"),
  u = require("./77487272.js"),
  l = require("./toStringTagType.js"),
  f = require("./57474e57.js"),
  p = require("./75382b75.js"),
  d = require("./77596d38.js"),
  h = require("./59455649.js"),
  m = require("./346f3336.js"),
  v = require("./56657959.js"),
  y = require("./764d7834.js").set,
  g = require("./72545759.js")(),
  b = require("./2b6d6d6d.js"),
  w = require("./4e614176.js"),
  x = require("./30385178.js"),
  O = require("./74476433.js"),
  E = "Promise",
  _ = c.TypeError,
  k = c.process,
  S = k && k.versions,
  C = S && S.v8 || "",
  j = c[E],
  P = "process" == l(k),
  T = function () {},
  L = o = b.f,
  N = !!function () {
    try {
      var e = j.resolve(1),
        t = (e.constructor = {})[require("./wellKnownSymbol.js")("species")] = function (e) {
          e(T, T);
        };
      return (P || "function" == typeof PromiseRejectionEvent) && e.then(T) instanceof t && 0 !== C.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
    } catch (e) {}
  }(),
  M = function (e) {
    var t;
    return !(!p(e) || "function" != typeof (t = e.then)) && t;
  },
  A = function (e, t) {
    if (!e._n) {
      e._n = !0;
      var n = e._c;
      g(function () {
        var r = e._v,
          o = 1 == e._s,
          i = 0,
          a = function (t) {
            var n,
              i,
              a,
              s = o ? t.ok : t.fail,
              c = t.resolve,
              u = t.reject,
              l = t.domain;
            try {
              s ? (o || (2 == e._h && R(e), e._h = 1), !0 === s ? n = r : (l && l.enter(), n = s(r), l && (l.exit(), a = !0)), n === t.promise ? u(_("Promise-chain cycle")) : (i = M(n)) ? i.call(n, c, u) : c(n)) : u(r);
            } catch (e) {
              l && !a && l.exit(), u(e);
            }
          };
        while (n.length > i) a(n[i++]);
        e._c = [], e._n = !1, t && !e._h && D(e);
      });
    }
  },
  D = function (e) {
    y.call(c, function () {
      var t,
        n,
        r,
        o = e._v,
        i = I(e);
      if (i && (t = w(function () {
        P ? k.emit("unhandledRejection", o, e) : (n = c.onunhandledrejection) ? n({
          promise: e,
          reason: o
        }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o);
      }), e._h = P || I(e) ? 2 : 1), e._a = void 0, i && t.e) throw t.v;
    });
  },
  I = function (e) {
    return 1 !== e._h && 0 === (e._a || e._c).length;
  },
  R = function (e) {
    y.call(c, function () {
      var t;
      P ? k.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
        promise: e,
        reason: e._v
      });
    });
  },
  F = function (e) {
    var t = this;
    t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), A(t, !0));
  },
  V = function (e) {
    var t,
      n = this;
    if (!n._d) {
      n._d = !0, n = n._w || n;
      try {
        if (n === e) throw _("Promise can't be resolved itself");
        (t = M(e)) ? g(function () {
          var r = {
            _w: n,
            _d: !1
          };
          try {
            t.call(e, u(V, r, 1), u(F, r, 1));
          } catch (e) {
            F.call(r, e);
          }
        }) : (n._v = e, n._s = 1, A(n, !1));
      } catch (e) {
        F.call({
          _w: n,
          _d: !1
        }, e);
      }
    }
  };
N || (j = function (e) {
  h(this, j, E, "_h"), d(e), r.call(this);
  try {
    e(u(V, this, 1), u(F, this, 1));
  } catch (e) {
    F.call(this, e);
  }
}, r = function (e) {
  this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
}, r.prototype = require("./7a4e772b.js")(j.prototype, {
  then: function (e, t) {
    var n = L(v(this, j));
    return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = P ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && A(this, !1), n.promise;
  },
  catch: function (e) {
    return this.then(void 0, e);
  }
}), i = function () {
  var e = new r();
  this.promise = e, this.resolve = u(V, e, 1), this.reject = u(F, e, 1);
}, b.f = L = function (e) {
  return e === j || e === a ? new i(e) : o(e);
}), f(f.G + f.W + f.F * !N, {
  Promise: j
}), require("./6c76416f.js")(j, E), require("./67527169.js")(E), a = require("./62563566.js")[E], f(f.S + f.F * !N, E, {
  reject: function (e) {
    var t = L(this),
      n = t.reject;
    return n(e), t.promise;
  }
}), f(f.S + f.F * (s || !N), E, {
  resolve: function (e) {
    return O(s && this === a ? j : this, e);
  }
}), f(f.S + f.F * !(N && require("./63517958.js")(function (e) {
  j.all(e)["catch"](T);
})), E, {
  all: function (e) {
    var t = this,
      n = L(t),
      r = n.resolve,
      o = n.reject,
      i = w(function () {
        var n = [],
          i = 0,
          a = 1;
        m(e, !1, function (e) {
          var s = i++,
            c = !1;
          n.push(void 0), a++, t.resolve(e).then(function (e) {
            c || (c = !0, n[s] = e, --a || r(n));
          }, o);
        }), --a || r(n);
      });
    return i.e && o(i.v), n.promise;
  },
  race: function (e) {
    var t = this,
      n = L(t),
      r = n.reject,
      o = w(function () {
        m(e, !1, function (e) {
          t.resolve(e).then(n.resolve, r);
        });
      });
    return o.e && r(o.v), n.promise;
  }
});
