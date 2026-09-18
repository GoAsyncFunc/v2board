let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  if ("function" != typeof e) throw TypeError(e + " is not a function!");
  return e;
};
