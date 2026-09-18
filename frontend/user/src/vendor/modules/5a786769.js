let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./coreJsNamespace.js"),
  i = require("./trueValue.js"),
  a = require("./wellKnownSymbolFactory.js"),
  s = require("./definePropertyLegacy.js").f;
legacyModule.exports = function (e) {
  var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
  "_" == e.charAt(0) || e in t || s(t, e, {
    value: a.f(e)
  });
};
