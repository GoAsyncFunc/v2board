let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = !0,
  o = "Invariant failed";
function i(e, t) {
  if (!e) {
    if (r) throw new Error(o);
    var n = "function" === typeof t ? t() : t,
      i = n ? "".concat(o, ": ").concat(n) : o;
    throw new Error(i);
  }
}
