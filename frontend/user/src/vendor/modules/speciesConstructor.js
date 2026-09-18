let legacyModule = module,
  legacyExports = exports;
var r = require("./arraySpeciesConstructor.js");
legacyModule.exports = function (e, t) {
  return new (r(e))(t);
};
