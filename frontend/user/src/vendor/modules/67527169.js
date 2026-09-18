let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./definePropertyHelper.js"),
  i = require("./descriptorsLegacySupport.js"),
  a = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e) {
  var t = r[e];
  i && t && !t[a] && o.f(t, a, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};
