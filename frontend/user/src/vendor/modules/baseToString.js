let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbol.js"),
  i = require("./arrayMap.js"),
  a = require("./isArray.js"),
  o = require("./isSymbol.js"),
  u = 1 / 0,
  l = r ? r.prototype : void 0,
  s = l ? l.toString : void 0;
function c(e) {
  if ("string" == typeof e) return e;
  if (a(e)) return i(e, c) + "";
  if (o(e)) return s ? s.call(e) : "";
  var t = e + "";
  return "0" == t && 1 / e == -u ? "-0" : t;
}
legacyModule.exports = c;
