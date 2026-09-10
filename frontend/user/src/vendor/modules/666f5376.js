let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e) {
  return r = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, r(e);
}
defineExport(legacyExports, "a", function () {
  return r;
});
