let legacyModule = module,
  legacyExports = exports;
var n = Math.ceil,
  r = Math.floor;
legacyModule.exports = function (e) {
  return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
};
