let legacyModule = module,
  legacyExports = exports;
var r = require("./toObjectLegacy.js"),
  i = require("./toAbsoluteIndex.js"),
  o = require("./toLength.js");
legacyModule.exports = [].copyWithin || function (e, t) {
  var n = r(this),
    a = o(n.length),
    s = i(e, a),
    l = i(t, a),
    c = arguments.length > 2 ? arguments[2] : void 0,
    u = Math.min((void 0 === c ? a : i(c, a)) - l, a - s),
    h = 1;
  l < s && s < l + u && (h = -1, l += u - 1, s += u - 1);
  while (u-- > 0) l in n ? n[s] = n[l] : delete n[s], s += h, l += h;
  return n;
};
