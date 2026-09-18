let legacyModule = module,
  legacyExports = exports;
var r = require("./isArrayLike.js"),
  i = require("./isObjectLikeLegacy.js");
function o(e) {
  return i(e) && r(e);
}
legacyModule.exports = o;
