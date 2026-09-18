let legacyModule = module,
  legacyExports = exports;
if (require("./descriptorsLegacySupport.js")) {
  var r = require("./pureMode.js"),
    i = require("./globalObject.js"),
    o = require("./tryCatchTest.js"),
    a = require("./57474e57.js"),
    s = require("./3838566e.js"),
    l = require("./794c4d59.js"),
    c = require("./77487272.js"),
    u = require("./ensureInstance.js"),
    h = require("./createPropertyDescriptor.js"),
    f = require("./56504f45.js"),
    d = require("./redefineAll.js"),
    p = require("./toInteger.js"),
    m = require("./toLength.js"),
    g = require("./6e594c71.js"),
    v = require("./toAbsoluteIndex.js"),
    y = require("./toPrimitive.js"),
    b = require("./hasOwn.js"),
    w = require("./toStringTagType.js"),
    x = require("./isObject.js"),
    _ = require("./toObjectLegacy.js"),
    E = require("./isArrayIteratorMethod.js"),
    S = require("./2f4d6664.js"),
    k = require("./42467438.js"),
    C = require("./39484668.js").f,
    O = require("./getIteratorMethod.js"),
    T = require("./uid.js"),
    L = require("./wellKnownSymbol.js"),
    A = require("./2b6f3570.js"),
    P = require("./arrayIndexOfFactory.js"),
    j = require("./56657959.js"),
    M = require("./arrayIterator.js"),
    R = require("./emptyExports.js"),
    N = require("./63517958.js"),
    D = require("./67527169.js"),
    I = require("./37556b30.js"),
    $ = require("./776c5064.js"),
    F = require("./definePropertyHelper.js"),
    B = require("./31354243.js"),
    V = F.f,
    W = B.f,
    H = i.RangeError,
    U = i.TypeError,
    z = i.Uint8Array,
    G = "ArrayBuffer",
    q = "Shared" + G,
    K = "BYTES_PER_ELEMENT",
    Y = "prototype",
    X = Array[Y],
    Q = l.ArrayBuffer,
    Z = l.DataView,
    J = A(0),
    ee = A(2),
    te = A(3),
    ne = A(4),
    re = A(5),
    ie = A(6),
    oe = P(!0),
    ae = P(!1),
    se = M.values,
    le = M.keys,
    ce = M.entries,
    ue = X.lastIndexOf,
    he = X.reduce,
    fe = X.reduceRight,
    de = X.join,
    pe = X.sort,
    me = X.slice,
    ge = X.toString,
    ve = X.toLocaleString,
    ye = L("iterator"),
    be = L("toStringTag"),
    we = T("typed_constructor"),
    xe = T("def_constructor"),
    _e = s.CONSTR,
    Ee = s.TYPED,
    Se = s.VIEW,
    ke = "Wrong length!",
    Ce = A(1, function (e, t) {
      return Pe(j(e, e[xe]), t);
    }),
    Oe = o(function () {
      return 1 === new z(new Uint16Array([1]).buffer)[0];
    }),
    Te = !!z && !!z[Y].set && o(function () {
      new z(1).set({});
    }),
    Le = function (e, t) {
      var n = p(e);
      if (n < 0 || n % t) throw H("Wrong offset!");
      return n;
    },
    Ae = function (e) {
      if (x(e) && Ee in e) return e;
      throw U(e + " is not a typed array!");
    },
    Pe = function (e, t) {
      if (!(x(e) && we in e)) throw U("It is not a typed array constructor!");
      return new e(t);
    },
    je = function (e, t) {
      return Me(j(e, e[xe]), t);
    },
    Me = function (e, t) {
      var n = 0,
        r = t.length,
        i = Pe(e, r);
      while (r > n) i[n] = t[n++];
      return i;
    },
    Re = function (e, t, n) {
      V(e, t, {
        get: function () {
          return this._d[n];
        }
      });
    },
    Ne = function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = _(e),
        l = arguments.length,
        u = l > 1 ? arguments[1] : void 0,
        h = void 0 !== u,
        f = O(s);
      if (void 0 != f && !E(f)) {
        for (a = f.call(s), r = [], t = 0; !(o = a.next()).done; t++) r.push(o.value);
        s = r;
      }
      for (h && l > 2 && (u = c(u, arguments[2], 2)), t = 0, n = m(s.length), i = Pe(this, n); n > t; t++) i[t] = h ? u(s[t], t) : s[t];
      return i;
    },
    De = function () {
      var e = 0,
        t = arguments.length,
        n = Pe(this, t);
      while (t > e) n[e] = arguments[e++];
      return n;
    },
    Ie = !!z && o(function () {
      ve.call(new z(1));
    }),
    $e = function () {
      return ve.apply(Ie ? me.call(Ae(this)) : Ae(this), arguments);
    },
    Fe = {
      copyWithin: function (e, t) {
        return $.call(Ae(this), e, t, arguments.length > 2 ? arguments[2] : void 0);
      },
      every: function (e) {
        return ne(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      fill: function (e) {
        return I.apply(Ae(this), arguments);
      },
      filter: function (e) {
        return je(this, ee(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0));
      },
      find: function (e) {
        return re(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      findIndex: function (e) {
        return ie(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      forEach: function (e) {
        J(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      indexOf: function (e) {
        return ae(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      includes: function (e) {
        return oe(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      join: function (e) {
        return de.apply(Ae(this), arguments);
      },
      lastIndexOf: function (e) {
        return ue.apply(Ae(this), arguments);
      },
      map: function (e) {
        return Ce(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      reduce: function (e) {
        return he.apply(Ae(this), arguments);
      },
      reduceRight: function (e) {
        return fe.apply(Ae(this), arguments);
      },
      reverse: function () {
        var e,
          t = this,
          n = Ae(t).length,
          r = Math.floor(n / 2),
          i = 0;
        while (i < r) e = t[i], t[i++] = t[--n], t[n] = e;
        return t;
      },
      some: function (e) {
        return te(Ae(this), e, arguments.length > 1 ? arguments[1] : void 0);
      },
      sort: function (e) {
        return pe.call(Ae(this), e);
      },
      subarray: function (e, t) {
        var n = Ae(this),
          r = n.length,
          i = v(e, r);
        return new (j(n, n[xe]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, m((void 0 === t ? r : v(t, r)) - i));
      }
    },
    Be = function (e, t) {
      return je(this, me.call(Ae(this), e, t));
    },
    Ve = function (e) {
      Ae(this);
      var t = Le(arguments[1], 1),
        n = this.length,
        r = _(e),
        i = m(r.length),
        o = 0;
      if (i + t > n) throw H(ke);
      while (o < i) this[t + o] = r[o++];
    },
    We = {
      entries: function () {
        return ce.call(Ae(this));
      },
      keys: function () {
        return le.call(Ae(this));
      },
      values: function () {
        return se.call(Ae(this));
      }
    },
    He = function (e, t) {
      return x(e) && e[Ee] && "symbol" != typeof t && t in e && String(+t) == String(t);
    },
    Ue = function (e, t) {
      return He(e, t = y(t, !0)) ? h(2, e[t]) : W(e, t);
    },
    ze = function (e, t, n) {
      return !(He(e, t = y(t, !0)) && x(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? V(e, t, n) : (e[t] = n.value, e);
    };
  _e || (B.f = Ue, F.f = ze), a(a.S + a.F * !_e, "Object", {
    getOwnPropertyDescriptor: Ue,
    defineProperty: ze
  }), o(function () {
    ge.call({});
  }) && (ge = ve = function () {
    return de.call(this);
  });
  var Ge = d({}, Fe);
  d(Ge, We), f(Ge, ye, We.values), d(Ge, {
    slice: Be,
    set: Ve,
    constructor: function () {},
    toString: ge,
    toLocaleString: $e
  }), Re(Ge, "buffer", "b"), Re(Ge, "byteOffset", "o"), Re(Ge, "byteLength", "l"), Re(Ge, "length", "e"), V(Ge, be, {
    get: function () {
      return this[Ee];
    }
  }), legacyModule.exports = function (e, t, n, l) {
    l = !!l;
    var c = e + (l ? "Clamped" : "") + "Array",
      h = "get" + e,
      d = "set" + e,
      p = i[c],
      v = p || {},
      y = p && k(p),
      b = !p || !s.ABV,
      _ = {},
      E = p && p[Y],
      O = function (e, n) {
        var r = e._d;
        return r.v[h](n * t + r.o, Oe);
      },
      T = function (e, n, r) {
        var i = e._d;
        l && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.v[d](n * t + i.o, r, Oe);
      },
      L = function (e, t) {
        V(e, t, {
          get: function () {
            return O(this, t);
          },
          set: function (e) {
            return T(this, t, e);
          },
          enumerable: !0
        });
      };
    b ? (p = n(function (e, n, r, i) {
      u(e, p, c, "_d");
      var o,
        a,
        s,
        l,
        h = 0,
        d = 0;
      if (x(n)) {
        if (!(n instanceof Q || (l = w(n)) == G || l == q)) return Ee in n ? Me(p, n) : Ne.call(p, n);
        o = n, d = Le(r, t);
        var v = n.byteLength;
        if (void 0 === i) {
          if (v % t) throw H(ke);
          if (a = v - d, a < 0) throw H(ke);
        } else if (a = m(i) * t, a + d > v) throw H(ke);
        s = a / t;
      } else s = g(n), a = s * t, o = new Q(a);
      f(e, "_d", {
        b: o,
        o: d,
        l: a,
        e: s,
        v: new Z(o)
      });
      while (h < s) L(e, h++);
    }), E = p[Y] = S(Ge), f(E, "constructor", p)) : o(function () {
      p(1);
    }) && o(function () {
      new p(-1);
    }) && N(function (e) {
      new p(), new p(null), new p(1.5), new p(e);
    }, !0) || (p = n(function (e, n, r, i) {
      var o;
      return u(e, p, c), x(n) ? n instanceof Q || (o = w(n)) == G || o == q ? void 0 !== i ? new v(n, Le(r, t), i) : void 0 !== r ? new v(n, Le(r, t)) : new v(n) : Ee in n ? Me(p, n) : Ne.call(p, n) : new v(g(n));
    }), J(y !== Function.prototype ? C(v).concat(C(y)) : C(v), function (e) {
      e in p || f(p, e, v[e]);
    }), p[Y] = E, r || (E.constructor = p));
    var A = E[ye],
      P = !!A && ("values" == A.name || void 0 == A.name),
      j = We.values;
    f(p, we, !0), f(E, Ee, c), f(E, Se, !0), f(E, xe, p), (l ? new p(1)[be] == c : be in E) || V(E, be, {
      get: function () {
        return c;
      }
    }), _[c] = p, a(a.G + a.W + a.F * (p != v), _), a(a.S, c, {
      BYTES_PER_ELEMENT: t
    }), a(a.S + a.F * o(function () {
      v.of.call(p, 1);
    }), c, {
      from: Ne,
      of: De
    }), K in E || f(E, K, t), a(a.P, c, Fe), D(c), a(a.P + a.F * Te, c, {
      set: Ve
    }), a(a.P + a.F * !P, c, We), r || E.toString == ge || (E.toString = ge), a(a.P + a.F * o(function () {
      new p(1).slice();
    }), c, {
      slice: Be
    }), a(a.P + a.F * (o(function () {
      return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString();
    }) || !o(function () {
      E.toLocaleString.call([1, 2]);
    })), c, {
      toLocaleString: $e
    }), R[c] = P ? A : j, r || P || f(E, ye, j);
  };
} else legacyModule.exports = function () {};
