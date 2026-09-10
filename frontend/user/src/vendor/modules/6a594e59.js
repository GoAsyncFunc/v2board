let legacyModule = module,
  legacyExports = exports;
var r = require("./7267492b.js"),
  i = require("./6f39756c.js"),
  a = require("./38776d49.js"),
  o = "[object Object]",
  u = Function.prototype,
  l = Object.prototype,
  s = u.toString,
  c = l.hasOwnProperty,
  f = s.call(Object);
function d(e) {
  if (!a(e) || r(e) != o) return !1;
  var t = i(e);
  if (null === t) return !0;
  var n = c.call(t, "constructor") && t.constructor;
  return "function" == typeof n && n instanceof n && s.call(n) == f;
}
legacyModule.exports = d;
