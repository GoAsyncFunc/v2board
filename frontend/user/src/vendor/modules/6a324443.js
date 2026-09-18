let legacyModule = module,
  legacyExports = exports;
var r = require("./6f566d6c.js"),
  o = require("./propertyDescriptorFlags.js"),
  i = require("./52664b42.js"),
  a = {};
require("./definePropertyRuntime.js")(a, require("./55576958.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: o(1, n)
  }), i(e, t + " Iterator");
};
