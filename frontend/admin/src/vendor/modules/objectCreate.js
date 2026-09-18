let legacyModule = module,
  legacyExports = exports;
require("./objectCreatePolyfillRuntime.js");
var objectNamespace = require("./coreJsNamespace.js").Object;
legacyModule.exports = function createObject(prototype, properties) {
  return objectNamespace.create(prototype, properties);
};
