let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./tryCatchTestLegacy.js")(function () {
  return 7 != Object.defineProperty({}, "a", {
    get: function () {
      return 7;
    }
  }).a;
});
