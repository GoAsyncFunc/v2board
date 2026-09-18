let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function () {
  throw new Error("define cannot be used indirect");
};
