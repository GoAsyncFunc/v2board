let legacyModule = module,
  legacyExports = exports;
var r = require("./35543259.js"),
  o = require("./5745706b.js"),
  i = require("./754f5053.js"),
  a = require("./7a4c6b47.js"),
  s = require("./definePropertyLegacy.js").f;
legacyModule.exports = function (e) {
  var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
  "_" == e.charAt(0) || e in t || s(t, e, {
    value: a.f(e)
  });
};
