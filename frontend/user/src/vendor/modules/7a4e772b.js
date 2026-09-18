let legacyModule = module,
  legacyExports = exports;
var r = require("./redefine.js");
legacyModule.exports = function (e, t, n) {
  for (var o in t) r(e, o, t[o], n);
  return e;
};
