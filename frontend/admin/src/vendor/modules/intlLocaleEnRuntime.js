let legacyModule = module,
  legacyExports = exports;
var r = require("./intlMessageFormatRuntime.js"),
  i = require("./intlLocaleEn.js");
r["default"].__addLocaleData(i["default"]), r["default"].defaultLocale = "en", legacyExports["default"] = r["default"];
