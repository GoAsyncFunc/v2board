let legacyModule = module,
  legacyExports = exports;
var nativeSymbol = require("./nativeSymbolLegacy.js"),
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty,
  objectToString = objectPrototype.toString,
  toStringTag = nativeSymbol ? nativeSymbol.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, toStringTag),
    tag = value[toStringTag];
  try {
    value[toStringTag] = void 0;
    var isClean = !0;
  } catch (e) {}
  var result = objectToString.call(value);
  return isClean && (isOwn ? value[toStringTag] = tag : delete value[toStringTag]), result;
}
legacyModule.exports = getRawTag;
