let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsExport.js");
r(r.S + r.F * !require("./descriptorsSupport.js"), "Object", {
  defineProperty: require("./definePropertyLegacy.js").f
});
