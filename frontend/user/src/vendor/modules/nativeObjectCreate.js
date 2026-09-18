let legacyModule = module,
  legacyExports = exports;
var r = require("./getNative.js"),
  i = r(Object, "create");
legacyModule.exports = i;
