let legacyModule = module,
  legacyExports = exports;
var r = !1,
  o = function () {};
if (r) {
  var i = function (e, t) {
    var n = arguments.length;
    t = new Array(n > 1 ? n - 1 : 0);
    for (var r = 1; r < n; r++) t[r - 1] = arguments[r];
    var o = 0,
      i = "Warning: " + e.replace(/%s/g, function () {
        return t[o++];
      });
    "undefined" !== typeof console && console.error(i);
    try {
      throw new Error(i);
    } catch (e) {}
  };
  o = function (e, t, n) {
    var r = arguments.length;
    n = new Array(r > 2 ? r - 2 : 0);
    for (var o = 2; o < r; o++) n[o - 2] = arguments[o];
    if (void 0 === t) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
    e || i.apply(null, [t].concat(n));
  };
}
legacyModule.exports = o;
