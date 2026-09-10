let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  try {
    return {
      e: !1,
      v: e()
    };
  } catch (e) {
    return {
      e: !0,
      v: e
    };
  }
};
