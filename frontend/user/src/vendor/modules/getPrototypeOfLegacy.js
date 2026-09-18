let legacyModule = module,
  legacyExports = exports;
var r = require("./overArg.js"),
  i = r(Object.getPrototypeOf, Object);
legacyModule.exports = i;
