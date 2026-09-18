let legacyModule = module,
  legacyExports = exports;
var objectKeys = require("./objectKeysLegacy.js"),
  getOwnPropertySymbols = require("./getOwnPropertySymbolsLegacy.js"),
  propertyIsEnumerable = require("./propertyIsEnumerableLegacy.js");
legacyModule.exports = function enumerableOwnKeysLegacy(object) {
  var result = objectKeys(object),
    getSymbols = getOwnPropertySymbols.f;
  if (getSymbols) {
    var symbol,
      symbols = getSymbols(object),
      isEnumerable = propertyIsEnumerable.f,
      index = 0;
    while (symbols.length > index) isEnumerable.call(object, symbol = symbols[index++]) && result.push(symbol);
  }
  return result;
};
