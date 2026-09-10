let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function o(e, t, n) {
  return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
defineExport(legacyExports, "a", function () {
  return o;
});
