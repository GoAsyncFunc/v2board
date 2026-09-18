let legacyModule = module,
  legacyExports = exports;
var r = require("./defineEnumerableProperty.js");
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      o = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), o.forEach(function (t) {
      r(e, t, n[t]);
    });
  }
  return e;
}
legacyModule.exports = o;
