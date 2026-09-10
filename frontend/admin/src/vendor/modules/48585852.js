let legacyModule = module,
  legacyExports = exports;
var r,
  i,
  o,
  a,
  s = require("./46715048.js"),
  l = require("./63304f79.js"),
  c = require("./77487272.js"),
  u = require("./32612f68.js"),
  h = require("./57474e57.js"),
  f = require("./75382b75.js"),
  d = require("./77596d38.js"),
  p = require("./59455649.js"),
  m = require("./346f3336.js"),
  g = require("./56657959.js"),
  v = require("./764d7834.js").set,
  y = require("./72545759.js")(),
  b = require("./2b6d6d6d.js"),
  w = require("./4e614176.js"),
  x = require("./30385178.js"),
  _ = require("./74476433.js"),
  E = "Promise",
  S = l.TypeError,
  k = l.process,
  C = k && k.versions,
  O = C && C.v8 || "",
  T = l[E],
  L = "process" == u(k),
  A = function () {},
  P = i = b.f,
  j = !!function () {
    try {
      var e = T.resolve(1),
        t = (e.constructor = {})[require("./674c374e.js")("species")] = function (e) {
          e(A, A);
        };
      return (L || "function" == typeof PromiseRejectionEvent) && e.then(A) instanceof t && 0 !== O.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
    } catch (e) {}
  }(),
  M = function (e) {
    var t;
    return !(!f(e) || "function" != typeof (t = e.then)) && t;
  },
  R = function (e, t) {
    if (!e._n) {
      e._n = !0;
      var n = e._c;
      y(function () {
        var r = e._v,
          i = 1 == e._s,
          o = 0,
          a = function (t) {
            var n,
              o,
              a,
              s = i ? t.ok : t.fail,
              l = t.resolve,
              c = t.reject,
              u = t.domain;
            try {
              s ? (i || (2 == e._h && I(e), e._h = 1), !0 === s ? n = r : (u && u.enter(), n = s(r), u && (u.exit(), a = !0)), n === t.promise ? c(S("Promise-chain cycle")) : (o = M(n)) ? o.call(n, l, c) : l(n)) : c(r);
            } catch (e) {
              u && !a && u.exit(), c(e);
            }
          };
        while (n.length > o) a(n[o++]);
        e._c = [], e._n = !1, t && !e._h && N(e);
      });
    }
  },
  N = function (e) {
    v.call(l, function () {
      var t,
        n,
        r,
        i = e._v,
        o = D(e);
      if (o && (t = w(function () {
        L ? k.emit("unhandledRejection", i, e) : (n = l.onunhandledrejection) ? n({
          promise: e,
          reason: i
        }) : (r = l.console) && r.error && r.error("Unhandled promise rejection", i);
      }), e._h = L || D(e) ? 2 : 1), e._a = void 0, o && t.e) throw t.v;
    });
  },
  D = function (e) {
    return 1 !== e._h && 0 === (e._a || e._c).length;
  },
  I = function (e) {
    v.call(l, function () {
      var t;
      L ? k.emit("rejectionHandled", e) : (t = l.onrejectionhandled) && t({
        promise: e,
        reason: e._v
      });
    });
  },
  $ = function (e) {
    var t = this;
    t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), R(t, !0));
  },
  F = function (e) {
    var t,
      n = this;
    if (!n._d) {
      n._d = !0, n = n._w || n;
      try {
        if (n === e) throw S("Promise can't be resolved itself");
        (t = M(e)) ? y(function () {
          var r = {
            _w: n,
            _d: !1
          };
          try {
            t.call(e, c(F, r, 1), c($, r, 1));
          } catch (e) {
            $.call(r, e);
          }
        }) : (n._v = e, n._s = 1, R(n, !1));
      } catch (e) {
        $.call({
          _w: n,
          _d: !1
        }, e);
      }
    }
  };
j || (T = function (e) {
  p(this, T, E, "_h"), d(e), r.call(this);
  try {
    e(c(F, this, 1), c($, this, 1));
  } catch (e) {
    $.call(this, e);
  }
}, r = function (e) {
  this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
}, r.prototype = require("./7a4e772b.js")(T.prototype, {
  then: function (e, t) {
    var n = P(g(this, T));
    return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = L ? k.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise;
  },
  catch: function (e) {
    return this.then(void 0, e);
  }
}), o = function () {
  var e = new r();
  this.promise = e, this.resolve = c(F, e, 1), this.reject = c($, e, 1);
}, b.f = P = function (e) {
  return e === T || e === a ? new o(e) : i(e);
}), h(h.G + h.W + h.F * !j, {
  Promise: T
}), require("./6c76416f.js")(T, E), require("./67527169.js")(E), a = require("./62563566.js")[E], h(h.S + h.F * !j, E, {
  reject: function (e) {
    var t = P(this),
      n = t.reject;
    return n(e), t.promise;
  }
}), h(h.S + h.F * (s || !j), E, {
  resolve: function (e) {
    return _(s && this === a ? T : this, e);
  }
}), h(h.S + h.F * !(j && require("./63517958.js")(function (e) {
  T.all(e)["catch"](A);
})), E, {
  all: function (e) {
    var t = this,
      n = P(t),
      r = n.resolve,
      i = n.reject,
      o = w(function () {
        var n = [],
          o = 0,
          a = 1;
        m(e, !1, function (e) {
          var s = o++,
            l = !1;
          n.push(void 0), a++, t.resolve(e).then(function (e) {
            l || (l = !0, n[s] = e, --a || r(n));
          }, i);
        }), --a || r(n);
      });
    return o.e && i(o.v), n.promise;
  },
  race: function (e) {
    var t = this,
      n = P(t),
      r = n.reject,
      i = w(function () {
        m(e, !1, function (e) {
          t.resolve(e).then(n.resolve, r);
        });
      });
    return i.e && r(i.v), n.promise;
  }
});
