let legacyModule = module,
  legacyExports = exports;
var r = require("./isArrayLike.js"),
  i = require("./isObjectLikeLegacy.js");
function a(e) {
  return i(e) && r(e);
}
legacyModule.exports = a;
