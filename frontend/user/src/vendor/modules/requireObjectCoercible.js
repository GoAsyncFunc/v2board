let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function requireObjectCoercible(value) {
  if (void 0 == value) throw TypeError("Can't call method on  " + value);
  return value;
};
