let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function extendsHelper() {
  return extendsHelper = Object.assign || function (target) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
      var source = arguments[sourceIndex];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, extendsHelper.apply(this, arguments);
}
defineExport(legacyExports, "a", function () {
  return extendsHelper;
});
