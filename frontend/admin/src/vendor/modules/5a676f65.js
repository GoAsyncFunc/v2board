let legacyModule = module,
  legacyExports = exports;
var r = require("./39484668.js"),
  i = require("./65367737.js"),
  o = require("./assertObject.js"),
  a = require("./globalObject.js").Reflect;
legacyModule.exports = a && a.ownKeys || function (e) {
  var t = r.f(o(e)),
    n = i.f;
  return n ? t.concat(n(e)) : t;
};
