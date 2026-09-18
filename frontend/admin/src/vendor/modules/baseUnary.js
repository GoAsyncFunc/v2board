let legacyModule = module,
  legacyExports = exports;
function n(e) {
  return function (t) {
    return e(t);
  };
}
legacyModule.exports = n;
