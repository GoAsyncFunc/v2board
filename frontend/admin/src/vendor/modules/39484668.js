let legacyModule = module,
  legacyExports = exports;
var getObjectKeys = require("./objectKeysFallback.js"),
  hiddenPropertyNames = require("./objectKeysIn.js").concat("length", "prototype");
legacyExports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(object) {
  return getObjectKeys(object, hiddenPropertyNames);
};
