let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  o = require("./isObject.js"),
  i = require("./newPromiseCapability.js");
legacyModule.exports = function (e, t) {
  if (r(e), o(t) && t.constructor === e) return t;
  var n = i.f(e),
    a = n.resolve;
  return a(t), n.promise;
};
