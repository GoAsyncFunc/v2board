let legacyModule = module,
  legacyExports = exports;
var r = require("./emptyExports.js"),
  o = require("./wellKnownSymbol.js")("iterator"),
  i = Array.prototype;
legacyModule.exports = function (e) {
  return void 0 !== e && (r.Array === e || i[o] === e);
};
