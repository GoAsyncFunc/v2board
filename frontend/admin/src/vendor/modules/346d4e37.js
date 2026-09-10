let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return d;
}), defineExport(legacyExports, "c", function () {
  return p;
}), defineExport(legacyExports, "b", function () {
  return v;
}), defineExport(legacyExports, "e", function () {
  return y;
}), defineExport(legacyExports, "a", function () {
  return b;
});
var r = require("./5142737a.js"),
  i = require("./536a3969.js"),
  o = Math.min,
  a = Math.max,
  s = Math.sin,
  l = Math.cos,
  c = 2 * Math.PI,
  u = r["d"](),
  h = r["d"](),
  f = r["d"]();
function d(e, t, n) {
  if (0 !== e.length) {
    for (var r = e[0], i = r[0], s = r[0], l = r[1], c = r[1], u = 1; u < e.length; u++) r = e[u], i = o(i, r[0]), s = a(s, r[0]), l = o(l, r[1]), c = a(c, r[1]);
    t[0] = i, t[1] = l, n[0] = s, n[1] = c;
  }
}
function p(e, t, n, r, i, s) {
  i[0] = o(e, n), i[1] = o(t, r), s[0] = a(e, n), s[1] = a(t, r);
}
var m = [],
  g = [];
function v(e, t, n, r, s, l, c, u, h, f) {
  var d = i["c"],
    p = i["a"],
    v = d(e, n, s, c, m);
  h[0] = 1 / 0, h[1] = 1 / 0, f[0] = -1 / 0, f[1] = -1 / 0;
  for (var y = 0; y < v; y++) {
    var b = p(e, n, s, c, m[y]);
    h[0] = o(b, h[0]), f[0] = a(b, f[0]);
  }
  v = d(t, r, l, u, g);
  for (y = 0; y < v; y++) {
    var w = p(t, r, l, u, g[y]);
    h[1] = o(w, h[1]), f[1] = a(w, f[1]);
  }
  h[0] = o(e, h[0]), f[0] = a(e, f[0]), h[0] = o(c, h[0]), f[0] = a(c, f[0]), h[1] = o(t, h[1]), f[1] = a(t, f[1]), h[1] = o(u, h[1]), f[1] = a(u, f[1]);
}
function y(e, t, n, r, s, l, c, u) {
  var h = i["j"],
    f = i["h"],
    d = a(o(h(e, n, s), 1), 0),
    p = a(o(h(t, r, l), 1), 0),
    m = f(e, n, s, d),
    g = f(t, r, l, p);
  c[0] = o(e, s, m), c[1] = o(t, l, g), u[0] = a(e, s, m), u[1] = a(t, l, g);
}
function b(e, t, n, i, o, a, d, p, m) {
  var g = r["j"],
    v = r["i"],
    y = Math.abs(o - a);
  if (y % c < 1e-4 && y > 1e-4) return p[0] = e - n, p[1] = t - i, m[0] = e + n, void (m[1] = t + i);
  if (u[0] = l(o) * n + e, u[1] = s(o) * i + t, h[0] = l(a) * n + e, h[1] = s(a) * i + t, g(p, u, h), v(m, u, h), o %= c, o < 0 && (o += c), a %= c, a < 0 && (a += c), o > a && !d ? a += c : o < a && d && (o += c), d) {
    var b = a;
    a = o, o = b;
  }
  for (var w = 0; w < a; w += Math.PI / 2) w > o && (f[0] = l(w) * n + e, f[1] = s(w) * i + t, g(p, f, p), v(m, f, m));
}
