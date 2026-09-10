let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n = -1,
    r = e.length;
  t || (t = Array(r));
  while (++n < r) t[n] = e[n];
  return t;
}
legacyModule.exports = n;
