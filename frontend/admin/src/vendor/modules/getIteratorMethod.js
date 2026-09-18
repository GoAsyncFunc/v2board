let legacyModule = module,
  legacyExports = exports;
var r = require("./toStringTagType.js"),
  i = require("./wellKnownSymbol.js")("iterator"),
  o = require("./emptyExports.js");
legacyModule.exports = require("./coreJsVersion.js").getIteratorMethod = function (e) {
  if (void 0 != e) return e[i] || e["@@iterator"] || o[r(e)];
};
