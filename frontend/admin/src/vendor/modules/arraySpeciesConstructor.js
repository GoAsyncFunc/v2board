let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObject.js"),
  isArray = require("./arrayIsArrayLegacyRuntime.js"),
  speciesSymbol = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function arraySpeciesConstructor(array) {
  var constructor;
  return isArray(array) && (constructor = array.constructor, "function" != typeof constructor || constructor !== Array && !isArray(constructor.prototype) || (constructor = void 0), isObject(constructor) && (constructor = constructor[speciesSymbol], null === constructor && (constructor = void 0))), void 0 === constructor ? Array : constructor;
};
