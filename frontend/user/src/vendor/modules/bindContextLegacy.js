let legacyModule = module,
  legacyExports = exports;
var requireCallable = require("./requireCallable.js");
legacyModule.exports = function bindContextLegacy(func, thisArg, arity) {
  if (requireCallable(func), void 0 === thisArg) return func;
  switch (arity) {
    case 1:
      return function (value) {
        return func.call(thisArg, value);
      };
    case 2:
      return function (firstValue, secondValue) {
        return func.call(thisArg, firstValue, secondValue);
      };
    case 3:
      return function (firstValue, secondValue, thirdValue) {
        return func.call(thisArg, firstValue, secondValue, thirdValue);
      };
  }
  return function () {
    return func.apply(thisArg, arguments);
  };
};
