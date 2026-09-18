let legacyModule = module,
  legacyExports = exports;
var arrayLikeKeys = require("./62383054.js"),
  baseKeys = require("./baseKeys.js"),
  isArrayLike = require("./isArrayLike.js");
function getAllKeys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeys(object);
}
legacyModule.exports = getAllKeys;
