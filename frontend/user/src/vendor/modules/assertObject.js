let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js");
legacyModule.exports = function (e) {
  if (!r(e)) throw TypeError(e + " is not an object!");
  return e;
};
