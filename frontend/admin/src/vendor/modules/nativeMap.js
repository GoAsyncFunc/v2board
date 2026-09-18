let legacyModule = module,
  legacyExports = exports;
var r = require("./getNative.js"),
  i = require("./rootObject.js"),
  o = r(i, "Map");
legacyModule.exports = o;
