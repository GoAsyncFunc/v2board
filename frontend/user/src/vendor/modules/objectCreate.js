let legacyModule = module,
  legacyExports = exports;
require("./6c436338.js");
var objectNamespace = require("./coreJsNamespace.js").Object;
legacyModule.exports = function createObject(prototype, properties) {
  return objectNamespace.create(prototype, properties);
};
