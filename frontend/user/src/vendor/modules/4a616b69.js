let legacyModule = module,
  legacyExports = exports;
if (require("./descriptorsLegacySupport.js")) {
  var r = require("./pureMode.js"),
    o = require("./globalObject.js"),
    i = require("./tryCatchTest.js"),
    a = require("./57474e57.js"),
    s = require("./3838566e.js"),
    c = require("./794c4d59.js"),
    u = require("./77487272.js"),
    l = require("./ensureInstance.js"),
    f = require("./createPropertyDescriptor.js"),
    p = require("./56504f45.js"),
    d = require("./redefineAll.js"),
    h = require("./toInteger.js"),
    m = require("./toLength.js"),
    v = require("./6e594c71.js"),
    y = require("./toAbsoluteIndex.js"),
    g = require("./toPrimitive.js"),
    b = require("./hasOwn.js"),
    w = require("./toStringTagType.js"),
    x = require("./isObject.js"),
    O = require("./toObjectLegacy.js"),
    E = require("./isArrayIteratorMethod.js"),
    _ = require("./2f4d6664.js"),
    k = require("./42467438.js"),
    S = require("./39484668.js").f,
    C = require("./getIteratorMethod.js"),
    j = require("./uid.js"),
    P = require("./wellKnownSymbol.js"),
    T = require("./2b6f3570.js"),
    L = require("./arrayIndexOfFactory.js"),
    N = require("./56657959.js"),
    M = require("./arrayIterator.js"),
    A = require("./emptyExports.js"),
    D = require("./63517958.js"),
    I = require("./67527169.js"),
    R = require("./37556b30.js"),
    F = require("./776c5064.js"),
    V = require("./definePropertyHelper.js"),
    z = require("./31354243.js"),
    B = V.f,
    W = z.f,
    U = o.RangeError,
    q = o.TypeError,
    H = o.Uint8Array,
    Y = "ArrayBuffer",
    G = "Shared" + Y,
    K = "BYTES_PER_ELEMENT",
    Z = "prototype",
    Q = Array[Z],
    X = c.ArrayBuffer,
    J = c.DataView,
    $ = T(0),
    ee = T(2),
    te = T(3),
    ne = T(4),
    re = T(5),
    oe = T(6),
    ie = L(!0),
    ae = L(!1),
    se = M.values,
    ce = M.keys,
    ue = M.entries,
    le = Q.lastIndexOf,
    fe = Q.reduce,
    pe = Q.reduceRight,
    de = Q.join,
    he = Q.sort,
    me = Q.slice,
    ve = Q.toString,
    ye = Q.toLocaleString,
    ge = P("iterator"),
    be = P("toStringTag"),
    we = j("typed_constructor"),
    xe = j("def_constructor"),
    Oe = s.CONSTR,
    Ee = s.TYPED,
    _e = s.VIEW,
    ke = "Wrong length!",
    Se = T(1, function (e, t) {
      return Le(N(e, e[xe]), t);
    }),
    Ce = i(function () {
      return 1 === new H(new Uint16Array([1]).buffer)[0];
    }),
    je = !!H && !!H[Z].set && i(function () {
      new H(1).set({});
    }),
    Pe = function (e, t) {
      var n = h(e);
      if (n < 0 || n % t) throw U("Wrong offset!");
      return n;
    },
    Te = function (e) {
      if (x(e) && Ee in e) return e;
      throw q(e + " is not a typed array!");
    },
    Le = function (e, t) {
      if (!(x(e) && we in e)) throw q("It is not a typed array constructor!");
      return new e(t);
    },
    Ne = function (e, t) {
      return Me(N(e, e[xe]), t);
    },
    Me = function (e, t) {
      var n = 0,
        r = t.length,
        o = Le(e, r);
      while (r > n) o[n] = t[n++];
      return o;
    },
    Ae = function (e, t, n) {
      B(e, t, {
        get: function () {
          return this._d[n];
        }
      });
    },
    De = function (e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        s = O(e),
        c = arguments.length,
        l = c > 1 ? arguments[1] : void 0,
        f = void 0 !== l,
        p = C(s);
      if (void 0 != p && !E(p)) {
        for (a = p.call(s), r = [], t = 0; !(i = a.next()).done; t++) r.push(i.value);
        s = r;
      }
      for (f && c > 2 && (l = u(l, arguments[2], 2)), t = 0, n = m(s.length), o = Le(this, n); n > t; t++) o[t] = f ? l(s[t], t) : s[t];
      return o;
    },
    Ie = function () {
      var e = 0,
        t = arguments.length,
        n = Le(this, t);
      while (t > e) n[e] = arguments[e++];
      return n;
    },
    Re = !!H && i(function () {
      ye.call(new H(1));
    }),
    Fe = function () {
      return ye.apply(Re ? me.call(Te(this)) : Te(this), arguments);
    },
    Ve = {
      copyWithin: function (e, t) {
        return F.call(Te(this), e, t, arguments.length > 2 ? arguments[2] : void 0);
      },
      every: function (e) {
        return ne(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      fill: function (e) {
        return R.apply(Te(this), arguments);
      },
      filter: function (e) {
        return Ne(this, ee(Te(this), e, arguments.length > 1 ? arguments[1] : void 0));
      },
      find: function (e) {
        return re(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      findIndex: function (e) {
        return oe(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      forEach: function (e) {
        $(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      indexOf: function (e) {
        return ae(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      includes: function (e) {
        return ie(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      join: function (e) {
        return de.apply(Te(this), arguments);
      },
      lastIndexOf: function (e) {
        return le.apply(Te(this), arguments);
      },
      map: function (e) {
        return Se(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      reduce: function (e) {
        return fe.apply(Te(this), arguments);
      },
      reduceRight: function (e) {
        return pe.apply(Te(this), arguments);
      },
      reverse: function () {
        var e,
          t = this,
          n = Te(t).length,
          r = Math.floor(n / 2),
          o = 0;
        while (o < r) e = t[o], t[o++] = t[--n], t[n] = e;
        return t;
      },
      some: function (e) {
        return te(Te(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      sort: function (e) {
        return he.call(Te(this), e);
      },
      subarray: function (e, t) {
        var n = Te(this),
          r = n.length,
          o = y(e, r);
        return new (N(n, n[xe]))(n.buffer, n.byteOffset + o * n.BYTES_PER_ELEMENT, m((void 0 === t ? r : y(t, r)) - o));
      }
    },
    ze = function (e, t) {
      return Ne(this, me.call(Te(this), e, t));
    },
    Be = function (e) {
      Te(this);
      var t = Pe(arguments[1], 1),
        n = this.length,
        r = O(e),
        o = m(r.length),
        i = 0;
      if (o + t > n) throw U(ke);
      while (i < o) this[t + i] = r[i++];
    },
    We = {
      entries: function () {
        return ue.call(Te(this));
      },
      keys: function () {
        return ce.call(Te(this));
      },
      values: function () {
        return se.call(Te(this));
      }
    },
    Ue = function (e, t) {
      return x(e) && e[Ee] && "symbol" != typeof t && t in e && String(+t) == String(t);
    },
    qe = function (e, t) {
      return Ue(e, t = g(t, !0)) ? f(2, e[t]) : W(e, t);
    },
    He = function (e, t, n) {
      return !(Ue(e, t = g(t, !0)) && x(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? B(e, t, n) : (e[t] = n.value, e);
    };
  Oe || (z.f = qe, V.f = He), a(a.S + a.F * !Oe, "Object", {
    getOwnPropertyDescriptor: qe,
    defineProperty: He
  }), i(function () {
    ve.call({});
  }) && (ve = ye = function () {
    return de.call(this);
  });
  var Ye = d({}, Ve);
  d(Ye, We), p(Ye, ge, We.values), d(Ye, {
    slice: ze,
    set: Be,
    constructor: function () {},
    toString: ve,
    toLocaleString: Fe
  }), Ae(Ye, "buffer", "b"), Ae(Ye, "byteOffset", "o"), Ae(Ye, "byteLength", "l"), Ae(Ye, "length", "e"), B(Ye, be, {
    get: function () {
      return this[Ee];
    }
  }), legacyModule.exports = function (e, t, n, c) {
    c = !!c;
    var u = e + (c ? "Clamped" : "") + "Array",
      f = "get" + e,
      d = "set" + e,
      h = o[u],
      y = h || {},
      g = h && k(h),
      b = !h || !s.ABV,
      O = {},
      E = h && h[Z],
      C = function (e, n) {
        var r = e._d;
        return r.v[f](n * t + r.o, Ce);
      },
      j = function (e, n, r) {
        var o = e._d;
        c && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), o.v[d](n * t + o.o, r, Ce);
      },
      P = function (e, t) {
        B(e, t, {
          get: function () {
            return C(this, t);
          },
          set: function (e) {
            return j(this, t, e);
          },
          enumerable: !0
        });
      };
    b ? (h = n(function (e, n, r, o) {
      l(e, h, u, "_d");
      var i,
        a,
        s,
        c,
        f = 0,
        d = 0;
      if (x(n)) {
        if (!(n instanceof X || (c = w(n)) == Y || c == G)) return Ee in n ? Me(h, n) : De.call(h, n);
        i = n, d = Pe(r, t);
        var y = n.byteLength;
        if (void 0 === o) {
          if (y % t) throw U(ke);
          if (a = y - d, a < 0) throw U(ke);
        } else if (a = m(o) * t, a + d > y) throw U(ke);
        s = a / t;
      } else s = v(n), a = s * t, i = new X(a);
      p(e, "_d", {
        b: i,
        o: d,
        l: a,
        e: s,
        v: new J(i)
      });
      while (f < s) P(e, f++);
    }), E = h[Z] = _(Ye), p(E, "constructor", h)) : i(function () {
      h(1);
    }) && i(function () {
      new h(-1);
    }) && D(function (e) {
      new h(), new h(null), new h(1.5), new h(e);
    }, !0) || (h = n(function (e, n, r, o) {
      var i;
      return l(e, h, u), x(n) ? n instanceof X || (i = w(n)) == Y || i == G ? void 0 !== o ? new y(n, Pe(r, t), o) : void 0 !== r ? new y(n, Pe(r, t)) : new y(n) : Ee in n ? Me(h, n) : De.call(h, n) : new y(v(n));
    }), $(g !== Function.prototype ? S(y).concat(S(g)) : S(y), function (e) {
      e in h || p(h, e, y[e]);
    }), h[Z] = E, r || (E.constructor = h));
    var T = E[ge],
      L = !!T && ("values" == T.name || void 0 == T.name),
      N = We.values;
    p(h, we, !0), p(E, Ee, u), p(E, _e, !0), p(E, xe, h), (c ? new h(1)[be] == u : be in E) || B(E, be, {
      get: function () {
        return u;
      }
    }), O[u] = h, a(a.G + a.W + a.F * (h != y), O), a(a.S, u, {
      BYTES_PER_ELEMENT: t
    }), a(a.S + a.F * i(function () {
      y.of.call(h, 1);
    }), u, {
      from: De,
      of: Ie
    }), K in E || p(E, K, t), a(a.P, u, Ve), I(u), a(a.P + a.F * je, u, {
      set: Be
    }), a(a.P + a.F * !L, u, We), r || E.toString == ve || (E.toString = ve), a(a.P + a.F * i(function () {
      new h(1).slice();
    }), u, {
      slice: ze
    }), a(a.P + a.F * (i(function () {
      return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString();
    }) || !i(function () {
      E.toLocaleString.call([1, 2]);
    })), u, {
      toLocaleString: Fe
    }), A[u] = L ? T : N, r || L || p(E, ge, N);
  };
} else legacyModule.exports = function () {};
