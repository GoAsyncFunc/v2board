let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  o = require("./4f735664.js"),
  i = require("./45545568.js"),
  a = require("./62734472.js");
require("./68374769.js")("match", 1, function (e, t, n, s) {
  return [function (n) {
    var r = e(this),
      o = void 0 == n ? void 0 : n[t];
    return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
  }, function (e) {
    var t = s(n, e, this);
    if (t.done) return t.value;
    var c = r(e),
      u = String(this);
    if (!c.global) return a(c, u);
    var l = c.unicode;
    c.lastIndex = 0;
    var f,
      p = [],
      d = 0;
    while (null !== (f = a(c, u))) {
      var h = String(f[0]);
      p[d] = h, "" === h && (c.lastIndex = i(u, o(c.lastIndex), l)), d++;
    }
    return 0 === d ? null : p;
  }];
});
