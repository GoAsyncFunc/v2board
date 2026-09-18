let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function tryCatchTest(test) {
  try {
    return !!test();
  } catch (e) {
    return !0;
  }
};
