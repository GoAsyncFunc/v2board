let legacyModule = module,
  legacyExports = exports;
var r = require("./774d7069.js");
function o(e, t) {
  if (null == e) return {};
  var n,
    o,
    i = r(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++) n = a[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
legacyModule.exports = o;
