let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js"),
  o = require("./assertObjectLegacy.js"),
  i = require("./7736474f.js");
legacyModule.exports = require("./descriptorsSupport.js") ? Object.defineProperties : function (e, t) {
  o(e);
  var n,
    a = i(t),
    s = a.length,
    c = 0;
  while (s > c) r.f(e, n = a[c++], t[n]);
  return e;
};
