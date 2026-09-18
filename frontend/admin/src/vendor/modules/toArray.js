let legacyModule = module,
  legacyExports = exports;
var arrayFrom = require("./4d317870.js"),
  requireObject = require("./requireObject.js");
legacyModule.exports = function toArray(value) {
  return arrayFrom(requireObject(value));
};
