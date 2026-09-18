let legacyModule = module,
  legacyExports = exports;
var r = require("./2f4d6664.js"),
  i = require("./createPropertyDescriptor.js"),
  o = require("./setToStringTag.js"),
  a = {};
require("./definePropertyValue.js")(a, require("./wellKnownSymbol.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: i(1, n)
  }), o(e, t + " Iterator");
};
