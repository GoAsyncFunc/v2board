let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return i;
}), defineExport(legacyExports, "c", function () {
  return o;
}), defineExport(legacyExports, "a", function () {
  return a;
});
var r = Math.round;
function i(e, t, n) {
  if (t) {
    var i = t.x1,
      o = t.x2,
      s = t.y1,
      l = t.y2;
    e.x1 = i, e.x2 = o, e.y1 = s, e.y2 = l;
    var c = n && n.lineWidth;
    return c ? (r(2 * i) === r(2 * o) && (e.x1 = e.x2 = a(i, c, !0)), r(2 * s) === r(2 * l) && (e.y1 = e.y2 = a(s, c, !0)), e) : e;
  }
}
function o(e, t, n) {
  if (t) {
    var r = t.x,
      i = t.y,
      o = t.width,
      s = t.height;
    e.x = r, e.y = i, e.width = o, e.height = s;
    var l = n && n.lineWidth;
    return l ? (e.x = a(r, l, !0), e.y = a(i, l, !0), e.width = Math.max(a(r + o, l, !1) - e.x, 0 === o ? 0 : 1), e.height = Math.max(a(i + s, l, !1) - e.y, 0 === s ? 0 : 1), e) : e;
  }
}
function a(e, t, n) {
  if (!t) return e;
  var i = r(2 * e);
  return (i + r(t)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
}
