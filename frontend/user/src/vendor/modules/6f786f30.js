let legacyModule = module,
  legacyExports = exports;
var n = {}.hasOwnProperty;
legacyModule.exports = function (e, t) {
  return n.call(e, t);
};
