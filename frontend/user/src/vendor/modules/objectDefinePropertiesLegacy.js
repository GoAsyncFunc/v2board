let legacyModule = module,
  legacyExports = exports;
var r = require("./32666145.js"),
  o = require("./354b375a.js"),
  i = require("./7736474f.js");
legacyModule.exports = require("./6a6d4448.js") ? Object.defineProperties : function (e, t) {
  o(e);
  var n,
    a = i(t),
    s = a.length,
    c = 0;
  while (s > c) r.f(e, n = a[c++], t[n]);
  return e;
};
