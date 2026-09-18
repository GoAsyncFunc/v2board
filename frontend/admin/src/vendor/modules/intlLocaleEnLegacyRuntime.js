let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = require("./intlRelativeFormatCore.js"),
  i = require("./intlRelativeFormatEnglishLocaleData.js");
r.default.__addLocaleData(i.default), r.default.defaultLocale = "en", legacyExports.default = r.default;
