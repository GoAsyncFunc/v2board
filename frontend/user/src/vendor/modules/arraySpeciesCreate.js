let legacyModule = module,
  legacyExports = exports;
var arraySpeciesConstructor = require("./arraySpeciesConstructor.js");
legacyModule.exports = function arraySpeciesCreate(originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length);
};
