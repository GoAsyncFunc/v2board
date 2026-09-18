let legacyModule = module,
  legacyExports = exports;
var r = require("./intlLocaleEnRuntime.js")["default"];
require("./emptyModule.js"), legacyExports = legacyModule.exports = r, legacyExports["default"] = legacyExports;
