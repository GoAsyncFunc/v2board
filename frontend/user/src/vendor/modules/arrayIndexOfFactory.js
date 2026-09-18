let legacyModule = module,
  legacyExports = exports;
var toIndexedObject = require("./toIndexedObject.js"),
  toLength = require("./toLength.js"),
  toAbsoluteIndex = require("./toAbsoluteIndex.js");
legacyModule.exports = function createArrayIndexMethod(isIncludes) {
  return function (arrayLike, searchElement, fromIndex) {
    var element,
      indexedObject = toIndexedObject(arrayLike),
      length = toLength(indexedObject.length),
      index = toAbsoluteIndex(fromIndex, length);
    if (isIncludes && searchElement != searchElement) {
      while (length > index) if (element = indexedObject[index++], element != element) return !0;
    } else for (; length > index; index++) if ((isIncludes || index in indexedObject) && indexedObject[index] === searchElement) return isIncludes || index || 0;
    return !isIncludes && -1;
  };
};
