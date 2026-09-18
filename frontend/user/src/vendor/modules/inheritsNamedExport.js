let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return inherits;
});
var setPrototypeOf = require("./setPrototypeOfNamedExport.js");
function inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, Object(setPrototypeOf["a"])(subClass, superClass);
}
