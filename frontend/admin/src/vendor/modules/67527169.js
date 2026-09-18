let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = require("./definePropertyHelper.js"),
  o = require("./descriptorsLegacySupport.js"),
  a = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e) {
  var t = r[e];
  o && t && !t[a] && i.f(t, a, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};
