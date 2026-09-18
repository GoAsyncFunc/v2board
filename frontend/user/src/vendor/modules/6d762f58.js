let legacyModule = module,
  legacyExports = exports;
var r = require("./sameValueZero.js"),
  i = require("./isArrayLike.js"),
  a = require("./774a6737.js"),
  o = require("./isObjectValue.js");
function u(e, t, n) {
  if (!o(n)) return !1;
  var u = typeof t;
  return !!("number" == u ? i(n) && a(t, n.length) : "string" == u && t in n) && r(n[t], e);
}
legacyModule.exports = u;
