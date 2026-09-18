let legacyModule = module,
  legacyExports = exports;
var r = require("./toInteger.js"),
  o = require("./toLength.js");
legacyModule.exports = function (e) {
  if (void 0 === e) return 0;
  var t = r(e),
    n = o(t);
  if (t !== n) throw RangeError("Wrong length!");
  return n;
};
