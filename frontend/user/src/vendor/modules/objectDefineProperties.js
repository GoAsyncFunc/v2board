let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js"),
  o = require("./assertObject.js"),
  i = require("./objectKeys.js");
legacyModule.exports = require("./descriptorsLegacySupport.js") ? Object.defineProperties : function (e, t) {
  o(e);
  var n,
    a = i(t),
    s = a.length,
    c = 0;
  while (s > c) r.f(e, n = a[c++], t[n]);
  return e;
};
