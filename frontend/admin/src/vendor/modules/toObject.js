let legacyModule = module,
  legacyExports = exports;
var r = require("./requireObject.js");
legacyModule.exports = function (e) {
  return Object(r(e));
};
