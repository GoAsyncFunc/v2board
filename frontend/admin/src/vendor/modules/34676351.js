let legacyModule = module,
  legacyExports = exports;
var r = require("./56352f31.js"),
  i = require("./3776594a.js"),
  o = require("./49676761.js");
legacyModule.exports = require("./385a2f56.js") ? Object.defineProperties : function (e, t) {
  i(e);
  var n,
    a = o(t),
    s = a.length,
    l = 0;
  while (s > l) r.f(e, n = a[l++], t[n]);
  return e;
};
