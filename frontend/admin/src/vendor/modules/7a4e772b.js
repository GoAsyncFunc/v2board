let legacyModule = module,
  legacyExports = exports;
var r = require("./redefine.js");
legacyModule.exports = function (e, t, n) {
  for (var i in t) r(e, i, t[i], n);
  return e;
};
