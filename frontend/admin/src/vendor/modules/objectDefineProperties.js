let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js"),
  i = require("./assertObject.js"),
  o = require("./objectKeys.js");
legacyModule.exports = require("./descriptorsLegacySupport.js") ? Object.defineProperties : function (e, t) {
  i(e);
  var n,
    a = o(t),
    s = a.length,
    l = 0;
  while (s > l) r.f(e, n = a[l++], t[n]);
  return e;
};
