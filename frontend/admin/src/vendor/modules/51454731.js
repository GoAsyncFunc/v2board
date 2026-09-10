let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./344e4f34.js"),
  i = Object(r["m"])(),
  o = (Object(r["m"])(), function () {
    function e() {}
    return e.prototype.getColorFromPalette = function (e, t, n) {
      var o = Object(r["p"])(this.get("color", !0)),
        a = this.get("colorLayer", !0);
      return s(this, i, o, a, e, t, n);
    }, e.prototype.clearColorPalette = function () {
      l(this, i);
    }, e;
  }());
function a(e, t) {
  for (var n = e.length, r = 0; r < n; r++) if (e[r].length > t) return e[r];
  return e[n - 1];
}
function s(e, t, n, r, i, o, s) {
  o = o || e;
  var l = t(o),
    u = l.paletteIdx || 0,
    c = l.paletteNameMap = l.paletteNameMap || {};
  if (c.hasOwnProperty(i)) return c[i];
  var f = null != s && r ? a(r, s) : n;
  if (f = f || n, f && f.length) {
    var d = f[u];
    return i && (c[i] = d), l.paletteIdx = (u + 1) % f.length, d;
  }
}
function l(e, t) {
  t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
