let legacyModule = module,
  legacyExports = exports;
legacyExports.extend = i;
var r = Object.prototype.hasOwnProperty;
function i(e) {
  var t,
    n,
    i,
    o,
    a = Array.prototype.slice.call(arguments, 1);
  for (t = 0, n = a.length; t < n; t += 1) if (i = a[t], i) for (o in i) r.call(i, o) && (e[o] = i[o]);
  return e;
}
legacyExports.hop = r;
