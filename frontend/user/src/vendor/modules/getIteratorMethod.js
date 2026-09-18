let legacyModule = module,
  legacyExports = exports;
var r = require("./toStringTagType.js"),
  o = require("./wellKnownSymbol.js")("iterator"),
  i = require("./emptyExports.js");
legacyModule.exports = require("./62563566.js").getIteratorMethod = function (e) {
  if (void 0 != e) return e[o] || e["@@iterator"] || i[r(e)];
};
