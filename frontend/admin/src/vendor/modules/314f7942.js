let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
defineExport(legacyExports, "a", function () {
  return r;
});
