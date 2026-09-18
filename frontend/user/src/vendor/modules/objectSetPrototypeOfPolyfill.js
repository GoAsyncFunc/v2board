let legacyModule = module,
  legacyExports = exports;
var coreJsExport = require("./coreJsExport.js");
coreJsExport(coreJsExport.S, "Object", {
  setPrototypeOf: require("./setPrototypeOfLegacyFallback.js").set
});
