let legacyModule = module,
  legacyExports = exports;
var n = {}.toString;
legacyModule.exports = function (e) {
  return n.call(e).slice(8, -1);
};
