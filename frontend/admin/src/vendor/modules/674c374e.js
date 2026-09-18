let legacyModule = module,
  legacyExports = exports;
var r = require("./56797551.js")("wks"),
  i = require("./6b434b35.js"),
  o = require("./globalObject.js").Symbol,
  a = "function" == typeof o,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && o[e] || (a ? o : i)("Symbol." + e));
  };
s.store = r;
