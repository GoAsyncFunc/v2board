let legacyModule = module,
  legacyExports = exports;
require("./symbolPolyfill.js"), require("./emptyModule.js"), require("./defineAsyncIteratorSymbol.js"), require("./defineObservableSymbol.js"), legacyModule.exports = require("./coreJsNamespace.js").Symbol;
