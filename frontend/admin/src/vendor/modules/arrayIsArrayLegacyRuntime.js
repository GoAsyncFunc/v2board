let legacyModule = module,
  legacyExports = exports;
var getRawClassName = require("./rawClassNameLegacy.js");
legacyModule.exports = Array.isArray || function isArray(value) {
  return "Array" == getRawClassName(value);
};
