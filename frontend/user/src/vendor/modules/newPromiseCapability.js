let legacyModule = module,
  legacyExports = exports;
var r = require("./requireCallable.js");
function o(e) {
  var t, n;
  this.promise = new e(function (e, r) {
    if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
    t = e, n = r;
  }), this.resolve = r(t), this.reject = r(n);
}
legacyModule.exports.f = function (e) {
  return new o(e);
};
