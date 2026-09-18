let legacyModule = module,
  legacyExports = exports;
var r = require("./35543259.js"),
  o = require("./hasOwnLegacy.js"),
  i = require("./descriptorsSupport.js"),
  a = require("./59375a43.js"),
  s = require("./definePropertyEntry.js"),
  c = require("./362f3173.js").KEY,
  u = require("./tryCatchTestLegacy.js"),
  l = require("./3239732f.js"),
  f = require("./52664b42.js"),
  p = require("./59714163.js"),
  d = require("./55576958.js"),
  h = require("./7a4c6b47.js"),
  m = require("./5a786769.js"),
  v = require("./522b372b.js"),
  y = require("./6b414d48.js"),
  g = require("./354b375a.js"),
  b = require("./39334934.js"),
  w = require("./toObject.js"),
  x = require("./4e734f2f.js"),
  O = require("./47384d6f.js"),
  E = require("./72723169.js"),
  _ = require("./6f566d6c.js"),
  k = require("./41355867.js"),
  S = require("./7677754c.js"),
  C = require("./getOwnPropertySymbolsLegacy.js"),
  j = require("./definePropertyLegacy.js"),
  P = require("./7736474f.js"),
  T = S.f,
  L = j.f,
  N = k.f,
  M = r.Symbol,
  A = r.JSON,
  D = A && A.stringify,
  I = "prototype",
  R = d("_hidden"),
  F = d("toPrimitive"),
  V = {}.propertyIsEnumerable,
  z = l("symbol-registry"),
  B = l("symbols"),
  W = l("op-symbols"),
  U = Object[I],
  q = "function" == typeof M && !!C.f,
  H = r.QObject,
  Y = !H || !H[I] || !H[I].findChild,
  G = i && u(function () {
    return 7 != _(L({}, "a", {
      get: function () {
        return L(this, "a", {
          value: 7
        }).a;
      }
    })).a;
  }) ? function (e, t, n) {
    var r = T(U, t);
    r && delete U[t], L(e, t, n), r && e !== U && L(U, t, r);
  } : L,
  K = function (e) {
    var t = B[e] = _(M[I]);
    return t._k = e, t;
  },
  Z = q && "symbol" == typeof M.iterator ? function (e) {
    return "symbol" == typeof e;
  } : function (e) {
    return e instanceof M;
  },
  Q = function (e, t, n) {
    return e === U && Q(W, t, n), g(e), t = O(t, !0), g(n), o(B, t) ? (n.enumerable ? (o(e, R) && e[R][t] && (e[R][t] = !1), n = _(n, {
      enumerable: E(0, !1)
    })) : (o(e, R) || L(e, R, E(1, {})), e[R][t] = !0), G(e, t, n)) : L(e, t, n);
  },
  X = function (e, t) {
    g(e);
    var n,
      r = v(t = x(t)),
      o = 0,
      i = r.length;
    while (i > o) Q(e, n = r[o++], t[n]);
    return e;
  },
  J = function (e, t) {
    return void 0 === t ? _(e) : X(_(e), t);
  },
  $ = function (e) {
    var t = V.call(this, e = O(e, !0));
    return !(this === U && o(B, e) && !o(W, e)) && (!(t || !o(this, e) || !o(B, e) || o(this, R) && this[R][e]) || t);
  },
  ee = function (e, t) {
    if (e = x(e), t = O(t, !0), e !== U || !o(B, t) || o(W, t)) {
      var n = T(e, t);
      return !n || !o(B, t) || o(e, R) && e[R][t] || (n.enumerable = !0), n;
    }
  },
  te = function (e) {
    var t,
      n = N(x(e)),
      r = [],
      i = 0;
    while (n.length > i) o(B, t = n[i++]) || t == R || t == c || r.push(t);
    return r;
  },
  ne = function (e) {
    var t,
      n = e === U,
      r = N(n ? W : x(e)),
      i = [],
      a = 0;
    while (r.length > a) !o(B, t = r[a++]) || n && !o(U, t) || i.push(B[t]);
    return i;
  };
q || (M = function () {
  if (this instanceof M) throw TypeError("Symbol is not a constructor!");
  var e = p(arguments.length > 0 ? arguments[0] : void 0),
    t = function (n) {
      this === U && t.call(W, n), o(this, R) && o(this[R], e) && (this[R][e] = !1), G(this, e, E(1, n));
    };
  return i && Y && G(U, e, {
    configurable: !0,
    set: t
  }), K(e);
}, s(M[I], "toString", function () {
  return this._k;
}), S.f = ee, j.f = Q, require("./61722f70.js").f = k.f = te, require("./propertyIsEnumerableLegacy.js").f = $, C.f = ne, i && !require("./754f5053.js") && s(U, "propertyIsEnumerable", $, !0), h.f = function (e) {
  return K(d(e));
}), a(a.G + a.W + a.F * !q, {
  Symbol: M
});
for (var re = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), oe = 0; re.length > oe;) d(re[oe++]);
for (var ie = P(d.store), ae = 0; ie.length > ae;) m(ie[ae++]);
a(a.S + a.F * !q, "Symbol", {
  for: function (e) {
    return o(z, e += "") ? z[e] : z[e] = M(e);
  },
  keyFor: function (e) {
    if (!Z(e)) throw TypeError(e + " is not a symbol!");
    for (var t in z) if (z[t] === e) return t;
  },
  useSetter: function () {
    Y = !0;
  },
  useSimple: function () {
    Y = !1;
  }
}), a(a.S + a.F * !q, "Object", {
  create: J,
  defineProperty: Q,
  defineProperties: X,
  getOwnPropertyDescriptor: ee,
  getOwnPropertyNames: te,
  getOwnPropertySymbols: ne
});
var se = u(function () {
  C.f(1);
});
a(a.S + a.F * se, "Object", {
  getOwnPropertySymbols: function (e) {
    return C.f(w(e));
  }
}), A && a(a.S + a.F * (!q || u(function () {
  var e = M();
  return "[null]" != D([e]) || "{}" != D({
    a: e
  }) || "{}" != D(Object(e));
})), "JSON", {
  stringify: function (e) {
    var t,
      n,
      r = [e],
      o = 1;
    while (arguments.length > o) r.push(arguments[o++]);
    if (n = t = r[1], (b(t) || void 0 !== e) && !Z(e)) return y(t) || (t = function (e, t) {
      if ("function" == typeof n && (t = n.call(this, e, t)), !Z(t)) return t;
    }), r[1] = t, D.apply(A, r);
  }
}), M[I][F] || require("./definePropertyRuntime.js")(M[I], F, M[I].valueOf), f(M, "Symbol"), f(Math, "Math", !0), f(r.JSON, "JSON", !0);
