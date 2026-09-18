let legacyModule = module,
  legacyExports = exports;
var r = require("./wellKnownSymbol.js")("unscopables"),
  i = Array.prototype;
void 0 == i[r] && require("./56504f45.js")(i, r, {}), legacyModule.exports = function (e) {
  i[r][e] = !0;
};
