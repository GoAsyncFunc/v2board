let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n = -1,
    r = null == e ? 0 : e.length,
    i = Array(r);
  while (++n < r) i[n] = t(e[n], n, e);
  return i;
}
legacyModule.exports = n;
