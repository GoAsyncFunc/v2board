let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return m;
}), defineExport(legacyExports, "b", function () {
  return g;
}), defineExport(legacyExports, "f", function () {
  return v;
}), defineExport(legacyExports, "c", function () {
  return y;
}), defineExport(legacyExports, "g", function () {
  return b;
}), defineExport(legacyExports, "e", function () {
  return w;
}), defineExport(legacyExports, "d", function () {
  return x;
}), defineExport(legacyExports, "h", function () {
  return _;
}), defineExport(legacyExports, "i", function () {
  return E;
}), defineExport(legacyExports, "m", function () {
  return S;
}), defineExport(legacyExports, "j", function () {
  return k;
}), defineExport(legacyExports, "n", function () {
  return C;
}), defineExport(legacyExports, "l", function () {
  return O;
}), defineExport(legacyExports, "k", function () {
  return T;
});
var r = require("./5142737a.js"),
  i = Math.pow,
  o = Math.sqrt,
  a = 1e-8,
  s = 1e-4,
  l = o(3),
  c = 1 / 3,
  u = Object(r["d"])(),
  h = Object(r["d"])(),
  f = Object(r["d"])();
function d(e) {
  return e > -a && e < a;
}
function p(e) {
  return e > a || e < -a;
}
function m(e, t, n, r, i) {
  var o = 1 - i;
  return o * o * (o * e + 3 * i * t) + i * i * (i * r + 3 * o * n);
}
function g(e, t, n, r, i) {
  var o = 1 - i;
  return 3 * (((t - e) * o + 2 * (n - t) * i) * o + (r - n) * i * i);
}
function v(e, t, n, r, a, s) {
  var u = r + 3 * (t - n) - e,
    h = 3 * (n - 2 * t + e),
    f = 3 * (t - e),
    p = e - a,
    m = h * h - 3 * u * f,
    g = h * f - 9 * u * p,
    v = f * f - 3 * h * p,
    y = 0;
  if (d(m) && d(g)) {
    if (d(h)) s[0] = 0;else {
      var b = -f / h;
      b >= 0 && b <= 1 && (s[y++] = b);
    }
  } else {
    var w = g * g - 4 * m * v;
    if (d(w)) {
      var x = g / m,
        _ = (b = -h / u + x, -x / 2);
      b >= 0 && b <= 1 && (s[y++] = b), _ >= 0 && _ <= 1 && (s[y++] = _);
    } else if (w > 0) {
      var E = o(w),
        S = m * h + 1.5 * u * (-g + E),
        k = m * h + 1.5 * u * (-g - E);
      S = S < 0 ? -i(-S, c) : i(S, c), k = k < 0 ? -i(-k, c) : i(k, c);
      b = (-h - (S + k)) / (3 * u);
      b >= 0 && b <= 1 && (s[y++] = b);
    } else {
      var C = (2 * m * h - 3 * u * g) / (2 * o(m * m * m)),
        O = Math.acos(C) / 3,
        T = o(m),
        L = Math.cos(O),
        A = (b = (-h - 2 * T * L) / (3 * u), _ = (-h + T * (L + l * Math.sin(O))) / (3 * u), (-h + T * (L - l * Math.sin(O))) / (3 * u));
      b >= 0 && b <= 1 && (s[y++] = b), _ >= 0 && _ <= 1 && (s[y++] = _), A >= 0 && A <= 1 && (s[y++] = A);
    }
  }
  return y;
}
function y(e, t, n, r, i) {
  var a = 6 * n - 12 * t + 6 * e,
    s = 9 * t + 3 * r - 3 * e - 9 * n,
    l = 3 * t - 3 * e,
    c = 0;
  if (d(s)) {
    if (p(a)) {
      var u = -l / a;
      u >= 0 && u <= 1 && (i[c++] = u);
    }
  } else {
    var h = a * a - 4 * s * l;
    if (d(h)) i[0] = -a / (2 * s);else if (h > 0) {
      var f = o(h),
        m = (u = (-a + f) / (2 * s), (-a - f) / (2 * s));
      u >= 0 && u <= 1 && (i[c++] = u), m >= 0 && m <= 1 && (i[c++] = m);
    }
  }
  return c;
}
function b(e, t, n, r, i, o) {
  var a = (t - e) * i + e,
    s = (n - t) * i + t,
    l = (r - n) * i + n,
    c = (s - a) * i + a,
    u = (l - s) * i + s,
    h = (u - c) * i + c;
  o[0] = e, o[1] = a, o[2] = c, o[3] = h, o[4] = h, o[5] = u, o[6] = l, o[7] = r;
}
function w(e, t, n, i, a, l, c, d, p, g, v) {
  var y,
    b,
    w,
    x,
    _,
    E = .005,
    S = 1 / 0;
  u[0] = p, u[1] = g;
  for (var k = 0; k < 1; k += .05) h[0] = m(e, n, a, c, k), h[1] = m(t, i, l, d, k), x = Object(r["f"])(u, h), x < S && (y = k, S = x);
  S = 1 / 0;
  for (var C = 0; C < 32; C++) {
    if (E < s) break;
    b = y - E, w = y + E, h[0] = m(e, n, a, c, b), h[1] = m(t, i, l, d, b), x = Object(r["f"])(h, u), b >= 0 && x < S ? (y = b, S = x) : (f[0] = m(e, n, a, c, w), f[1] = m(t, i, l, d, w), _ = Object(r["f"])(f, u), w <= 1 && _ < S ? (y = w, S = _) : E *= .5);
  }
  return v && (v[0] = m(e, n, a, c, y), v[1] = m(t, i, l, d, y)), o(S);
}
function x(e, t, n, r, i, o, a, s, l) {
  for (var c = e, u = t, h = 0, f = 1 / l, d = 1; d <= l; d++) {
    var p = d * f,
      g = m(e, n, i, a, p),
      v = m(t, r, o, s, p),
      y = g - c,
      b = v - u;
    h += Math.sqrt(y * y + b * b), c = g, u = v;
  }
  return h;
}
function _(e, t, n, r) {
  var i = 1 - r;
  return i * (i * e + 2 * r * t) + r * r * n;
}
function E(e, t, n, r) {
  return 2 * ((1 - r) * (t - e) + r * (n - t));
}
function S(e, t, n, r, i) {
  var a = e - 2 * t + n,
    s = 2 * (t - e),
    l = e - r,
    c = 0;
  if (d(a)) {
    if (p(s)) {
      var u = -l / s;
      u >= 0 && u <= 1 && (i[c++] = u);
    }
  } else {
    var h = s * s - 4 * a * l;
    if (d(h)) {
      u = -s / (2 * a);
      u >= 0 && u <= 1 && (i[c++] = u);
    } else if (h > 0) {
      var f = o(h),
        m = (u = (-s + f) / (2 * a), (-s - f) / (2 * a));
      u >= 0 && u <= 1 && (i[c++] = u), m >= 0 && m <= 1 && (i[c++] = m);
    }
  }
  return c;
}
function k(e, t, n) {
  var r = e + n - 2 * t;
  return 0 === r ? .5 : (e - t) / r;
}
function C(e, t, n, r, i) {
  var o = (t - e) * r + e,
    a = (n - t) * r + t,
    s = (a - o) * r + o;
  i[0] = e, i[1] = o, i[2] = s, i[3] = s, i[4] = a, i[5] = n;
}
function O(e, t, n, i, a, l, c, d, p) {
  var m,
    g = .005,
    v = 1 / 0;
  u[0] = c, u[1] = d;
  for (var y = 0; y < 1; y += .05) {
    h[0] = _(e, n, a, y), h[1] = _(t, i, l, y);
    var b = Object(r["f"])(u, h);
    b < v && (m = y, v = b);
  }
  v = 1 / 0;
  for (var w = 0; w < 32; w++) {
    if (g < s) break;
    var x = m - g,
      E = m + g;
    h[0] = _(e, n, a, x), h[1] = _(t, i, l, x);
    b = Object(r["f"])(h, u);
    if (x >= 0 && b < v) m = x, v = b;else {
      f[0] = _(e, n, a, E), f[1] = _(t, i, l, E);
      var S = Object(r["f"])(f, u);
      E <= 1 && S < v ? (m = E, v = S) : g *= .5;
    }
  }
  return p && (p[0] = _(e, n, a, m), p[1] = _(t, i, l, m)), o(v);
}
function T(e, t, n, r, i, o, a) {
  for (var s = e, l = t, c = 0, u = 1 / a, h = 1; h <= a; h++) {
    var f = h * u,
      d = _(e, n, i, f),
      p = _(t, r, o, f),
      m = d - s,
      g = p - l;
    c += Math.sqrt(m * m + g * g), s = d, l = p;
  }
  return c;
}
