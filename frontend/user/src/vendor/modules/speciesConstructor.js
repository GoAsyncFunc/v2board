let legacyModule = module,
  legacyExports = exports;
var assertObject = require("./assertObject.js"),
  requireCallable = require("./requireCallable.js"),
  speciesSymbol = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function speciesConstructor(object, defaultConstructor) {
  var species,
    constructor = assertObject(object).constructor;
  return void 0 === constructor || void 0 == (species = assertObject(constructor)[speciesSymbol]) ? defaultConstructor : requireCallable(species);
};
