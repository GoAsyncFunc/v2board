let legacyModule = module,
  legacyExports = exports;
var r = require("./6454416c.js"),
  i = require("./getPrototypeOf.js"),
  a = require("./3673565a.js");
function o(e) {
  return "function" != typeof e.constructor || a(e) ? {} : r(i(e));
}
legacyModule.exports = o;
