let legacyModule = module,
  legacyExports = exports;
var getEnumerableKeys = require("./784a6965.js"),
  objectKeysIn = require("./objectKeysIn.js");
legacyModule.exports = Object.keys || function objectKeys(object) {
  return getEnumerableKeys(object, objectKeysIn);
};
