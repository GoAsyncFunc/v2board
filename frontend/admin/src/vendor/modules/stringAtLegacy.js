let legacyModule = module,
  legacyExports = exports;
var toInteger = require("./toInteger.js"),
  requireObject = require("./requireObject.js");
legacyModule.exports = function createStringAtLegacy(returnString) {
  return function stringAtLegacy(value, position) {
    var firstCodeUnit,
      secondCodeUnit,
      string = String(requireObject(value)),
      index = toInteger(position),
      length = string.length;
    return index < 0 || index >= length ? returnString ? "" : void 0 : (firstCodeUnit = string.charCodeAt(index), firstCodeUnit < 55296 || firstCodeUnit > 56319 || index + 1 === length || (secondCodeUnit = string.charCodeAt(index + 1)) < 56320 || secondCodeUnit > 57343 ? returnString ? string.charAt(index) : firstCodeUnit : returnString ? string.slice(index, index + 2) : secondCodeUnit - 56320 + (firstCodeUnit - 55296 << 10) + 65536);
  };
};
