let legacyModule = module,
  legacyExports = exports;
var r = !1,
  i = function () {};
if (r) {
  var o = function (e, t) {
    var n = arguments.length;
    t = new Array(n > 1 ? n - 1 : 0);
    for (var r = 1; r < n; r++) t[r - 1] = arguments[r];
    var i = 0,
      o = "Warning: " + e.replace(/%s/g, function () {
        return t[i++];
      });
    "undefined" !== typeof console && console.error(o);
    try {
      throw new Error(o);
    } catch (e) {}
  };
  i = function (e, t, n) {
    var r = arguments.length;
    n = new Array(r > 2 ? r - 2 : 0);
    for (var i = 2; i < r; i++) n[i - 2] = arguments[i];
    if (void 0 === t) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
    e || o.apply(null, [t].concat(n));
  };
}
legacyModule.exports = i;
