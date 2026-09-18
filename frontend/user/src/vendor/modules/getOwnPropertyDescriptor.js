let legacyModule = module,
  legacyExports = exports;
var propertyIsEnumerable = require("./propertyIsEnumerable.js"),
  createPropertyDescriptor = require("./createPropertyDescriptor.js"),
  toIndexedObject = require("./toIndexedObject.js"),
  toPrimitive = require("./toPrimitive.js"),
  hasOwn = require("./hasOwn.js"),
  domDefinePropertySupported = require("./domDefinePropertySupport.js"),
  nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsLegacySupport.js") ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(object, propertyKey) {
  if (object = toIndexedObject(object), propertyKey = toPrimitive(propertyKey, !0), domDefinePropertySupported) try {
    return nativeGetOwnPropertyDescriptor(object, propertyKey);
  } catch (error) {}
  if (hasOwn(object, propertyKey)) return createPropertyDescriptor(!propertyIsEnumerable.f.call(object, propertyKey), object[propertyKey]);
};
