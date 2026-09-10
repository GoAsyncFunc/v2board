let legacyModule = module,
  legacyExports = exports;
var r = require("./56797551.js")("wks"),
  o = require("./6b434b35.js"),
  i = require("./63304f79.js").Symbol,
  a = "function" == typeof i,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e));
  };
s.store = r;
