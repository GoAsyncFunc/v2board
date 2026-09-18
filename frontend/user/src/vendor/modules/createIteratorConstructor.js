let legacyModule = module,
  legacyExports = exports;
var objectCreate = require("./2f4d6664.js"),
  createPropertyDescriptor = require("./createPropertyDescriptor.js"),
  setToStringTag = require("./setToStringTag.js"),
  iteratorPrototype = {};
require("./definePropertyValue.js")(iteratorPrototype, require("./wellKnownSymbol.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function createIteratorConstructor(IteratorConstructor, name, next) {
  IteratorConstructor.prototype = objectCreate(iteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  }), setToStringTag(IteratorConstructor, name + " Iterator");
};
