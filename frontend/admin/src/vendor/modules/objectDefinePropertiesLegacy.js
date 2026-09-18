let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js"),
  i = require("./354b375a.js"),
  o = require("./7736474f.js");
legacyModule.exports = require("./descriptorsSupport.js") ? Object.defineProperties : function (e, t) {
  i(e);
  var n,
    a = o(t),
    s = a.length,
    l = 0;
  while (s > l) r.f(e, n = a[l++], t[n]);
  return e;
};
