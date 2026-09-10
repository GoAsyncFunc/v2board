let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = !require("./77555779.js")(function () {
  return 7 != Object.defineProperty({}, "a", {
    get: function () {
      return 7;
    }
  }).a;
});
