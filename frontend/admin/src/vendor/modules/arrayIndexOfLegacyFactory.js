let legacyModule = module,
  legacyExports = exports;
var toArray = require("./toArray.js"),
  toLength = require("./toLength.js"),
  toAbsoluteIndex = require("./toAbsoluteIndex.js");
legacyModule.exports = function createArrayIndexMethod(isIncludes) {
  return function (arrayLike, searchElement, fromIndex) {
    var element,
      array = toArray(arrayLike),
      length = toLength(array.length),
      index = toAbsoluteIndex(fromIndex, length);
    if (isIncludes && searchElement != searchElement) {
      while (length > index) if (element = array[index++], element != element) return !0;
    } else for (; length > index; index++) if ((isIncludes || index in array) && array[index] === searchElement) return isIncludes || index || 0;
    return !isIncludes && -1;
  };
};
