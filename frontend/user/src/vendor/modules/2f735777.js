let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./coreJsVersion.js"),
  i = require("./pureMode.js"),
  a = require("./7a4b6e68.js"),
  s = require("./definePropertyHelper.js").f;
legacyModule.exports = function (e) {
  var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
  "_" == e.charAt(0) || e in t || s(t, e, {
    value: a.f(e)
  });
};
