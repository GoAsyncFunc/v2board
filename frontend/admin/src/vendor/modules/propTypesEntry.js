let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = require("./propTypesShim.js")();
