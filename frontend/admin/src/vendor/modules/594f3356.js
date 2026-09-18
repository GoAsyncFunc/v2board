let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./getPrototypeOf.js"),
  o = require("./isObjectLikeLegacy.js"),
  a = "[object Object]",
  s = Function.prototype,
  l = Object.prototype,
  u = s.toString,
  c = l.hasOwnProperty,
  f = u.call(Object);
function d(e) {
  if (!o(e) || r(e) != a) return !1;
  var t = i(e);
  if (null === t) return !0;
  var n = c.call(t, "constructor") && t.constructor;
  return "function" == typeof n && n instanceof n && u.call(n) == f;
}
legacyModule.exports = d;
