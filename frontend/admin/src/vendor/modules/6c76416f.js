let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js").f,
  i = require("./6f786f30.js"),
  o = require("./wellKnownSymbol.js")("toStringTag");
legacyModule.exports = function (e, t, n) {
  e && !i(e = n ? e : e.prototype, o) && r(e, o, {
    configurable: !0,
    value: t
  });
};
