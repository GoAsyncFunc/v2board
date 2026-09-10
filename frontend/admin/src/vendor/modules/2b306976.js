let legacyModule = module,
  legacyExports = exports;
var r = require("./71444a38.js");
function i(e) {
  return !0 === r(e) && "[object Object]" === Object.prototype.toString.call(e);
}
legacyModule.exports = function (e) {
  var t, n;
  return !1 !== i(e) && (t = e.constructor, "function" === typeof t && (n = t.prototype, !1 !== i(n) && !1 !== n.hasOwnProperty("isPrototypeOf")));
};
