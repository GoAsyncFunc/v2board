let legacyModule = module,
  legacyExports = exports;
var r = require("./56352f31.js"),
  o = require("./3776594a.js"),
  i = require("./49676761.js");
legacyModule.exports = require("./385a2f56.js") ? Object.defineProperties : function (e, t) {
  o(e);
  var n,
    a = i(t),
    s = a.length,
    c = 0;
  while (s > c) r.f(e, n = a[c++], t[n]);
  return e;
};
