let legacyModule = module,
  legacyExports = exports;
var indexedObject = require("./39574656.js"),
  requireObjectCoercible = require("./requireObjectCoercible.js");
legacyModule.exports = function toIndexedObject(value) {
  return indexedObject(requireObjectCoercible(value));
};
