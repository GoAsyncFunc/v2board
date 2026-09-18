let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  o = require("./requireCallable.js"),
  i = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e, t) {
  var n,
    a = r(e).constructor;
  return void 0 === a || void 0 == (n = r(a)[i]) ? t : o(n);
};
