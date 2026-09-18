let legacyModule = module,
  legacyExports = exports;
var r = require("./copyObject.js"),
  i = require("./getAllKeys.js");
function a(e) {
  return r(e, i(e));
}
legacyModule.exports = a;
