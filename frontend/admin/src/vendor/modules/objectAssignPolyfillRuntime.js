let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsExport.js");
r(r.S + r.F, "Object", {
  assign: require("./objectAssignLegacy.js")
});
