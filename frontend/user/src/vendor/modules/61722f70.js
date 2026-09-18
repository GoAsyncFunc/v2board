let legacyModule = module,
  legacyExports = exports;
var r = require("./35764d56.js"),
  o = require("./objectKeysIn.js").concat("length", "prototype");
legacyExports.f = Object.getOwnPropertyNames || function (e) {
  return r(e, o);
};
