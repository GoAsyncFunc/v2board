let legacyModule = module,
  legacyExports = exports;
var r = require("./77596d38.js");
legacyModule.exports = function (e, t, n) {
  if (r(e), void 0 === t) return e;
  switch (n) {
    case 1:
      return function (n) {
        return e.call(t, n);
      };
    case 2:
      return function (n, r) {
        return e.call(t, n, r);
      };
    case 3:
      return function (n, r, i) {
        return e.call(t, n, r, i);
      };
  }
  return function () {
    return e.apply(t, arguments);
  };
};
