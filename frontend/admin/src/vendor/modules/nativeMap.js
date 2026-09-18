let legacyModule = module,
  legacyExports = exports;
var getNative = require("./getNative.js"),
  rootObject = require("./rootObject.js"),
  nativeMap = getNative(rootObject, "Map");
legacyModule.exports = nativeMap;
