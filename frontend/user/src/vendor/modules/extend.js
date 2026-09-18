let legacyModule = module,
  legacyExports = exports;
legacyExports.extend = o;
var r = Object.prototype.hasOwnProperty;
function o(e) {
  var t,
    n,
    o,
    i,
    a = Array.prototype.slice.call(arguments, 1);
  for (t = 0, n = a.length; t < n; t += 1) if (o = a[t], o) for (i in o) r.call(o, i) && (e[i] = o[i]);
  return e;
}
legacyExports.hop = r;
