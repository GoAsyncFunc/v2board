let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  i = require("./77596d38.js"),
  o = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e, t) {
  var n,
    a = r(e).constructor;
  return void 0 === a || void 0 == (n = r(a)[o]) ? t : i(n);
};
