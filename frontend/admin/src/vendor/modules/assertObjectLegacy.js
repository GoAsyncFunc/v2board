let legacyModule = module,
  legacyExports = exports;
var r = require("./isObjectLegacy.js");
legacyModule.exports = function (e) {
  if (!r(e)) throw TypeError(e + " is not an object!");
  return e;
};
