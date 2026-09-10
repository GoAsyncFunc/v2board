let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t, n) {
  var r;
  while (e) {
    if (t(e) && (r = e, n)) break;
    e = e.__hostTarget || e.parent;
  }
  return r;
}
defineExport(legacyExports, "a", function () {
  return r;
});
