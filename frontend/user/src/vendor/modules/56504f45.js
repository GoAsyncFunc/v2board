let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js"),
  o = require("./7051474a.js");
legacyModule.exports = require("./descriptorsLegacySupport.js") ? function (e, t, n) {
  return r.f(e, t, o(1, n));
} : function (e, t, n) {
  return e[t] = n, e;
};
