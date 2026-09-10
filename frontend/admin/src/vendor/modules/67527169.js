let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  i = require("./56352f31.js"),
  o = require("./385a2f56.js"),
  a = require("./674c374e.js")("species");
legacyModule.exports = function (e) {
  var t = r[e];
  o && t && !t[a] && i.f(t, a, {
    configurable: !0,
    get: function () {
      return this;
    }
  });
};
