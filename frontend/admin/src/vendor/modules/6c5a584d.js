let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./4f735664.js"),
  o = require("./45545568.js"),
  a = require("./62734472.js");
require("./68374769.js")("match", 1, function (e, t, n, s) {
  return [function (n) {
    var r = e(this),
      i = void 0 == n ? void 0 : n[t];
    return void 0 !== i ? i.call(n, r) : new RegExp(n)[t](String(r));
  }, function (e) {
    var t = s(n, e, this);
    if (t.done) return t.value;
    var l = r(e),
      c = String(this);
    if (!l.global) return a(l, c);
    var u = l.unicode;
    l.lastIndex = 0;
    var h,
      f = [],
      d = 0;
    while (null !== (h = a(l, c))) {
      var p = String(h[0]);
      f[d] = p, "" === p && (l.lastIndex = o(c, i(l.lastIndex), u)), d++;
    }
    return 0 === d ? null : f;
  }];
});
