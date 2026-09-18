let legacyModule = module,
  legacyExports = exports;
var r = require("./32612f68.js"),
  i = require("./674c374e.js")("iterator"),
  o = require("./79773465.js");
legacyModule.exports = require("./62563566.js").getIteratorMethod = function (e) {
  if (void 0 != e) return e[i] || e["@@iterator"] || o[r(e)];
};
