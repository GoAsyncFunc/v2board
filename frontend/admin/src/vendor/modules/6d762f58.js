let legacyModule = module,
  legacyExports = exports;
var r = require("./sameValueZero.js"),
  i = require("./isArrayLike.js"),
  o = require("./774a6737.js"),
  a = require("./isObjectValue.js");
function s(e, t, n) {
  if (!a(n)) return !1;
  var s = typeof t;
  return !!("number" == s ? i(n) && o(t, n.length) : "string" == s && t in n) && r(n[t], e);
}
legacyModule.exports = s;
