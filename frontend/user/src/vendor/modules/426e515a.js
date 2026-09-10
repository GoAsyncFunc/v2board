let legacyModule = module,
  legacyExports = exports;
var r = require("./32612f68.js"),
  o = require("./674c374e.js")("iterator"),
  i = require("./79773465.js");
legacyModule.exports = require("./62563566.js").getIteratorMethod = function (e) {
  if (void 0 != e) return e[o] || e["@@iterator"] || i[r(e)];
};
