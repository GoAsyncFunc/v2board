let legacyModule = module,
  legacyExports = exports;
var getNative = require("./getNative.js"),
  nativeDefineProperty = function () {
    try {
      var defineProperty = getNative(Object, "defineProperty");
      return defineProperty({}, "", {}), defineProperty;
    } catch (e) {}
  }();
legacyModule.exports = nativeDefineProperty;
