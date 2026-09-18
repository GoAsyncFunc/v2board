let legacyModule = module,
  legacyExports = exports;
var toObject = require("./toObjectLegacy.js"),
  toAbsoluteIndex = require("./toAbsoluteIndex.js"),
  toLength = require("./toLength.js");
legacyModule.exports = [].copyWithin || function copyWithin(target, start) {
  var object = toObject(this),
    length = toLength(object.length),
    targetIndex = toAbsoluteIndex(target, length),
    startIndex = toAbsoluteIndex(start, length),
    endArgument = arguments.length > 2 ? arguments[2] : void 0,
    count = Math.min((void 0 === endArgument ? length : toAbsoluteIndex(endArgument, length)) - startIndex, length - targetIndex),
    direction = 1;
  startIndex < targetIndex && targetIndex < startIndex + count && (direction = -1, startIndex += count - 1, targetIndex += count - 1);
  while (count-- > 0) startIndex in object ? object[targetIndex] = object[startIndex] : delete object[targetIndex], targetIndex += direction, startIndex += direction;
  return object;
};
