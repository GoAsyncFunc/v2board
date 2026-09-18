let legacyModule = module,
  legacyExports = exports;
var getNative = require("./getNative.js"),
  nativeObjectCreate = getNative(Object, "create");
legacyModule.exports = nativeObjectCreate;
