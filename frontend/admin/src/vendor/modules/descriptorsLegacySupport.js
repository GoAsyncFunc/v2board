let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./tryCatchTest.js")(function () {
  return 7 != Object.defineProperty({}, "a", {
    get: function () {
      return 7;
    }
  }).a;
});
