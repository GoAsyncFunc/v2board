let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return c;
}), defineExport(legacyExports, "f", function () {
  return u;
}), defineExport(legacyExports, "i", function () {
  return l;
}), defineExport(legacyExports, "j", function () {
  return f;
}), defineExport(legacyExports, "g", function () {
  return p;
}), defineExport(legacyExports, "k", function () {
  return d;
}), defineExport(legacyExports, "n", function () {
  return h;
}), defineExport(legacyExports, "l", function () {
  return m;
}), defineExport(legacyExports, "q", function () {
  return v;
}), defineExport(legacyExports, "b", function () {
  return y;
}), defineExport(legacyExports, "h", function () {
  return g;
}), defineExport(legacyExports, "m", function () {
  return b;
}), defineExport(legacyExports, "r", function () {
  return w;
}), defineExport(legacyExports, "a", function () {
  return x;
}), defineExport(legacyExports, "c", function () {
  return O;
}), defineExport(legacyExports, "p", function () {
  return E;
}), defineExport(legacyExports, "o", function () {
  return _;
}), defineExport(legacyExports, "d", function () {
  return k;
});
require("./modules/2f786b65.js");
var r = require("./notification.js"),
  o = (require("./modules/6d69595a.js"), require("./modules/74737172.js")),
  i = (require("./modules/77642f52.js"), require("./modules/2b515243.js")),
  a = interopDefault(i),
  s = require("./i18n.js");
function c(e) {
  return document.cookie.split("; ").reduce((t, n) => {
    var r = n.split("=");
    return r[0] === e ? decodeURIComponent(r[1]) : t;
  }, "");
}
function u(e, t) {
  return e / t * 100;
}
function l() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("iphone") || -1 !== window.navigator.userAgent.toLowerCase().indexOf("ipad");
}
function f() {
  return navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
}
function p() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("android");
}
function d() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("macintosh");
}
function h() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("windows");
}
function m() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("mobile");
}
function v(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 525600,
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "/",
    o = arguments.length > 4 ? arguments[4] : void 0,
    i = new Date(Date.now() + 6e4 * n).toGMTString();
  document.cookie = e + "=".concat(encodeURIComponent(t), ";expires=").concat(i, ";path=").concat(r) + (o ? ";domain=".concat(o) : "");
}
function y() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
  e = parseInt(e);
  var t = 1024,
    n = 1048576,
    r = 1073741824;
  return e > r ? (e / r).toFixed(2) + " GB" : e > n ? (e / n).toFixed(2) + " MB" : e > t ? (e / t).toFixed(2) + " KB" : e < 0 ? 0 : e.toFixed(2) + " B";
}
function g(e) {
  return null !== e && e < new Date().getTime() / 1e3;
}
function b(e) {
  var t, n;
  return !(null === (t = e.plan) || void 0 === t || !t.renew) && (!(null === (n = e.plan) || void 0 === n || !n.show) || !g(e.expired_at));
}
function w() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "success",
    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    n = arguments.length > 2 ? arguments[2] : void 0;
  m() ? o["a"][e](n) : r["a"][e]({
    message: t,
    description: n,
    duration: 1.5
  });
}
function x(e) {
  a()(e), o["a"].success(Object(s["formatMessage"])({
    id: "\u590d\u5236\u6210\u529f"
  }));
}
function O(e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    return e;
  }
}
function E(e) {
  return window.localStorage.setItem("authorization", e);
}
function _() {
  return window.localStorage.removeItem("authorization");
}
function k() {
  return window.localStorage.getItem("authorization");
}
