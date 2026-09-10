let legacyModule = module,
  legacyExports = exports;
var r = require("./41555777.js"),
  o = Math.max,
  i = Math.min;
legacyModule.exports = function (e, t) {
  return e = r(e), e < 0 ? o(e + t, 0) : i(e, t);
};
