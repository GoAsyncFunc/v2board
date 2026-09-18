let legacyModule = module,
  legacyExports = exports;
var getEnumerableKeys = require("./objectKeysFallback.js"),
  objectKeysIn = require("./objectKeysIn.js");
legacyModule.exports = Object.keys || function objectKeys(object) {
  return getEnumerableKeys(object, objectKeysIn);
};
