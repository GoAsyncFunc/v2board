let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return i;
}), defineExport(legacyExports, "d", function () {
  return o;
}), defineExport(legacyExports, "c", function () {
  return a;
}), defineExport(legacyExports, "b", function () {
  return s;
}), defineExport(legacyExports, "a", function () {
  return c;
}), defineExport(legacyExports, "f", function () {
  return f;
}), defineExport(legacyExports, "g", function () {
  return d;
});
var r = require("./4f454c42.js");
function i(e) {
  return "interval" === e.type || "log" === e.type;
}
function o(e, t, n, i) {
  var o = {},
    a = e[1] - e[0],
    l = o.interval = Object(r["j"])(a / t, !0);
  null != n && l < n && (l = o.interval = n), null != i && l > i && (l = o.interval = i);
  var c = o.intervalPrecision = s(l),
    f = o.niceTickExtent = [Object(r["q"])(Math.ceil(e[0] / l) * l, c), Object(r["q"])(Math.floor(e[1] / l) * l, c)];
  return u(f, e), o;
}
function a(e) {
  var t = Math.pow(10, Object(r["o"])(e)),
    n = e / t;
  return n ? 2 === n ? n = 3 : 3 === n ? n = 5 : n *= 2 : n = 1, Object(r["q"])(n * t);
}
function s(e) {
  return Object(r["e"])(e) + 2;
}
function l(e, t, n) {
  e[t] = Math.max(Math.min(e[t], n[1]), n[0]);
}
function u(e, t) {
  !isFinite(e[0]) && (e[0] = t[0]), !isFinite(e[1]) && (e[1] = t[1]), l(e, 0, t), l(e, 1, t), e[0] > e[1] && (e[0] = e[1]);
}
function c(e, t) {
  return e >= t[0] && e <= t[1];
}
function f(e, t) {
  return t[1] === t[0] ? .5 : (e - t[0]) / (t[1] - t[0]);
}
function d(e, t) {
  return e * (t[1] - t[0]) + t[0];
}
