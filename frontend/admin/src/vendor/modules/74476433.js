let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./75382b75.js"),
  o = require("./2b6d6d6d.js");
legacyModule.exports = function (e, t) {
  if (r(e), i(t) && t.constructor === e) return t;
  var n = o.f(e),
    a = n.resolve;
  return a(t), n.promise;
};
