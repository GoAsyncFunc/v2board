let legacyModule = module,
  legacyExports = exports;
var r = require("./6e6d6e63.js"),
  i = require("./65556768.js"),
  o = require("./5a30636d.js"),
  a = require("./2f396161.js"),
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
