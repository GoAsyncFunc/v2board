let legacyModule = module,
  legacyExports = exports;
var defineProperty = require("./definePropertyHelper.js"),
  createPropertyDescriptor = require("./createPropertyDescriptor.js");
legacyModule.exports = require("./descriptorsLegacySupport.js") ? function definePropertyValue(object, propertyKey, value) {
  return defineProperty.f(object, propertyKey, createPropertyDescriptor(1, value));
} : function definePropertyValue(object, propertyKey, value) {
  return object[propertyKey] = value, object;
};
