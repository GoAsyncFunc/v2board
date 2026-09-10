let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  return e.type === t;
}
defineExport(legacyExports, "a", function () {
  return r;
});
