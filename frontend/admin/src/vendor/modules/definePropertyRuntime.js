let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js"),
  i = require("./72723169.js");
legacyModule.exports = require("./descriptorsSupport.js") ? function (e, t, n) {
  return r.f(e, t, i(1, n));
} : function (e, t, n) {
  return e[t] = n, e;
};
