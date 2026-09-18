let legacyModule = module,
  legacyExports = exports;
var r = require("./baseGetPrototypeFallback.js"),
  i = require("./getPrototypeOf.js"),
  a = require("./isPrototype.js");
function o(e) {
  return "function" != typeof e.constructor || a(e) ? {} : r(i(e));
}
legacyModule.exports = o;
