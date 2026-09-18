let legacyModule = module,
  legacyExports = exports;
var r = require("./objectCreateLegacy.js"),
  o = require("./propertyDescriptorFlags.js"),
  i = require("./setToStringTag.js"),
  a = {};
require("./definePropertyRuntime.js")(a, require("./wellKnownSymbolLegacy.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: o(1, n)
  }), i(e, t + " Iterator");
};
