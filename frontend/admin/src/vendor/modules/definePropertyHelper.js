let legacyModule = module,
  legacyExports = exports;
var assertObject = require("./assertObject.js"),
  supportsDescriptors = require("./4137522b.js"),
  toPrimitive = require("./toPrimitive.js"),
  defineProperty = Object.defineProperty;
legacyExports.f = require("./descriptorsLegacySupport.js") ? Object.defineProperty : function (object, propertyKey, descriptor) {
  if (assertObject(object), propertyKey = toPrimitive(propertyKey, !0), assertObject(descriptor), supportsDescriptors) try {
    return defineProperty(object, propertyKey, descriptor);
  } catch (e) {}
  if ("get" in descriptor || "set" in descriptor) throw TypeError("Accessors not supported!");
  return "value" in descriptor && (object[propertyKey] = descriptor.value), object;
};
