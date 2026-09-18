let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  o = require("./rawClassNameLegacy.js"),
  i = require("./wellKnownSymbol.js")("match");
legacyModule.exports = function (e) {
  var t;
  return r(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" == o(e));
};
