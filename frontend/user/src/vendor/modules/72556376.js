let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./6f786f30.js"),
  i = require("./385a2f56.js"),
  a = require("./57474e57.js"),
  s = require("./724b496c.js"),
  c = require("./2b793531.js").KEY,
  u = require("./77555779.js"),
  l = require("./56797551.js"),
  f = require("./6c76416f.js"),
  p = require("./6b434b35.js"),
  d = require("./674c374e.js"),
  h = require("./7a4b6e68.js"),
  m = require("./2f735777.js"),
  v = require("./54316e72.js"),
  y = require("./45705844.js"),
  g = require("./3776594a.js"),
  b = require("./75382b75.js"),
  w = require("./696c3471.js"),
  x = require("./4f654f43.js"),
  O = require("./38424d74.js"),
  E = require("./7051474a.js"),
  _ = require("./2f4d6664.js"),
  k = require("./43547364.js"),
  S = require("./31354243.js"),
  C = require("./65367737.js"),
  j = require("./56352f31.js"),
  P = require("./49676761.js"),
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
}), S.f = ee, j.f = Q, require("./39484668.js").f = k.f = te, require("./4c734157.js").f = $, C.f = ne, i && !require("./46715048.js") && s(U, "propertyIsEnumerable", $, !0), h.f = function (e) {
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
}), M[I][F] || require("./56504f45.js")(M[I], F, M[I].valueOf), f(M, "Symbol"), f(Math, "Math", !0), f(r.JSON, "JSON", !0);
