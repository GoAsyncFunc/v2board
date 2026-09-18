let legacyModule = module,
  legacyExports = exports;
var r = require("./toInteger.js"),
  o = Math.min;
legacyModule.exports = function (e) {
  return e > 0 ? o(r(e), 9007199254740991) : 0;
};
