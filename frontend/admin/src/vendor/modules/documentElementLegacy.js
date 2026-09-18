let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js").document;
legacyModule.exports = r && r.documentElement;
