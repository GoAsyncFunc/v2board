let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function typeOf(value) {
  "@babel/helpers - typeof";

  return typeOf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (value) {
    return typeof value;
  } : function (value) {
    return value && "function" == typeof Symbol && value.constructor === Symbol && value !== Symbol.prototype ? "symbol" : typeof value;
  }, typeOf(value);
}
defineExport(legacyExports, "a", function () {
  return typeOf;
});
