let legacyModule = module,
  legacyExports = exports;
var r = require("./39484668.js"),
  o = require("./getOwnPropertySymbols.js"),
  i = require("./assertObject.js"),
  a = require("./globalObject.js").Reflect;
legacyModule.exports = a && a.ownKeys || function (e) {
  var t = r.f(i(e)),
    n = o.f;
  return n ? t.concat(n(e)) : t;
};
