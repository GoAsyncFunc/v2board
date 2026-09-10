let legacyModule = module,
  legacyExports = exports;
var r = require("./41555777.js"),
  o = require("./5a44722f.js");
legacyModule.exports = function (e) {
  var t = String(o(this)),
    n = "",
    i = r(e);
  if (i < 0 || i == 1 / 0) throw RangeError("Count can't be negative");
  for (; i > 0; (i >>>= 1) && (t += t)) 1 & i && (n += t);
  return n;
};
