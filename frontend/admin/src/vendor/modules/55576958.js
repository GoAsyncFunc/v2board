let legacyModule = module,
  legacyExports = exports;
var r = require("./3239732f.js")("wks"),
  i = require("./uid.js"),
  o = require("./globalObject.js").Symbol,
  a = "function" == typeof o,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && o[e] || (a ? o : i)("Symbol." + e));
  };
s.store = r;
