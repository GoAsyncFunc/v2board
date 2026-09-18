let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function n(e) {
  return e["default"] || e;
}
defineExport(legacyExports, "a", function () {
  return n;
});
