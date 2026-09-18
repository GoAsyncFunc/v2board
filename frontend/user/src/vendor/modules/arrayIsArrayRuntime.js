let legacyModule = module,
  legacyExports = exports;
var r = require("./rawClassName.js");
legacyModule.exports = Array.isArray || function (e) {
  return "Array" == r(e);
};
