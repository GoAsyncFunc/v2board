let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  o = require("./75382b75.js"),
  i = require("./2b6d6d6d.js");
legacyModule.exports = function (e, t) {
  if (r(e), o(t) && t.constructor === e) return t;
  var n = i.f(e),
    a = n.resolve;
  return a(t), n.promise;
};
