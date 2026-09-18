let legacyModule = module,
  legacyExports = exports;
var r = require("./6454416c.js"),
  i = require("./getPrototypeOf.js"),
  o = require("./isPrototype.js");
function a(e) {
  return "function" != typeof e.constructor || o(e) ? {} : r(i(e));
}
legacyModule.exports = a;
