let legacyModule = module,
  legacyExports = exports;
var r = require("./emptyExports.js"),
  i = require("./wellKnownSymbol.js")("iterator"),
  o = Array.prototype;
legacyModule.exports = function (e) {
  return void 0 !== e && (r.Array === e || o[i] === e);
};
