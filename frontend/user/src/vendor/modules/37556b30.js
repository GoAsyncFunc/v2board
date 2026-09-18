let legacyModule = module,
  legacyExports = exports;
var r = require("./toObjectLegacy.js"),
  o = require("./toAbsoluteIndex.js"),
  i = require("./toLength.js");
legacyModule.exports = function (e) {
  var t = r(this),
    n = i(t.length),
    a = arguments.length,
    s = o(a > 1 ? arguments[1] : void 0, n),
    c = a > 2 ? arguments[2] : void 0,
    u = void 0 === c ? n : o(c, n);
  while (u > s) t[s++] = e;
  return t;
};
