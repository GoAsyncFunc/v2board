let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e) {
  return isFinite(e);
}
function i(e, t, n) {
  var i = null == t.x ? 0 : t.x,
    o = null == t.x2 ? 1 : t.x2,
    a = null == t.y ? 0 : t.y,
    s = null == t.y2 ? 0 : t.y2;
  t.global || (i = i * n.width + n.x, o = o * n.width + n.x, a = a * n.height + n.y, s = s * n.height + n.y), i = r(i) ? i : 0, o = r(o) ? o : 1, a = r(a) ? a : 0, s = r(s) ? s : 0;
  var l = e.createLinearGradient(i, a, o, s);
  return l;
}
function o(e, t, n) {
  var i = n.width,
    o = n.height,
    a = Math.min(i, o),
    s = null == t.x ? .5 : t.x,
    l = null == t.y ? .5 : t.y,
    c = null == t.r ? .5 : t.r;
  t.global || (s = s * i + n.x, l = l * o + n.y, c *= a), s = r(s) ? s : .5, l = r(l) ? l : .5, c = c >= 0 && r(c) ? c : .5;
  var u = e.createRadialGradient(s, l, 0, s, l, c);
  return u;
}
function a(e, t, n) {
  for (var r = "radial" === t.type ? o(e, t, n) : i(e, t, n), a = t.colorStops, s = 0; s < a.length; s++) r.addColorStop(a[s].offset, a[s].color);
  return r;
}
function s(e, t) {
  if (e === t || !e && !t) return !1;
  if (!e || !t || e.length !== t.length) return !0;
  for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !0;
  return !1;
}
function l(e) {
  return parseInt(e, 10);
}
function c(e, t, n) {
  var r = ["width", "height"][t],
    i = ["clientWidth", "clientHeight"][t],
    o = ["paddingLeft", "paddingTop"][t],
    a = ["paddingRight", "paddingBottom"][t];
  if (null != n[r] && "auto" !== n[r]) return parseFloat(n[r]);
  var s = document.defaultView.getComputedStyle(e);
  return (e[i] || l(s[r]) || l(e.style[r])) - (l(s[o]) || 0) - (l(s[a]) || 0) | 0;
}
defineExport(legacyExports, "a", function () {
  return a;
}), defineExport(legacyExports, "c", function () {
  return s;
}), defineExport(legacyExports, "b", function () {
  return c;
});
