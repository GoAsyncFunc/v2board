let legacyModule = module,
  legacyExports = exports;
var r = require("./objectCreateLegacy.js"),
  i = require("./propertyDescriptorFlags.js"),
  o = require("./setToStringTag.js"),
  a = {};
require("./definePropertyRuntime.js")(a, require("./wellKnownSymbolLegacy.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: i(1, n)
  }), o(e, t + " Iterator");
};
