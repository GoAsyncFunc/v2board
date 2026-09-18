let legacyModule = module,
  legacyExports = exports;
var r = require("./2f4d6664.js"),
  i = require("./7051474a.js"),
  o = require("./setToStringTag.js"),
  a = {};
require("./56504f45.js")(a, require("./wellKnownSymbol.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: i(1, n)
  }), o(e, t + " Iterator");
};
