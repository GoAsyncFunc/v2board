let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  return {
    value: t,
    done: !!e
  };
};
