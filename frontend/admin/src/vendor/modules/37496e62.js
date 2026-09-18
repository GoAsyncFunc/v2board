let legacyModule = module,
  legacyExports = exports;
var r = require("./intlLocaleEnLegacyRuntime.js")["default"];
require("./emptyModule.js"), legacyExports = legacyModule.exports = r, legacyExports["default"] = legacyExports;
