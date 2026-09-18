let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./descriptorsSupport.js") && !require("./tryCatchTestLegacy.js")(function supportsLegacyDomAccessors() {
  return 7 != Object.defineProperty(require("./createElement.js")("div"), "a", {
    get: function () {
      return 7;
    }
  }).a;
});
