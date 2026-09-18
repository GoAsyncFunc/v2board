let legacyModule = module,
  legacyExports = exports;
var r = require("./784a6965.js"),
  i = require("./objectKeysIn.js");
legacyModule.exports = Object.keys || function (e) {
  return r(e, i);
};