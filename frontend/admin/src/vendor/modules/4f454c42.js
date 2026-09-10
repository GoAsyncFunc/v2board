let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "i", function () {
  return s;
}), defineExport(legacyExports, "m", function () {
  return l;
}), defineExport(legacyExports, "q", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return c;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "d", function () {
  return h;
}), defineExport(legacyExports, "a", function () {
  return p;
}), defineExport(legacyExports, "p", function () {
  return g;
}), defineExport(legacyExports, "h", function () {
  return m;
}), defineExport(legacyExports, "l", function () {
  return y;
}), defineExport(legacyExports, "n", function () {
  return b;
}), defineExport(legacyExports, "o", function () {
  return x;
}), defineExport(legacyExports, "j", function () {
  return _;
}), defineExport(legacyExports, "k", function () {
  return w;
}), defineExport(legacyExports, "g", function () {
  return O;
}), defineExport(legacyExports, "f", function () {
  return S;
}), defineExport(legacyExports, "c", function () {
  return j;
});
var r = require("./62597459.js"),
  i = 1e-4,
  o = 20;
function a(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function s(e, t, n, r) {
  var i = t[0],
    o = t[1],
    a = n[0],
    s = n[1],
    l = o - i,
    u = s - a;
  if (0 === l) return 0 === u ? a : (a + s) / 2;
  if (r) {
    if (l > 0) {
      if (e <= i) return a;
      if (e >= o) return s;
    } else {
      if (e >= i) return a;
      if (e <= o) return s;
    }
  } else {
    if (e === i) return a;
    if (e === o) return s;
  }
  return (e - i) / l * u + a;
}
function l(e, t) {
  switch (e) {
    case "center":
    case "middle":
      e = "50%";
      break;
    case "left":
    case "top":
      e = "0%";
      break;
    case "right":
    case "bottom":
      e = "100%";
      break;
  }
  return r["y"](e) ? a(e).match(/%$/) ? parseFloat(e) / 100 * t : parseFloat(e) : null == e ? NaN : +e;
}
function u(e, t, n) {
  return null == t && (t = 10), t = Math.min(Math.max(0, t), o), e = (+e).toFixed(t), n ? e : +e;
}
function c(e) {
  return e.sort(function (e, t) {
    return e - t;
  }), e;
}
function f(e) {
  if (e = +e, isNaN(e)) return 0;
  if (e > 1e-14) for (var t = 1, n = 0; n < 15; n++, t *= 10) if (Math.round(e * t) / t === e) return n;
  return d(e);
}
function d(e) {
  var t = e.toString().toLowerCase(),
    n = t.indexOf("e"),
    r = n > 0 ? +t.slice(n + 1) : 0,
    i = n > 0 ? n : t.length,
    o = t.indexOf("."),
    a = o < 0 ? 0 : i - 1 - o;
  return Math.max(0, a - r);
}
function h(e, t) {
  var n = Math.log,
    r = Math.LN10,
    i = Math.floor(n(e[1] - e[0]) / r),
    o = Math.round(n(Math.abs(t[1] - t[0])) / r),
    a = Math.min(Math.max(-i + o, 0), 20);
  return isFinite(a) ? a : 20;
}
function p(e, t) {
  var n = Math.max(f(e), f(t)),
    r = e + t;
  return n > o ? r : u(r, n);
}
function g(e) {
  var t = 2 * Math.PI;
  return (e % t + t) % t;
}
function m(e) {
  return e > -i && e < i;
}
var v = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function y(e) {
  if (e instanceof Date) return e;
  if (r["y"](e)) {
    var t = v.exec(e);
    if (!t) return new Date(NaN);
    if (t[8]) {
      var n = +t[4] || 0;
      return "Z" !== t[8].toUpperCase() && (n -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, n, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    }
    return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  }
  return null == e ? new Date(NaN) : new Date(Math.round(e));
}
function b(e) {
  return Math.pow(10, x(e));
}
function x(e) {
  if (0 === e) return 0;
  var t = Math.floor(Math.log(e) / Math.LN10);
  return e / Math.pow(10, t) >= 10 && t++, t;
}
function _(e, t) {
  var n,
    r = x(e),
    i = Math.pow(10, r),
    o = e / i;
  return n = t ? o < 1.5 ? 1 : o < 2.5 ? 2 : o < 4 ? 3 : o < 7 ? 5 : 10 : o < 1 ? 1 : o < 2 ? 2 : o < 3 ? 3 : o < 5 ? 5 : 10, e = n * i, r >= -20 ? +e.toFixed(r < 0 ? -r : 0) : e;
}
function w(e) {
  var t = parseFloat(e);
  return t == e && (0 !== t || !r["y"](e) || e.indexOf("x") <= 0) ? t : NaN;
}
function O(e) {
  return !isNaN(w(e));
}
function S() {
  return Math.round(9 * Math.random());
}
function k(e, t) {
  return 0 === t ? e : k(t, e % t);
}
function j(e, t) {
  return null == e ? t : null == t ? e : e * t / k(e, t);
}
