let legacyModule = module,
  legacyExports = exports;
var isArrayLike = require("./isArrayLike.js"),
  isObjectLike = require("./isObjectLikeLegacy.js");
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
legacyModule.exports = isArrayLikeObject;
