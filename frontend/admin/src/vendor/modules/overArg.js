let legacyModule = module,
  legacyExports = exports;
function overArg(iteratee, transform) {
  return function (value) {
    return iteratee(transform(value));
  };
}
legacyModule.exports = overArg;
