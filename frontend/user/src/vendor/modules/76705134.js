let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./72655042.js");
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? Object(arguments[t]) : {},
      o = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    })), o.forEach(function (t) {
      Object(r["a"])(e, t, n[t]);
    });
  }
  return e;
}
