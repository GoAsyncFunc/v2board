let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n, r) {
  if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
  return e;
};
