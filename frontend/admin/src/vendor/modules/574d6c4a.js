let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return i;
}), defineExport(legacyExports, "a", function () {
  return o;
});
var r = {};
function i(e, t) {
  r[e] = t;
}
function o(e) {
  return r[e];
}
