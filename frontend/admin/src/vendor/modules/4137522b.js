let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./descriptorsLegacySupport.js") && !require("./tryCatchTest.js")(function () {
  return 7 != Object.defineProperty(require("./createElement.js")("div"), "a", {
    get: function () {
      return 7;
    }
  }).a;
});
