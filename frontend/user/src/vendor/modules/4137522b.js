let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./descriptorsLegacySupport.js") && !require("./tryCatchTest.js")(function () {
  return 7 != Object.defineProperty(require("./53664447.js")("div"), "a", {
    get: function () {
      return 7;
    }
  }).a;
});
