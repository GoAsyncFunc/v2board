let legacyModule = module,
  legacyExports = exports;
var globalObject = require("./globalObject.js"),
  coreJsNamespace = require("./coreJsNamespace.js"),
  pureMode = require("./trueValue.js"),
  wellKnownSymbolFactory = require("./wellKnownSymbolFactory.js"),
  defineProperty = require("./definePropertyLegacy.js").f;
legacyModule.exports = function defineWellKnownSymbol(name) {
  var SymbolConstructor = coreJsNamespace.Symbol || (coreJsNamespace.Symbol = pureMode ? {} : globalObject.Symbol || {});
  "_" == name.charAt(0) || name in SymbolConstructor || defineProperty(SymbolConstructor, name, {
    value: wellKnownSymbolFactory.f(name)
  });
};
