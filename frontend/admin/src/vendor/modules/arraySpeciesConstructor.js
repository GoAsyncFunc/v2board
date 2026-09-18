let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  i = require("./arrayIsArrayLegacyRuntime.js"),
  o = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e) {
  var t;
  return i(e) && (t = e.constructor, "function" != typeof t || t !== Array && !i(t.prototype) || (t = void 0), r(t) && (t = t[o], null === t && (t = void 0))), void 0 === t ? Array : t;
};
