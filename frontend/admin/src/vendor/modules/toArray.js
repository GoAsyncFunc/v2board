let legacyModule = module,
  legacyExports = exports;
var arrayFrom = require("./toIndexedObjectLegacy.js"),
  requireObject = require("./requireObject.js");
legacyModule.exports = function toArray(value) {
  return arrayFrom(requireObject(value));
};
