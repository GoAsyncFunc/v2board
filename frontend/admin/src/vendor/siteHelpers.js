let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return a;
}), defineExport(legacyExports, "f", function () {
  return s;
}), defineExport(legacyExports, "i", function () {
  return l;
}), defineExport(legacyExports, "j", function () {
  return c;
}), defineExport(legacyExports, "e", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return h;
}), defineExport(legacyExports, "a", function () {
  return f;
}), defineExport(legacyExports, "h", function () {
  return d;
}), defineExport(legacyExports, "g", function () {
  return p;
}), defineExport(legacyExports, "c", function () {
  return m;
});
require("./modules/6d69595a.js");
var r = require("./modules/74737172.js"),
  i = (require("./modules/77642f52.js"), require("./modules/2b515243.js")),
  o = interopDefault(i);
function a(e) {
  return document.cookie.split("; ").reduce((t, n) => {
    var r = n.split("=");
    return r[0] === e ? decodeURIComponent(r[1]) : t;
  }, "");
}
function s() {
  return -1 !== window.navigator.userAgent.toLowerCase().indexOf("mobile");
}
function l(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 525600,
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "/",
    i = arguments.length > 4 ? arguments[4] : void 0,
    o = new Date(Date.now() + 6e4 * n).toGMTString();
  document.cookie = e + "=".concat(encodeURIComponent(t), ";expires=").concat(o, ";path=").concat(r) + (i ? ";domain=".concat(i) : "");
}
function c(e, t) {
  try {
    if (localStorage.getItem("habit")) {
      var n = localStorage.getItem("habit");
      n[e] = t, localStorage.setItem("habit", JSON.stringify(n));
    } else localStorage.setItem("habit", JSON.stringify({
      [e]: t
    }));
  } catch (n) {
    localStorage.setItem("habit", JSON.stringify({
      [e]: t
    }));
  }
}
function u(e) {
  try {
    if (!localStorage.getItem("habit")) return !1;
    var t = JSON.parse(localStorage.getItem("habit"));
    return t[e];
  } catch (e) {
    return !1;
  }
}
function h() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
  e = parseInt(e);
  var t = 1024,
    n = 1048576,
    r = 1073741824;
  return e > r ? (e / r).toFixed(2) + " GB" : e > n ? (e / n).toFixed(2) + " MB" : e > t ? (e / t).toFixed(2) + " KB" : e < 0 ? 0 : e.toFixed(2) + " B";
}
function f(e) {
  o()(e), r["a"].success("\u590d\u5236\u6210\u529f");
}
function d(e) {
  return window.localStorage.setItem("authorization", e);
}
function p() {
  return window.localStorage.removeItem("authorization");
}
function m() {
  return window.localStorage.getItem("authorization");
}
