let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  i = require("./isObject.js"),
  o = require("./2b6d6d6d.js");
legacyModule.exports = function (e, t) {
  if (r(e), i(t) && t.constructor === e) return t;
  var n = o.f(e),
    a = n.resolve;
  return a(t), n.promise;
};
