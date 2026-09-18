let legacyModule = module,
  legacyExports = exports;
var sharedSymbols = require("./coreJsSharedStore.js")("wks"),
  uid = require("./uid.js"),
  SymbolConstructor = require("./globalObject.js").Symbol,
  hasNativeSymbol = "function" == typeof SymbolConstructor,
  wellKnownSymbol = legacyModule.exports = function (name) {
    return sharedSymbols[name] || (sharedSymbols[name] = hasNativeSymbol && SymbolConstructor[name] || (hasNativeSymbol ? SymbolConstructor : uid)("Symbol." + name));
  };
wellKnownSymbol.store = sharedSymbols;
