let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  i = require("./32776532.js"),
  o = require("./wellKnownSymbol.js")("match");
legacyModule.exports = function (e) {
  var t;
  return r(e) && (void 0 !== (t = e[o]) ? !!t : "RegExp" == i(e));
};
