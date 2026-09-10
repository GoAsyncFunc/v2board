let legacyModule = module,
  legacyExports = exports;
var r = require("./4f6a6764.js"),
  i = Math.max,
  o = Math.min;
legacyModule.exports = function (e, t) {
  return e = r(e), e < 0 ? i(e + t, 0) : o(e, t);
};
