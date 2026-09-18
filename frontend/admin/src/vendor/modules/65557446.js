let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./descriptorsSupport.js") && !require("./4b557850.js")(function () {
  return 7 != Object.defineProperty(require("./48736e73.js")("div"), "a", {
    get: function () {
      return 7;
    }
  }).a;
});
