let legacyModule = module,
  legacyExports = exports;
var r = require("./784a6965.js"),
  i = require("./objectKeysIn.js").concat("length", "prototype");
legacyExports.f = Object.getOwnPropertyNames || function (e) {
  return r(e, i);
};