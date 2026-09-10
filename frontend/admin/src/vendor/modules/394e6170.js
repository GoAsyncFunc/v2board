let legacyModule = module,
  legacyExports = exports;
var r = require("./2f396161.js"),
  i = 1 / 0;
function o(e) {
  if ("string" == typeof e || r(e)) return e;
  var t = e + "";
  return "0" == t && 1 / e == -i ? "-0" : t;
}
legacyModule.exports = o;
