let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = !0,
  i = "Invariant failed";
function o(e, t) {
  if (!e) {
    if (r) throw new Error(i);
    var n = "function" === typeof t ? t() : t,
      o = n ? "".concat(i, ": ").concat(n) : i;
    throw new Error(o);
  }
}
