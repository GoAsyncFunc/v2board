let legacyModule = module,
  legacyExports = exports;
var globalObject = require("./globalObject.js"),
  defineProperty = require("./definePropertyHelper.js"),
  descriptorsSupported = require("./descriptorsLegacySupport.js"),
  speciesSymbol = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function setSpecies(constructorName) {
  var Constructor = globalObject[constructorName];
  descriptorsSupported && Constructor && !Constructor[speciesSymbol] && defineProperty.f(Constructor, speciesSymbol, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};
