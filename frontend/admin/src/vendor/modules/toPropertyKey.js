let legacyModule = module,
  legacyExports = exports;
var r = require("./typeofHelper.js")["default"],
  i = require("./toPrimitiveDefault.js");
function o(e) {
  var t = i(e, "string");
  return "symbol" === r(t) ? t : String(t);
}
legacyModule.exports = o, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
