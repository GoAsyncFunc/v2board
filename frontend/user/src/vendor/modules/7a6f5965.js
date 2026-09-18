let legacyModule = module,
  legacyExports = exports;
var r = require("./6e6d6e63.js"),
  i = require("./65556768.js"),
  a = require("./isArray.js"),
  o = require("./2f396161.js"),
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
