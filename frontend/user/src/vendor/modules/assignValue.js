let legacyModule = module,
  legacyExports = exports;
var r = require("./baseAssignValue.js"),
  i = require("./sameValueZero.js");
function a(e, t, n) {
  (void 0 === n || i(e[t], n)) && (void 0 !== n || t in e) || r(e, t, n);
}
legacyModule.exports = a;
