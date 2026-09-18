let legacyModule = module,
  legacyExports = exports;
var r = require("./6879706f.js"),
  i = require("./sameValueZero.js"),
  o = Object.prototype,
  a = o.hasOwnProperty;
function s(e, t, n) {
  var o = e[t];
  a.call(e, t) && i(o, n) && (void 0 !== n || t in e) || r(e, t, n);
}
legacyModule.exports = s;
