let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyLegacy.js").f,
  i = require("./hasOwnLegacy.js"),
  o = require("./55576958.js")("toStringTag");
legacyModule.exports = function (e, t, n) {
  e && !i(e = n ? e : e.prototype, o) && r(e, o, {
    configurable: !0,
    value: t
  });
};
