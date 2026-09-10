let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  return null == e && (e = 0), null == t && (t = 0), [e, t];
}
function i(e) {
  return [e[0], e[1]];
}
function o(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function a(e, t, n) {
  return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function s(e) {
  return Math.sqrt(l(e));
}
defineExport(legacyExports, "d", function () {
  return r;
}), defineExport(legacyExports, "c", function () {
  return i;
}), defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "m", function () {
  return a;
}), defineExport(legacyExports, "l", function () {
  return c;
}), defineExport(legacyExports, "k", function () {
  return u;
}), defineExport(legacyExports, "g", function () {
  return h;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "f", function () {
  return p;
}), defineExport(legacyExports, "h", function () {
  return m;
}), defineExport(legacyExports, "b", function () {
  return g;
}), defineExport(legacyExports, "j", function () {
  return v;
}), defineExport(legacyExports, "i", function () {
  return y;
});
function l(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function c(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function u(e, t) {
  var n = s(t);
  return 0 === n ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / n, e[1] = t[1] / n), e;
}
function h(e, t) {
  return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var f = h;
function d(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var p = d;
function m(e, t, n, r) {
  return e[0] = t[0] + r * (n[0] - t[0]), e[1] = t[1] + r * (n[1] - t[1]), e;
}
function g(e, t, n) {
  var r = t[0],
    i = t[1];
  return e[0] = n[0] * r + n[2] * i + n[4], e[1] = n[1] * r + n[3] * i + n[5], e;
}
function v(e, t, n) {
  return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e;
}
function y(e, t, n) {
  return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e;
}
