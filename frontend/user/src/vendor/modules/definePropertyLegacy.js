let legacyModule = module,
  legacyExports = exports;
var assertObject = require("./assertObjectLegacy.js"),
  supportsDescriptors = require("./65557446.js"),
  toPrimitive = require("./toPrimitive.js"),
  nativeDefineProperty = Object.defineProperty;
legacyExports.f = require("./descriptorsSupport.js") ? Object.defineProperty : function defineProperty(target, propertyKey, descriptor) {
  if (assertObject(target), propertyKey = toPrimitive(propertyKey, !0), assertObject(descriptor), supportsDescriptors) try {
    return nativeDefineProperty(target, propertyKey, descriptor);
  } catch (error) {}
  if ("get" in descriptor || "set" in descriptor) throw TypeError("Accessors not supported!");
  return "value" in descriptor && (target[propertyKey] = descriptor.value), target;
};
