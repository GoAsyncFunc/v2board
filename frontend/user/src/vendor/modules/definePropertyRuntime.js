let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js"),
  o = require("./72723169.js");
legacyModule.exports = require("./descriptorsSupport.js") ? function (e, t, n) {
  return r.f(e, t, o(1, n));
} : function (e, t, n) {
  return e[t] = n, e;
};
