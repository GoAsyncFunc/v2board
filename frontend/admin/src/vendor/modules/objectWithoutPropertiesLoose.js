let legacyModule = module,
  legacyExports = exports;
var r = require("./objectWithoutProperties.js");
function i(e, t) {
  if (null == e) return {};
  var n,
    i,
    o = r(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) n = a[i], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
legacyModule.exports = i;
