let legacyModule = module,
  legacyExports = exports;
var toObject = require("./toObjectLegacy.js"),
  toAbsoluteIndex = require("./toAbsoluteIndex.js"),
  toLength = require("./toLength.js");
legacyModule.exports = function fill(value) {
  var object = toObject(this),
    length = toLength(object.length),
    argumentCount = arguments.length,
    index = toAbsoluteIndex(argumentCount > 1 ? arguments[1] : void 0, length),
    endArgument = argumentCount > 2 ? arguments[2] : void 0,
    end = void 0 === endArgument ? length : toAbsoluteIndex(endArgument, length);
  while (end > index) object[index++] = value;
  return object;
};
