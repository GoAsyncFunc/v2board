let legacyModule = module,
  legacyExports = exports;
var r = require("./71444a38.js");
function o(e) {
  return !0 === r(e) && "[object Object]" === Object.prototype.toString.call(e);
}
legacyModule.exports = function (e) {
  var t, n;
  return !1 !== o(e) && (t = e.constructor, "function" === typeof t && (n = t.prototype, !1 !== o(n) && !1 !== n.hasOwnProperty("isPrototypeOf")));
};
