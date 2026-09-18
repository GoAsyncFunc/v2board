let legacyModule = module,
  legacyExports = exports;
var r = require("./assocIndexOf.js");
function i(e) {
  var t = this.__data__,
    n = r(t, e);
  return n < 0 ? void 0 : t[n][1];
}
legacyModule.exports = i;
