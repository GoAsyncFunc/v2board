let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = r.navigator;
legacyModule.exports = i && i.userAgent || "";
