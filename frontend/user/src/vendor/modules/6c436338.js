let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsExport.js");
r(r.S, "Object", {
  create: require("./objectCreateLegacy.js")
});
