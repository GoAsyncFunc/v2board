let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js").f,
  o = require("./422b4f54.js"),
  i = require("./55576958.js")("toStringTag");
legacyModule.exports = function (e, t, n) {
  e && !o(e = n ? e : e.prototype, i) && r(e, i, {
    configurable: !0,
    value: t
  });
};
