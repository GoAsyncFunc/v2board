let legacyModule = module,
  legacyExports = exports;
var objectCreate = require("./objectCreateLegacy.js"),
  createPropertyDescriptor = require("./propertyDescriptorFlags.js"),
  setToStringTag = require("./setToStringTag.js"),
  iteratorPrototype = {};
require("./definePropertyRuntime.js")(iteratorPrototype, require("./wellKnownSymbolLegacy.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function createIteratorConstructorLegacy(IteratorConstructor, name, next) {
  IteratorConstructor.prototype = objectCreate(iteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  }), setToStringTag(IteratorConstructor, name + " Iterator");
};
