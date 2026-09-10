let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  try {
    return !!e();
  } catch (e) {
    return !0;
  }
};
