let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./5a76705a.js"),
  r = n["a"];
legacyExports["default"] = r;
