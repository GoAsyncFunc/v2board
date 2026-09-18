let legacyModule = module,
  legacyExports = exports;
var defineProperty = require("./nativeDefineProperty.js");
function baseAssignValue(object, key, value) {
  "__proto__" == key && defineProperty ? defineProperty(object, key, {
    configurable: !0,
    enumerable: !0,
    value: value,
    writable: !0
  }) : object[key] = value;
}
legacyModule.exports = baseAssignValue;
