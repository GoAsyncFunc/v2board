let legacyModule = module,
  legacyExports = exports;
var r = require("./getNative.js"),
  i = require("./rootObject.js"),
  a = r(i, "Map");
legacyModule.exports = a;
