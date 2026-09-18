let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./isObjectLikeLegacy.js"),
  a = "[object Symbol]";
function o(e) {
  return "symbol" == typeof e || i(e) && r(e) == a;
}
legacyModule.exports = o;
