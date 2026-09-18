let legacyModule = module,
  legacyExports = exports;
var r = require("./regexpFlags.js"),
  o = RegExp.prototype.exec,
  i = String.prototype.replace,
  a = o,
  s = "lastIndex",
  c = function () {
    var e = /a/,
      t = /b*/g;
    return o.call(e, "a"), o.call(t, "a"), 0 !== e[s] || 0 !== t[s];
  }(),
  u = void 0 !== /()??/.exec("")[1],
  l = c || u;
l && (a = function (e) {
  var t,
    n,
    a,
    l,
    f = this;
  return u && (n = new RegExp("^" + f.source + "$(?!\\s)", r.call(f))), c && (t = f[s]), a = o.call(f, e), c && a && (f[s] = f.global ? a.index + a[0].length : t), u && a && a.length > 1 && i.call(a[0], n, function () {
    for (l = 1; l < arguments.length - 2; l++) void 0 === arguments[l] && (a[l] = void 0);
  }), a;
}), legacyModule.exports = a;
