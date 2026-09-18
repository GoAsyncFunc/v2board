let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsExport.js");
r(r.S, "Object", {
  setPrototypeOf: require("./setPrototypeOfLegacyFallback.js").set
});
