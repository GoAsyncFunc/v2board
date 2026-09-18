let legacyModule = module,
  legacyExports = exports;
var defineProperty = require("./definePropertyHelper.js"),
  createDescriptor = require("./createPropertyDescriptor.js");
legacyModule.exports = function definePropertyIfMissing(target, propertyName, value) {
  propertyName in target ? defineProperty.f(target, propertyName, createDescriptor(0, value)) : target[propertyName] = value;
};
