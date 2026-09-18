let legacyModule = module,
  legacyExports = exports;
var getTag = require("./4e796b4b.js"),
  isObjectLike = require("./isObjectLikeLegacy.js"),
  symbolTag = "[object Symbol]";
function isSymbol(value) {
  return "symbol" == typeof value || isObjectLike(value) && getTag(value) == symbolTag;
}
legacyModule.exports = isSymbol;
