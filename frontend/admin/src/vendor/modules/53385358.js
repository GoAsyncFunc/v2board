let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return r;
}), defineExport(legacyExports, "c", function () {
  return i;
}), defineExport(legacyExports, "b", function () {
  return o;
});
var r = 1,
  i = 2,
  o = 4;
