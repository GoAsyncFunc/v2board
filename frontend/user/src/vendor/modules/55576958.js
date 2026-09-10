let legacyModule = module,
  legacyExports = exports;
var r = require("./3239732f.js")("wks"),
  o = require("./59714163.js"),
  i = require("./35543259.js").Symbol,
  a = "function" == typeof i,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e));
  };
s.store = r;
