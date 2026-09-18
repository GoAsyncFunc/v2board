let legacyModule = module,
  legacyExports = exports;
var r = require("./isKey.js");
function i(e, t) {
  var n = e.__data__;
  return r(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
}
legacyModule.exports = i;
