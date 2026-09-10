let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./62597459.js");
function i(e, t) {
  return e && "solid" !== e && t > 0 ? "dashed" === e ? [4 * t, 2 * t] : "dotted" === e ? [t] : Object(r["w"])(e) ? [e] : Object(r["r"])(e) ? e : null : null;
}
function o(e) {
  var t = e.style,
    n = t.lineDash && t.lineWidth > 0 && i(t.lineDash, t.lineWidth),
    o = t.lineDashOffset;
  if (n) {
    var a = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    a && 1 !== a && (n = Object(r["D"])(n, function (e) {
      return e / a;
    }), o /= a);
  }
  return [n, o];
}
