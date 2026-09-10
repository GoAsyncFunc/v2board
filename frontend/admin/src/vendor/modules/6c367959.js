let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./33434261.js");
function i(e) {
  e.registerPainter("svg", r["a"]);
}
