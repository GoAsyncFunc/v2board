let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r() {
  return [1, 0, 0, 1, 0, 0];
}
function i(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function o(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function a(e, t, n) {
  var r = t[0] * n[0] + t[2] * n[1],
    i = t[1] * n[0] + t[3] * n[1],
    o = t[0] * n[2] + t[2] * n[3],
    a = t[1] * n[2] + t[3] * n[3],
    s = t[0] * n[4] + t[2] * n[5] + t[4],
    l = t[1] * n[4] + t[3] * n[5] + t[5];
  return e[0] = r, e[1] = i, e[2] = o, e[3] = a, e[4] = s, e[5] = l, e;
}
function s(e, t, n) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + n[0], e[5] = t[5] + n[1], e;
}
function l(e, t, n) {
  var r = t[0],
    i = t[2],
    o = t[4],
    a = t[1],
    s = t[3],
    l = t[5],
    c = Math.sin(n),
    u = Math.cos(n);
  return e[0] = r * u + a * c, e[1] = -r * c + a * u, e[2] = i * u + s * c, e[3] = -i * c + u * s, e[4] = u * o + c * l, e[5] = u * l - c * o, e;
}
function c(e, t, n) {
  var r = n[0],
    i = n[1];
  return e[0] = t[0] * r, e[1] = t[1] * i, e[2] = t[2] * r, e[3] = t[3] * i, e[4] = t[4] * r, e[5] = t[5] * i, e;
}
function u(e, t) {
  var n = t[0],
    r = t[2],
    i = t[4],
    o = t[1],
    a = t[3],
    s = t[5],
    l = n * a - o * r;
  return l ? (l = 1 / l, e[0] = a * l, e[1] = -o * l, e[2] = -r * l, e[3] = n * l, e[4] = (r * s - a * i) * l, e[5] = (o * i - n * s) * l, e) : null;
}
defineExport(legacyExports, "b", function () {
  return r;
}), defineExport(legacyExports, "c", function () {
  return i;
}), defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "e", function () {
  return a;
}), defineExport(legacyExports, "h", function () {
  return s;
}), defineExport(legacyExports, "f", function () {
  return l;
}), defineExport(legacyExports, "g", function () {
  return c;
}), defineExport(legacyExports, "d", function () {
  return u;
});
