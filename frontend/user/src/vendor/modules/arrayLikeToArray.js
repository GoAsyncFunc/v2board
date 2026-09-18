let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function arrayLikeToArray(arrayLike, length) {
  (null == length || length > arrayLike.length) && (length = arrayLike.length);
  for (var index = 0, result = new Array(length); index < length; index++) result[index] = arrayLike[index];
  return result;
}
defineExport(legacyExports, "a", function () {
  return arrayLikeToArray;
});
