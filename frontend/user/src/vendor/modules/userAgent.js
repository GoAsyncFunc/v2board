let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = r.navigator;
legacyModule.exports = o && o.userAgent || "";
