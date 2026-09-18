let legacyModule = module,
  legacyExports = exports;
var requireObject = require("./requireObject.js");
legacyModule.exports = function toObject(value) {
  return Object(requireObject(value));
};
