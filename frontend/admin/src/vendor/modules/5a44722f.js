let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  if (void 0 == e) throw TypeError("Can't call method on  " + e);
  return e;
};
