let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./isObjectLikeLegacy.js"),
  o = "[object Symbol]";
function a(e) {
  return "symbol" == typeof e || i(e) && r(e) == o;
}
legacyModule.exports = a;
