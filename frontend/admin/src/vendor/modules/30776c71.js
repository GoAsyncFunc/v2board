let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  i = require("./38483435.js"),
  o = require("./toObjectLegacy.js"),
  a = require("./4f735664.js"),
  s = require("./77596d38.js"),
  l = require("./speciesConstructor.js");
r(r.P, "Array", {
  flatMap: function (e) {
    var t,
      n,
      r = o(this);
    return s(e), t = a(r.length), n = l(r, 0), i(n, r, r, t, 0, 1, e, arguments[1]), n;
  }
}), require("./4449634f.js")("flatMap");
