let legacyModule = module,
  legacyExports = exports;
var constant = require("./constantFactory.js"),
  defineProperty = require("./nativeDefineProperty.js"),
  identity = require("./identity.js"),
  baseSetToString = defineProperty ? function (func, string) {
    return defineProperty(func, "toString", {
      configurable: !0,
      enumerable: !1,
      value: constant(string),
      writable: !0
    });
  } : identity;
legacyModule.exports = baseSetToString;
