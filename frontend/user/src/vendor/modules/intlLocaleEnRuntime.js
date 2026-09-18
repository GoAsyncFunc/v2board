let legacyModule = module,
  legacyExports = exports;
var r = require("./intlMessageFormatRuntime.js"),
  o = require("./intlLocaleEn.js");
r["default"].__addLocaleData(o["default"]), r["default"].defaultLocale = "en", legacyExports["default"] = r["default"];
