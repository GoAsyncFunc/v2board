let legacyModule = module,
  legacyExports = exports;
var r = require("./requireObjectCoercible.js");
legacyModule.exports = function (e) {
  return Object(r(e));
};
