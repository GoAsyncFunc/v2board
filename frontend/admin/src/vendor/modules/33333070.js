let legacyModule = module,
  legacyExports = exports;
var r = require("./37744e78.js"),
  i = RegExp.prototype.exec,
  o = String.prototype.replace,
  a = i,
  s = "lastIndex",
  l = function () {
    var e = /a/,
      t = /b*/g;
    return i.call(e, "a"), i.call(t, "a"), 0 !== e[s] || 0 !== t[s];
  }(),
  c = void 0 !== /()??/.exec("")[1],
  u = l || c;
u && (a = function (e) {
  var t,
    n,
    a,
    u,
    h = this;
  return c && (n = new RegExp("^" + h.source + "$(?!\\s)", r.call(h))), l && (t = h[s]), a = i.call(h, e), l && a && (h[s] = h.global ? a.index + a[0].length : t), c && a && a.length > 1 && o.call(a[0], n, function () {
    for (u = 1; u < arguments.length - 2; u++) void 0 === arguments[u] && (a[u] = void 0);
  }), a;
}), legacyModule.exports = a;
