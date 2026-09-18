let legacyModule = module,
  legacyExports = exports;
var r = require("./copyObject.js"),
  i = require("./getAllKeys.js");
function o(e) {
  return r(e, i(e));
}
legacyModule.exports = o;
