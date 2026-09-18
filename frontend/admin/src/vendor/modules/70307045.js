let legacyModule = module,
  legacyExports = exports;
var r = require("./defineEnumerableProperty.js");
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      i = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), i.forEach(function (t) {
      r(e, t, n[t]);
    });
  }
  return e;
}
legacyModule.exports = i;
