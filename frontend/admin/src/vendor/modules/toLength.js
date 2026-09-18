let legacyModule = module,
  legacyExports = exports;
var r = require("./toInteger.js"),
  i = Math.min;
legacyModule.exports = function (e) {
  return e > 0 ? i(r(e), 9007199254740991) : 0;
};
