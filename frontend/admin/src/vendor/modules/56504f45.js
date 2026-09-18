let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js"),
  i = require("./7051474a.js");
legacyModule.exports = require("./descriptorsLegacySupport.js") ? function (e, t, n) {
  return r.f(e, t, i(1, n));
} : function (e, t, n) {
  return e[t] = n, e;
};
