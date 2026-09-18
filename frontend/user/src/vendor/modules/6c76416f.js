let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js").f,
  o = require("./6f786f30.js"),
  i = require("./wellKnownSymbol.js")("toStringTag");
legacyModule.exports = function (e, t, n) {
  e && !o(e = n ? e : e.prototype, i) && r(e, i, {
    configurable: !0,
    value: t
  });
};
