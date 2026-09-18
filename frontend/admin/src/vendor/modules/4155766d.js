let legacyModule = module,
  legacyExports = exports;
var r = require("./35543259.js"),
  i = require("./hasOwnLegacy.js"),
  o = require("./descriptorsSupport.js"),
  a = require("./59375a43.js"),
  s = require("./definePropertyEntry.js"),
  l = require("./362f3173.js").KEY,
  c = require("./tryCatchTestLegacy.js"),
  u = require("./3239732f.js"),
  h = require("./52664b42.js"),
  f = require("./59714163.js"),
  d = require("./55576958.js"),
  p = require("./wellKnownSymbolFactory.js"),
  m = require("./5a786769.js"),
  g = require("./522b372b.js"),
  v = require("./6b414d48.js"),
  y = require("./assertObjectLegacy.js"),
  b = require("./isObjectLegacy.js"),
  w = require("./toObject.js"),
  x = require("./toArray.js"),
  _ = require("./47384d6f.js"),
  E = require("./propertyDescriptorFlags.js"),
  S = require("./6f566d6c.js"),
  k = require("./41355867.js"),
  C = require("./7677754c.js"),
  O = require("./getOwnPropertySymbolsLegacy.js"),
  T = require("./definePropertyLegacy.js"),
  L = require("./7736474f.js"),
  A = C.f,
  P = T.f,
  j = k.f,
  M = r.Symbol,
  R = r.JSON,
  N = R && R.stringify,
  D = "prototype",
  I = d("_hidden"),
  $ = d("toPrimitive"),
  F = {}.propertyIsEnumerable,
  B = u("symbol-registry"),
  V = u("symbols"),
  W = u("op-symbols"),
  H = Object[D],
  U = "function" == typeof M && !!O.f,
  z = r.QObject,
  G = !z || !z[D] || !z[D].findChild,
  q = o && c(function () {
    return 7 != S(P({}, "a", {
      get: function () {
        return P(this, "a", {
          value: 7
        }).a;
      }
    })).a;
  }) ? function (e, t, n) {
    var r = A(H, t);
    r && delete H[t], P(e, t, n), r && e !== H && P(H, t, r);
  } : P,
  K = function (e) {
    var t = V[e] = S(M[D]);
    return t._k = e, t;
  },
  Y = U && "symbol" == typeof M.iterator ? function (e) {
    return "symbol" == typeof e;
  } : function (e) {
    return e instanceof M;
  },
  X = function (e, t, n) {
    return e === H && X(W, t, n), y(e), t = _(t, !0), y(n), i(V, t) ? (n.enumerable ? (i(e, I) && e[I][t] && (e[I][t] = !1), n = S(n, {
      enumerable: E(0, !1)
    })) : (i(e, I) || P(e, I, E(1, {})), e[I][t] = !0), q(e, t, n)) : P(e, t, n);
  },
  Q = function (e, t) {
    y(e);
    var n,
      r = g(t = x(t)),
      i = 0,
      o = r.length;
    while (o > i) X(e, n = r[i++], t[n]);
    return e;
  },
  Z = function (e, t) {
    return void 0 === t ? S(e) : Q(S(e), t);
  },
  J = function (e) {
    var t = F.call(this, e = _(e, !0));
    return !(this === H && i(V, e) && !i(W, e)) && (!(t || !i(this, e) || !i(V, e) || i(this, I) && this[I][e]) || t);
  },
  ee = function (e, t) {
    if (e = x(e), t = _(t, !0), e !== H || !i(V, t) || i(W, t)) {
      var n = A(e, t);
      return !n || !i(V, t) || i(e, I) && e[I][t] || (n.enumerable = !0), n;
    }
  },
  te = function (e) {
    var t,
      n = j(x(e)),
      r = [],
      o = 0;
    while (n.length > o) i(V, t = n[o++]) || t == I || t == l || r.push(t);
    return r;
  },
  ne = function (e) {
    var t,
      n = e === H,
      r = j(n ? W : x(e)),
      o = [],
      a = 0;
    while (r.length > a) !i(V, t = r[a++]) || n && !i(H, t) || o.push(V[t]);
    return o;
  };
U || (M = function () {
  if (this instanceof M) throw TypeError("Symbol is not a constructor!");
  var e = f(arguments.length > 0 ? arguments[0] : void 0),
    t = function (n) {
      this === H && t.call(W, n), i(this, I) && i(this[I], e) && (this[I][e] = !1), q(this, e, E(1, n));
    };
  return o && G && q(H, e, {
    configurable: !0,
    set: t
  }), K(e);
}, s(M[D], "toString", function () {
  return this._k;
}), C.f = ee, T.f = X, require("./61722f70.js").f = k.f = te, require("./propertyIsEnumerableLegacy.js").f = J, O.f = ne, o && !require("./trueValue.js") && s(H, "propertyIsEnumerable", J, !0), p.f = function (e) {
  return K(d(e));
}), a(a.G + a.W + a.F * !U, {
  Symbol: M
});
for (var re = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ie = 0; re.length > ie;) d(re[ie++]);
for (var oe = L(d.store), ae = 0; oe.length > ae;) m(oe[ae++]);
a(a.S + a.F * !U, "Symbol", {
  for: function (e) {
    return i(B, e += "") ? B[e] : B[e] = M(e);
  },
  keyFor: function (e) {
    if (!Y(e)) throw TypeError(e + " is not a symbol!");
    for (var t in B) if (B[t] === e) return t;
  },
  useSetter: function () {
    G = !0;
  },
  useSimple: function () {
    G = !1;
  }
}), a(a.S + a.F * !U, "Object", {
  create: Z,
  defineProperty: X,
  defineProperties: Q,
  getOwnPropertyDescriptor: ee,
  getOwnPropertyNames: te,
  getOwnPropertySymbols: ne
});
var se = c(function () {
  O.f(1);
});
a(a.S + a.F * se, "Object", {
  getOwnPropertySymbols: function (e) {
    return O.f(w(e));
  }
}), R && a(a.S + a.F * (!U || c(function () {
  var e = M();
  return "[null]" != N([e]) || "{}" != N({
    a: e
  }) || "{}" != N(Object(e));
})), "JSON", {
  stringify: function (e) {
    var t,
      n,
      r = [e],
      i = 1;
    while (arguments.length > i) r.push(arguments[i++]);
    if (n = t = r[1], (b(t) || void 0 !== e) && !Y(e)) return v(t) || (t = function (e, t) {
      if ("function" == typeof n && (t = n.call(this, e, t)), !Y(t)) return t;
    }), r[1] = t, N.apply(R, r);
  }
}), M[D][$] || require("./definePropertyRuntime.js")(M[D], $, M[D].valueOf), h(M, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0);
