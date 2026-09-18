let legacyModule = module,
  legacyExports = exports;
function isObjectLike(value) {
  return null != value && "object" == typeof value;
}
legacyModule.exports = isObjectLike;
