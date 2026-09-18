let legacyModule = module,
  legacyExports = exports;
var r = require("./rawClassNameLegacy.js");
legacyModule.exports = Array.isArray || function (e) {
  return "Array" == r(e);
};
