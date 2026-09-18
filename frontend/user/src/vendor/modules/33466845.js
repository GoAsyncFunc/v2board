let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  o = require("./45705844.js"),
  i = require("./wellKnownSymbol.js")("species");
legacyModule.exports = function (e) {
  var t;
  return o(e) && (t = e.constructor, "function" != typeof t || t !== Array && !o(t.prototype) || (t = void 0), r(t) && (t = t[i], null === t && (t = void 0))), void 0 === t ? Array : t;
};
