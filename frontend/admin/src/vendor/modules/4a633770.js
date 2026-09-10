let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js");
legacyModule.exports = function (e, t) {
  if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
  return e;
};
