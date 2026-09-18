let legacyModule = module,
  legacyExports = exports;
var baseGet = require("./baseGet.js");
function getValueOrDefault(object, path, defaultValue) {
  var value = null == object ? void 0 : baseGet(object, path);
  return void 0 === value ? defaultValue : value;
}
legacyModule.exports = getValueOrDefault;
