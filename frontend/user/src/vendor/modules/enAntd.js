let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./antdEnglishLocale.js"),
  r = n["a"];
legacyExports["default"] = r;
