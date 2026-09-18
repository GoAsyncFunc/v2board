let legacyModule = module,
  legacyExports = exports;
var getObjectKeys = require("./objectKeysFallbackLegacy.js"),
  hiddenKeys = require("./objectKeysIn.js");
legacyModule.exports = Object.keys || function objectKeys(object) {
  return getObjectKeys(object, hiddenKeys);
};
