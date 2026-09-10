let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e, t) {
  return r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    return e.__proto__ = t, e;
  }, r(e, t);
}
defineExport(legacyExports, "a", function () {
  return r;
});
