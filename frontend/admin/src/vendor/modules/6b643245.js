let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
legacyModule.exports = function (e, t, n, o) {
  t = t || "&", n = n || "=";
  var a = {};
  if ("string" !== typeof e || 0 === e.length) return a;
  var s = /\+/g;
  e = e.split(t);
  var l = 1e3;
  o && "number" === typeof o.maxKeys && (l = o.maxKeys);
  var c = e.length;
  l > 0 && c > l && (c = l);
  for (var u = 0; u < c; ++u) {
    var h,
      f,
      d,
      p,
      m = e[u].replace(s, "%20"),
      g = m.indexOf(n);
    g >= 0 ? (h = m.substr(0, g), f = m.substr(g + 1)) : (h = m, f = ""), d = decodeURIComponent(h), p = decodeURIComponent(f), r(a, d) ? i(a[d]) ? a[d].push(p) : a[d] = [a[d], p] : a[d] = p;
  }
  return a;
};
var i = Array.isArray || function (e) {
  return "[object Array]" === Object.prototype.toString.call(e);
};
