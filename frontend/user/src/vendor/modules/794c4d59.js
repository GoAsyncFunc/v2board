let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./descriptorsLegacySupport.js"),
  i = require("./46715048.js"),
  a = require("./3838566e.js"),
  s = require("./56504f45.js"),
  c = require("./7a4e772b.js"),
  u = require("./77555779.js"),
  l = require("./59455649.js"),
  f = require("./41555777.js"),
  p = require("./4f735664.js"),
  d = require("./6e594c71.js"),
  h = require("./39484668.js").f,
  m = require("./definePropertyHelper.js").f,
  v = require("./37556b30.js"),
  y = require("./6c76416f.js"),
  g = "ArrayBuffer",
  b = "DataView",
  w = "prototype",
  x = "Wrong length!",
  O = "Wrong index!",
  E = r[g],
  _ = r[b],
  k = r.Math,
  S = r.RangeError,
  C = r.Infinity,
  j = E,
  P = k.abs,
  T = k.pow,
  L = k.floor,
  N = k.log,
  M = k.LN2,
  A = "buffer",
  D = "byteLength",
  I = "byteOffset",
  R = o ? "_b" : A,
  F = o ? "_l" : D,
  V = o ? "_o" : I;
function z(e, t, n) {
  var r,
    o,
    i,
    a = new Array(n),
    s = 8 * n - t - 1,
    c = (1 << s) - 1,
    u = c >> 1,
    l = 23 === t ? T(2, -24) - T(2, -77) : 0,
    f = 0,
    p = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
  for (e = P(e), e != e || e === C ? (o = e != e ? 1 : 0, r = c) : (r = L(N(e) / M), e * (i = T(2, -r)) < 1 && (r--, i *= 2), e += r + u >= 1 ? l / i : l * T(2, 1 - u), e * i >= 2 && (r++, i /= 2), r + u >= c ? (o = 0, r = c) : r + u >= 1 ? (o = (e * i - 1) * T(2, t), r += u) : (o = e * T(2, u - 1) * T(2, t), r = 0)); t >= 8; a[f++] = 255 & o, o /= 256, t -= 8);
  for (r = r << t | o, s += t; s > 0; a[f++] = 255 & r, r /= 256, s -= 8);
  return a[--f] |= 128 * p, a;
}
function B(e, t, n) {
  var r,
    o = 8 * n - t - 1,
    i = (1 << o) - 1,
    a = i >> 1,
    s = o - 7,
    c = n - 1,
    u = e[c--],
    l = 127 & u;
  for (u >>= 7; s > 0; l = 256 * l + e[c], c--, s -= 8);
  for (r = l & (1 << -s) - 1, l >>= -s, s += t; s > 0; r = 256 * r + e[c], c--, s -= 8);
  if (0 === l) l = 1 - a;else {
    if (l === i) return r ? NaN : u ? -C : C;
    r += T(2, t), l -= a;
  }
  return (u ? -1 : 1) * r * T(2, l - t);
}
function W(e) {
  return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0];
}
function U(e) {
  return [255 & e];
}
function q(e) {
  return [255 & e, e >> 8 & 255];
}
function H(e) {
  return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255];
}
function Y(e) {
  return z(e, 52, 8);
}
function G(e) {
  return z(e, 23, 4);
}
function K(e, t, n) {
  m(e[w], t, {
    get: function () {
      return this[n];
    }
  });
}
function Z(e, t, n, r) {
  var o = +n,
    i = d(o);
  if (i + t > e[F]) throw S(O);
  var a = e[R]._b,
    s = i + e[V],
    c = a.slice(s, s + t);
  return r ? c : c.reverse();
}
function Q(e, t, n, r, o, i) {
  var a = +n,
    s = d(a);
  if (s + t > e[F]) throw S(O);
  for (var c = e[R]._b, u = s + e[V], l = r(+o), f = 0; f < t; f++) c[u + f] = l[i ? f : t - f - 1];
}
if (a.ABV) {
  if (!u(function () {
    E(1);
  }) || !u(function () {
    new E(-1);
  }) || u(function () {
    return new E(), new E(1.5), new E(NaN), E.name != g;
  })) {
    E = function (e) {
      return l(this, E), new j(d(e));
    };
    for (var X, J = E[w] = j[w], $ = h(j), ee = 0; $.length > ee;) (X = $[ee++]) in E || s(E, X, j[X]);
    i || (J.constructor = E);
  }
  var te = new _(new E(2)),
    ne = _[w].setInt8;
  te.setInt8(0, 2147483648), te.setInt8(1, 2147483649), !te.getInt8(0) && te.getInt8(1) || c(_[w], {
    setInt8: function (e, t) {
      ne.call(this, e, t << 24 >> 24);
    },
    setUint8: function (e, t) {
      ne.call(this, e, t << 24 >> 24);
    }
  }, !0);
} else E = function (e) {
  l(this, E, g);
  var t = d(e);
  this._b = v.call(new Array(t), 0), this[F] = t;
}, _ = function (e, t, n) {
  l(this, _, b), l(e, E, b);
  var r = e[F],
    o = f(t);
  if (o < 0 || o > r) throw S("Wrong offset!");
  if (n = void 0 === n ? r - o : p(n), o + n > r) throw S(x);
  this[R] = e, this[V] = o, this[F] = n;
}, o && (K(E, D, "_l"), K(_, A, "_b"), K(_, D, "_l"), K(_, I, "_o")), c(_[w], {
  getInt8: function (e) {
    return Z(this, 1, e)[0] << 24 >> 24;
  },
  getUint8: function (e) {
    return Z(this, 1, e)[0];
  },
  getInt16: function (e) {
    var t = Z(this, 2, e, arguments[1]);
    return (t[1] << 8 | t[0]) << 16 >> 16;
  },
  getUint16: function (e) {
    var t = Z(this, 2, e, arguments[1]);
    return t[1] << 8 | t[0];
  },
  getInt32: function (e) {
    return W(Z(this, 4, e, arguments[1]));
  },
  getUint32: function (e) {
    return W(Z(this, 4, e, arguments[1])) >>> 0;
  },
  getFloat32: function (e) {
    return B(Z(this, 4, e, arguments[1]), 23, 4);
  },
  getFloat64: function (e) {
    return B(Z(this, 8, e, arguments[1]), 52, 8);
  },
  setInt8: function (e, t) {
    Q(this, 1, e, U, t);
  },
  setUint8: function (e, t) {
    Q(this, 1, e, U, t);
  },
  setInt16: function (e, t) {
    Q(this, 2, e, q, t, arguments[2]);
  },
  setUint16: function (e, t) {
    Q(this, 2, e, q, t, arguments[2]);
  },
  setInt32: function (e, t) {
    Q(this, 4, e, H, t, arguments[2]);
  },
  setUint32: function (e, t) {
    Q(this, 4, e, H, t, arguments[2]);
  },
  setFloat32: function (e, t) {
    Q(this, 4, e, G, t, arguments[2]);
  },
  setFloat64: function (e, t) {
    Q(this, 8, e, Y, t, arguments[2]);
  }
});
y(E, g), y(_, b), s(_[w], a.VIEW, !0), legacyExports[g] = E, legacyExports[b] = _;
