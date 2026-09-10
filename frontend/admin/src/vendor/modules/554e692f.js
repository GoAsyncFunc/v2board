let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n = -1,
    r = Array(e);
  while (++n < e) r[n] = t(n);
  return r;
}
legacyModule.exports = n;
