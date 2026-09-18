let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./38483435.js"),
  i = require("./toObjectLegacy.js"),
  a = require("./4f735664.js"),
  s = require("./77596d38.js"),
  c = require("./speciesConstructor.js");
r(r.P, "Array", {
  flatMap: function (e) {
    var t,
      n,
      r = i(this);
    return s(e), t = a(r.length), n = c(r, 0), o(n, r, r, t, 0, 1, e, arguments[1]), n;
  }
}), require("./4449634f.js")("flatMap");
