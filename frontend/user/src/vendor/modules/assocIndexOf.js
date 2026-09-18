let legacyModule = module,
  legacyExports = exports;
var r = require("./sameValueZero.js");
function i(e, t) {
  var n = e.length;
  while (n--) if (r(e[n][0], t)) return n;
  return -1;
}
legacyModule.exports = i;
