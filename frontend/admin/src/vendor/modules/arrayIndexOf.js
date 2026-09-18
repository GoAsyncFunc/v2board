let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  if (e.indexOf) return e.indexOf(t);
  for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
  return -1;
};
