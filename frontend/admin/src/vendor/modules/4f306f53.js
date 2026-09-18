let legacyModule = module,
  legacyExports = exports;
var r = require("./getNative.js"),
  i = function () {
    try {
      var e = r(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch (e) {}
  }();
legacyModule.exports = i;
