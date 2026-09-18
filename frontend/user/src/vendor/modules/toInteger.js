let legacyModule = module,
  legacyExports = exports;
var ceil = Math.ceil,
  floor = Math.floor;
legacyModule.exports = function toInteger(value) {
  return isNaN(value = +value) ? 0 : (value > 0 ? floor : ceil)(value);
};
