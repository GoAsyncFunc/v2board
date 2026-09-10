let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  var n = t;
  while (n) {
    if (n === e) return !0;
    n = n.parentNode;
  }
  return !1;
}
defineExport(legacyExports, "a", function () {
  return r;
});
