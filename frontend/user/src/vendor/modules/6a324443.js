let legacyModule = module,
  legacyExports = exports;
var r = require("./6f566d6c.js"),
  o = require("./72723169.js"),
  i = require("./52664b42.js"),
  a = {};
require("./4e65674d.js")(a, require("./55576958.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: o(1, n)
  }), i(e, t + " Iterator");
};
