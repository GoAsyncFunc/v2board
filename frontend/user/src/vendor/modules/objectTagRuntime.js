let legacyModule = module,
  legacyExports = exports;
var nativeSymbol = require("./nativeSymbolLegacy.js"),
  getRawTag = require("./getRawTag.js"),
  objectToString = require("./objectToString.js"),
  nullTag = "[object Null]",
  undefinedTag = "[object Undefined]",
  toStringTag = nativeSymbol ? nativeSymbol.toStringTag : void 0;
function getTag(value) {
  return null == value ? void 0 === value ? undefinedTag : nullTag : toStringTag && toStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
legacyModule.exports = getTag;
