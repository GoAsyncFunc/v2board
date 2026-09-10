let legacyModule = module,
  legacyExports = exports;
function n(e) {
  return function () {
    return e;
  };
}
legacyModule.exports = n;
