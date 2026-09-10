let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./72655042.js");
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? Object(arguments[t]) : {},
      i = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && i.push.apply(i, Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    })), i.forEach(function (t) {
      Object(r["a"])(e, t, n[t]);
    });
  }
  return e;
}
