let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./62563566.js"),
  i = require("./46715048.js"),
  a = require("./7a4b6e68.js"),
  s = require("./56352f31.js").f;
legacyModule.exports = function (e) {
  var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
  "_" == e.charAt(0) || e in t || s(t, e, {
    value: a.f(e)
  });
};
