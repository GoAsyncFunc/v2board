let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "d", function () {
  return h;
}), defineExport(legacyExports, "a", function () {
  return d;
}), defineExport(legacyExports, "e", function () {
  return p;
}), defineExport(legacyExports, "f", function () {
  return m;
});
var r = require("./49744746.js"),
  i = require("./5a653132.js"),
  o = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
  a = [],
  s = r["a"].browser.firefox && +r["a"].browser.version.split(".")[0] < 39;
function l(e, t, n, r) {
  return n = n || {}, r ? c(e, t, n) : s && null != t.layerX && t.layerX !== t.offsetX ? (n.zrX = t.layerX, n.zrY = t.layerY) : null != t.offsetX ? (n.zrX = t.offsetX, n.zrY = t.offsetY) : c(e, t, n), n;
}
function c(e, t, n) {
  if (r["a"].domSupported && e.getBoundingClientRect) {
    var o = t.clientX,
      s = t.clientY;
    if (Object(i["b"])(e)) {
      var l = e.getBoundingClientRect();
      return n.zrX = o - l.left, void (n.zrY = s - l.top);
    }
    if (Object(i["c"])(a, e, o, s)) return n.zrX = a[0], void (n.zrY = a[1]);
  }
  n.zrX = n.zrY = 0;
}
function u(e) {
  return e || window.event;
}
function h(e, t, n) {
  if (t = u(t), null != t.zrX) return t;
  var r = t.type,
    i = r && r.indexOf("touch") >= 0;
  if (i) {
    var a = "touchend" !== r ? t.targetTouches[0] : t.changedTouches[0];
    a && l(e, a, t, n);
  } else {
    l(e, t, t, n);
    var s = f(t);
    t.zrDelta = s ? s / 120 : -(t.detail || 0) / 3;
  }
  var c = t.button;
  return null == t.which && void 0 !== c && o.test(t.type) && (t.which = 1 & c ? 1 : 2 & c ? 3 : 4 & c ? 2 : 0), t;
}
function f(e) {
  var t = e.wheelDelta;
  if (t) return t;
  var n = e.deltaX,
    r = e.deltaY;
  if (null == n || null == r) return t;
  var i = 0 !== r ? Math.abs(r) : Math.abs(n),
    o = r > 0 ? -1 : r < 0 ? 1 : n > 0 ? -1 : 1;
  return 3 * i * o;
}
function d(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function p(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
var m = function (e) {
  e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
};
