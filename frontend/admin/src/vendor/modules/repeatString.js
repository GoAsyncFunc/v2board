let legacyModule = module,
  legacyExports = exports;
var r = require("./toInteger.js"),
  i = require("./requireObjectCoercible.js");
legacyModule.exports = function (e) {
  var t = String(i(this)),
    n = "",
    o = r(e);
  if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
  for (; o > 0; (o >>>= 1) && (t += t)) 1 & o && (n += t);
  return n;
};
