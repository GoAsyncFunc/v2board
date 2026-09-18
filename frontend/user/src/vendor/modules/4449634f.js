let legacyModule = module,
  legacyExports = exports;
var r = require("./wellKnownSymbol.js")("unscopables"),
  o = Array.prototype;
void 0 == o[r] && require("./56504f45.js")(o, r, {}), legacyModule.exports = function (e) {
  o[r][e] = !0;
};
