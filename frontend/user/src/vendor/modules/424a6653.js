let legacyModule = module,
  legacyExports = exports;
var n = function (e) {
  return e.replace(/[A-Z]/g, function (e) {
    return "-" + e.toLowerCase();
  }).toLowerCase();
};
legacyModule.exports = n;
