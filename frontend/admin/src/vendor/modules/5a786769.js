let legacyModule = module,
  legacyExports = exports;
var r = require("./35543259.js"),
  i = require("./coreJsNamespace.js"),
  o = require("./trueValue.js"),
  a = require("./wellKnownSymbolFactory.js"),
  s = require("./definePropertyLegacy.js").f;
legacyModule.exports = function (e) {
  var t = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
  "_" == e.charAt(0) || e in t || s(t, e, {
    value: a.f(e)
  });
};
