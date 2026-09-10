let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return l;
}), defineExport(legacyExports, "k", function () {
  return c;
}), defineExport(legacyExports, "i", function () {
  return u;
}), defineExport(legacyExports, "h", function () {
  return h;
}), defineExport(legacyExports, "j", function () {
  return f;
}), defineExport(legacyExports, "g", function () {
  return d;
}), defineExport(legacyExports, "d", function () {
  return p;
}), defineExport(legacyExports, "e", function () {
  return m;
}), defineExport(legacyExports, "b", function () {
  return g;
}), defineExport(legacyExports, "c", function () {
  return b;
}), defineExport(legacyExports, "f", function () {
  return w;
});
var r = require("./59454956.js"),
  i = interopDefault(r),
  o = require("./71317449.js"),
  a = interopDefault(o);
function s(e) {
  var t = [];
  return a.a.Children.forEach(e, function (e) {
    e && t.push(e);
  }), t;
}
function l(e, t) {
  for (var n = s(e), r = 0; r < n.length; r++) if (n[r].key === t) return r;
  return -1;
}
function c(e, t) {
  e.transform = t, e.webkitTransform = t, e.mozTransform = t;
}
function u(e) {
  return ("transform" in e || "webkitTransform" in e || "MozTransform" in e) && window.atob;
}
function h(e) {
  return {
    transform: e,
    WebkitTransform: e,
    MozTransform: e
  };
}
function f(e) {
  return "left" === e || "right" === e;
}
function d(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "ltr",
    r = f(t) ? "translateY" : "translateX";
  return f(t) || "rtl" !== n ? r + "(" + 100 * -e + "%) translateZ(0)" : r + "(" + 100 * e + "%) translateZ(0)";
}
function p(e, t) {
  var n = f(t) ? "marginTop" : "marginLeft";
  return i()({}, n, 100 * -e + "%");
}
function m(e, t) {
  return +window.getComputedStyle(e).getPropertyValue(t).replace("px", "");
}
function g(e) {
  return Object.keys(e).reduce(function (t, n) {
    return "aria-" !== n.substr(0, 5) && "data-" !== n.substr(0, 5) && "role" !== n || (t[n] = e[n]), t;
  }, {});
}
function v(e, t) {
  return +e.getPropertyValue(t).replace("px", "");
}
function y(e, t, n, r, i) {
  var o = m(i, "padding-" + e);
  if (!r || !r.parentNode) return o;
  var a = r.parentNode.childNodes;
  return Array.prototype.some.call(a, function (i) {
    var a = window.getComputedStyle(i);
    return i !== r ? (o += v(a, "margin-" + e), o += i[t], o += v(a, "margin-" + n), "content-box" === a.boxSizing && (o += v(a, "border-" + e + "-width") + v(a, "border-" + n + "-width")), !1) : (o += v(a, "margin-" + e), !0);
  }), o;
}
function b(e, t) {
  return y("left", "offsetWidth", "right", e, t);
}
function w(e, t) {
  return y("top", "offsetHeight", "bottom", e, t);
}
