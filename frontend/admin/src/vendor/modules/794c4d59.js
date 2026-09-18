let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = require("./descriptorsLegacySupport.js"),
  o = require("./pureMode.js"),
  a = require("./3838566e.js"),
  s = require("./56504f45.js"),
  l = require("./7a4e772b.js"),
  c = require("./tryCatchTest.js"),
  u = require("./59455649.js"),
  h = require("./toInteger.js"),
  f = require("./4f735664.js"),
  d = require("./6e594c71.js"),
  p = require("./39484668.js").f,
  m = require("./definePropertyHelper.js").f,
  g = require("./37556b30.js"),
  v = require("./setToStringTag.js"),
  y = "ArrayBuffer",
  b = "DataView",
  w = "prototype",
  x = "Wrong length!",
  _ = "Wrong index!",
  E = r[y],
  S = r[b],
  k = r.Math,
  C = r.RangeError,
  O = r.Infinity,
  T = E,
  L = k.abs,
  A = k.pow,
  P = k.floor,
  j = k.log,
  M = k.LN2,
  R = "buffer",
  N = "byteLength",
  D = "byteOffset",
  I = i ? "_b" : R,
  $ = i ? "_l" : N,
  F = i ? "_o" : D;
function B(e, t, n) {
  var r,
    i,
    o,
    a = new Array(n),
    s = 8 * n - t - 1,
    l = (1 << s) - 1,
    c = l >> 1,
    u = 23 === t ? A(2, -24) - A(2, -77) : 0,
    h = 0,
    f = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
  for (e = L(e), e != e || e === O ? (i = e != e ? 1 : 0, r = l) : (r = P(j(e) / M), e * (o = A(2, -r)) < 1 && (r--, o *= 2), e += r + c >= 1 ? u / o : u * A(2, 1 - c), e * o >= 2 && (r++, o /= 2), r + c >= l ? (i = 0, r = l) : r + c >= 1 ? (i = (e * o - 1) * A(2, t), r += c) : (i = e * A(2, c - 1) * A(2, t), r = 0)); t >= 8; a[h++] = 255 & i, i /= 256, t -= 8);
  for (r = r << t | i, s += t; s > 0; a[h++] = 255 & r, r /= 256, s -= 8);
  return a[--h] |= 128 * f, a;
}
function V(e, t, n) {
  var r,
    i = 8 * n - t - 1,
    o = (1 << i) - 1,
    a = o >> 1,
    s = i - 7,
    l = n - 1,
    c = e[l--],
    u = 127 & c;
  for (c >>= 7; s > 0; u = 256 * u + e[l], l--, s -= 8);
  for (r = u & (1 << -s) - 1, u >>= -s, s += t; s > 0; r = 256 * r + e[l], l--, s -= 8);
  if (0 === u) u = 1 - a;else {
    if (u === o) return r ? NaN : c ? -O : O;
    r += A(2, t), u -= a;
  }
  return (c ? -1 : 1) * r * A(2, u - t);
}
function W(e) {
  return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0];
}
function H(e) {
  return [255 & e];
}
function U(e) {
  return [255 & e, e >> 8 & 255];
}
function z(e) {
  return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255];
}
function G(e) {
  return B(e, 52, 8);
}
function q(e) {
  return B(e, 23, 4);
}
function K(e, t, n) {
  m(e[w], t, {
    get: function () {
      return this[n];
    }
  });
}
function Y(e, t, n, r) {
  var i = +n,
    o = d(i);
  if (o + t > e[$]) throw C(_);
  var a = e[I]._b,
    s = o + e[F],
    l = a.slice(s, s + t);
  return r ? l : l.reverse();
}
function X(e, t, n, r, i, o) {
  var a = +n,
    s = d(a);
  if (s + t > e[$]) throw C(_);
  for (var l = e[I]._b, c = s + e[F], u = r(+i), h = 0; h < t; h++) l[c + h] = u[o ? h : t - h - 1];
}
if (a.ABV) {
  if (!c(function () {
    E(1);
  }) || !c(function () {
    new E(-1);
  }) || c(function () {
    return new E(), new E(1.5), new E(NaN), E.name != y;
  })) {
    E = function (e) {
      return u(this, E), new T(d(e));
    };
    for (var Q, Z = E[w] = T[w], J = p(T), ee = 0; J.length > ee;) (Q = J[ee++]) in E || s(E, Q, T[Q]);
    o || (Z.constructor = E);
  }
  var te = new S(new E(2)),
    ne = S[w].setInt8;
  te.setInt8(0, 2147483648), te.setInt8(1, 2147483649), !te.getInt8(0) && te.getInt8(1) || l(S[w], {
    setInt8: function (e, t) {
      ne.call(this, e, t << 24 >> 24);
    },
    setUint8: function (e, t) {
      ne.call(this, e, t << 24 >> 24);
    }
  }, !0);
} else E = function (e) {
  u(this, E, y);
  var t = d(e);
  this._b = g.call(new Array(t), 0), this[$] = t;
}, S = function (e, t, n) {
  u(this, S, b), u(e, E, b);
  var r = e[$],
    i = h(t);
  if (i < 0 || i > r) throw C("Wrong offset!");
  if (n = void 0 === n ? r - i : f(n), i + n > r) throw C(x);
  this[I] = e, this[F] = i, this[$] = n;
}, i && (K(E, N, "_l"), K(S, R, "_b"), K(S, N, "_l"), K(S, D, "_o")), l(S[w], {
  getInt8: function (e) {
    return Y(this, 1, e)[0] << 24 >> 24;
  },
  getUint8: function (e) {
    return Y(this, 1, e)[0];
  },
  getInt16: function (e) {
    var t = Y(this, 2, e, arguments[1]);
    return (t[1] << 8 | t[0]) << 16 >> 16;
  },
  getUint16: function (e) {
    var t = Y(this, 2, e, arguments[1]);
    return t[1] << 8 | t[0];
  },
  getInt32: function (e) {
    return W(Y(this, 4, e, arguments[1]));
  },
  getUint32: function (e) {
    return W(Y(this, 4, e, arguments[1])) >>> 0;
  },
  getFloat32: function (e) {
    return V(Y(this, 4, e, arguments[1]), 23, 4);
  },
  getFloat64: function (e) {
    return V(Y(this, 8, e, arguments[1]), 52, 8);
  },
  setInt8: function (e, t) {
    X(this, 1, e, H, t);
  },
  setUint8: function (e, t) {
    X(this, 1, e, H, t);
  },
  setInt16: function (e, t) {
    X(this, 2, e, U, t, arguments[2]);
  },
  setUint16: function (e, t) {
    X(this, 2, e, U, t, arguments[2]);
  },
  setInt32: function (e, t) {
    X(this, 4, e, z, t, arguments[2]);
  },
  setUint32: function (e, t) {
    X(this, 4, e, z, t, arguments[2]);
  },
  setFloat32: function (e, t) {
    X(this, 4, e, q, t, arguments[2]);
  },
  setFloat64: function (e, t) {
    X(this, 8, e, G, t, arguments[2]);
  }
});
v(E, y), v(S, b), s(S[w], a.VIEW, !0), legacyExports[y] = E, legacyExports[b] = S;
