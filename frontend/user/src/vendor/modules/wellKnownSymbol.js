let legacyModule = module,
  legacyExports = exports;
var r = require("./sharedStore.js")("wks"),
  o = require("./uid.js"),
  i = require("./globalObject.js").Symbol,
  a = "function" == typeof i,
  s = legacyModule.exports = function (e) {
    return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e));
  };
s.store = r;
