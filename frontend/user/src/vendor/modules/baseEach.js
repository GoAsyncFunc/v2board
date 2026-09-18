let legacyModule = module,
  legacyExports = exports;
var createBaseEach = require("./createBaseEach.js"),
  baseEach = createBaseEach();
legacyModule.exports = baseEach;
