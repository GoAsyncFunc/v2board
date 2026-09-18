let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbol.js"),
  i = require("./arrayMap.js"),
  o = require("./isArray.js"),
  a = require("./isSymbol.js"),
  s = 1 / 0,
  l = r ? r.prototype : void 0,
  u = l ? l.toString : void 0;
function c(e) {
  if ("string" == typeof e) return e;
  if (o(e)) return i(e, c) + "";
  if (a(e)) return u ? u.call(e) : "";
  var t = e + "";
  return "0" == t && 1 / e == -s ? "-0" : t;
}
legacyModule.exports = c;
