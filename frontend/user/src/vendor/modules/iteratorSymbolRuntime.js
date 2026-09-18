let legacyModule = module,
  legacyExports = exports;
require("./stringIteratorPolyfill.js"), require("./tagBuiltInCollections.js"), legacyModule.exports = require("./wellKnownSymbolFactory.js").f("iterator");
