let legacyModule = module,
  legacyExports = exports;
var r = require("./baseAssignValue.js"),
  i = require("./sameValueZero.js"),
  a = Object.prototype,
  o = a.hasOwnProperty;
function u(e, t, n) {
  var a = e[t];
  o.call(e, t) && i(a, n) && (void 0 !== n || t in e) || r(e, t, n);
}
legacyModule.exports = u;
