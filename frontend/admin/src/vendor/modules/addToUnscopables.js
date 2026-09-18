let legacyModule = module,
  legacyExports = exports;
var unscopablesSymbol = require("./wellKnownSymbol.js")("unscopables"),
  arrayPrototype = Array.prototype;
void 0 == arrayPrototype[unscopablesSymbol] && require("./56504f45.js")(arrayPrototype, unscopablesSymbol, {}), legacyModule.exports = function addToUnscopables(propertyName) {
  arrayPrototype[unscopablesSymbol][propertyName] = !0;
};
