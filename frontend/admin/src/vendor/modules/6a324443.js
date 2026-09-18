let legacyModule = module,
  legacyExports = exports;
var r = require("./6f566d6c.js"),
  i = require("./72723169.js"),
  o = require("./52664b42.js"),
  a = {};
require("./definePropertyRuntime.js")(a, require("./55576958.js")("iterator"), function () {
  return this;
}), legacyModule.exports = function (e, t, n) {
  e.prototype = r(a, {
    next: i(1, n)
  }), o(e, t + " Iterator");
};
