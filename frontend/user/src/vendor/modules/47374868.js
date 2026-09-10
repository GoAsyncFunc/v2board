let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  o = require("./41323268.js"),
  i = require("./62734472.js");
require("./68374769.js")("search", 1, function (e, t, n, a) {
  return [function (n) {
    var r = e(this),
      o = void 0 == n ? void 0 : n[t];
    return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
  }, function (e) {
    var t = a(n, e, this);
    if (t.done) return t.value;
    var s = r(e),
      c = String(this),
      u = s.lastIndex;
    o(u, 0) || (s.lastIndex = 0);
    var l = i(s, c);
    return o(s.lastIndex, u) || (s.lastIndex = u), null === l ? -1 : l.index;
  }];
});
