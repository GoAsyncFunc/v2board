let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js");
legacyModule.exports = function (e, t) {
  if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
  return e;
};
