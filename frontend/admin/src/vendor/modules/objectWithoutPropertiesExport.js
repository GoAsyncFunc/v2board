let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function objectWithoutProperties(source, excludedKeys) {
  if (null == source) return {};
  var key,
    result = {},
    keys = Object.keys(source);
  for (var index = 0; index < keys.length; index++) key = keys[index], excludedKeys.indexOf(key) >= 0 || (result[key] = source[key]);
  return result;
}
defineExport(legacyExports, "a", function () {
  return objectWithoutProperties;
});
