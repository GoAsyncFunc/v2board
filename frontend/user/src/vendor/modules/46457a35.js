let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), legacyExports["default"] = window.settings.i18n["zh-TW"];
