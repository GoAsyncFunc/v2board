let legacyModule = module,
  legacyExports = exports;
var indexedObject = require("./indexedObjectLegacy.js"),
  requireObjectCoercible = require("./requireObjectCoercible.js");
legacyModule.exports = function toIndexedObject(value) {
  return indexedObject(requireObjectCoercible(value));
};
