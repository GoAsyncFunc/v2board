let legacyModule = module,
  legacyExports = exports;
function sameValueZero(left, right) {
  return left === right || left !== left && right !== right;
}
legacyModule.exports = sameValueZero;
