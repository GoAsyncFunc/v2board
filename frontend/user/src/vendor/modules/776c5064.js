let legacyModule = module,
  legacyExports = exports;
var r = require("./toObjectLegacy.js"),
  o = require("./toAbsoluteIndex.js"),
  i = require("./toLength.js");
legacyModule.exports = [].copyWithin || function (e, t) {
  var n = r(this),
    a = i(n.length),
    s = o(e, a),
    c = o(t, a),
    u = arguments.length > 2 ? arguments[2] : void 0,
    l = Math.min((void 0 === u ? a : o(u, a)) - c, a - s),
    f = 1;
  c < s && s < c + l && (f = -1, c += l - 1, s += l - 1);
  while (l-- > 0) c in n ? n[s] = n[c] : delete n[s], s += f, c += f;
  return n;
};
