let legacyModule = module,
  legacyExports = exports;
var propertyIsEnumerable = require("./propertyIsEnumerableLegacy.js"),
  createPropertyDescriptor = require("./propertyDescriptorFlags.js"),
  toObject = require("./toArray.js"),
  toPrimitive = require("./toPrimitive.js"),
  hasOwn = require("./hasOwnLegacy.js"),
  domDefinePropertySupported = require("./domDefinePropertyLegacySupport.js"),
  nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsSupport.js") ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptorLegacy(object, propertyKey) {
  if (object = toObject(object), propertyKey = toPrimitive(propertyKey, !0), domDefinePropertySupported) try {
    return nativeGetOwnPropertyDescriptor(object, propertyKey);
  } catch (error) {}
  if (hasOwn(object, propertyKey)) return createPropertyDescriptor(!propertyIsEnumerable.f.call(object, propertyKey), object[propertyKey]);
};
