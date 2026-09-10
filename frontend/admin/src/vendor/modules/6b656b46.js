let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  return function (n) {
    return e(t(n));
  };
}
legacyModule.exports = n;
