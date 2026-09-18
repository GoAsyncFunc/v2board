let legacyModule = module,
  legacyExports = exports;
function identity(value) {
  return value;
}
legacyModule.exports = identity;
