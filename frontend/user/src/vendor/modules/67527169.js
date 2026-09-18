let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./56352f31.js"),
  i = require("./385a2f56.js"),
  a = require("./674c374e.js")("species");
legacyModule.exports = function (e) {
  var t = r[e];
  i && t && !t[a] && o.f(t, a, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};
