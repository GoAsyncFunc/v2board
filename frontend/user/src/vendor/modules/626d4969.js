let legacyModule = module,
  legacyExports = exports;
var r = require("./2f4d6664.js"),
  o = require("./7051474a.js"),
  i = require("./setToStringTag.js"),
  a = {};
require("./56504f45.js")(a, require("./wellKnownSymbol.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: o(1, n)
  }), i(e, t + " Iterator");
};
