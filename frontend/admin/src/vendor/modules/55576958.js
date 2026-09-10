let legacyModule = module,
  legacyExports = exports;
var r = require("./3239732f.js")("wks"),
  i = require("./59714163.js"),
  o = require("./35543259.js").Symbol,
  a = "function" == typeof o,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && o[e] || (a ? o : i)("Symbol." + e));
  };
s.store = r;
